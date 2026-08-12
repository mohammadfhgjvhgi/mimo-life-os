/* =============================================
 *  Smart Parking + Safety System  v6.0  (FINAL)
 *  Board : Arduino Mega + WiFi R3
 *  LCD   : I2C 0x27  (SDA=20 , SCL=21)
 *  Bridge: Serial1 (Pin 18/19) ← Uno ← PC ← Firebase
 *
 *  === PIN MAP ===
 *  ENTRY_SENSOR  52       EXIT_SENSOR   4
 *  ENTRY_SERVO   53       EXIT_SERVO    3
 *  EMERGENCY_SERVO 11     GAS_SENSOR    A9
 *  GAS_DO        41       VIB_SENSOR    A10
 *  RELAY_PIN     25       BUZZER_PIN    8
 *
 *  === SERIAL ===
 *  Serial1.begin(9600)  ← مهم جداً: نفس سرعة الأونو والبايثون
 * ============================================= */

#include <Servo.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// ===== السيرفوات =====
Servo entryServo;
Servo exitServo;
Servo emergencyServo;

const int entryServoPin = 53;
const int exitServoPin = 3;
const int emergencyServoPin = 11;

// ===== الحساسات =====
const int entrySensorPin = 52;
const int exitSensorPin = 4;
const int gasSensorPin = A9;
const int gasDOPin = 41;
const int vibSensorPin = A10;

// ===== الريليه والبازار =====
const int RELAY_PIN = 25;
const int BUZZER_PIN = 8;

// ===== الشاشة =====
LiquidCrystal_I2C lcd(0x27, 20, 4);

// ===== متغيرات العداد =====
int vehicleCount = 0;
const int maxCapacity = 9;
int entryMoveCount = 0;
int exitMoveCount = 0;
bool entryNeedsRest = false;
bool exitNeedsRest = false;

// ===== منع التكرار =====
unsigned long lastEntryTime = 0;
unsigned long lastExitTime = 0;
const int debounceDelay = 2000;

// ===== الوقت =====
unsigned long startTime = 0;
int lastSec = -1;

// ===== الغاز =====
float smoothGas = 0.0;
unsigned long gasStableStart = 0;
bool gasAlarm = false;
int gasDOState = HIGH;
const int GAS_THRESHOLD = 400;

// ===== الاهتزاز =====
float smoothVib = 0.0;
unsigned long vibStableStart = 0;
int vibLevel = 0;
bool vibAlarm = false;
unsigned long vibDoorOpenTime = 0;
unsigned long vibCooldownEnd = 0;
bool vibInCooldown = false;
const unsigned long VIB_OPEN_MS = 10000;
const unsigned long VIB_COOLDOWN_MS = 5000;

// ===== الطوارئ =====
bool wasGasAlarm = false;

// ===== عرض مضاد للرمش =====
String prevLine0 = "";
String prevLine1 = "";
String prevLine2 = "";
String prevLine3 = "";

// ===== Serial Bridge =====
unsigned long lastSendTime = 0;
const unsigned long SEND_INTERVAL = 1000;
String bridgeStatus = "WAITING";
unsigned long bridgeTimeout = 0;

// ===== استقبال الأوامر - Buffer =====
String cmdBuffer = "";

// =================== SETUP ===================
void setup()
{
  // Serial Bridge - لازم 9600 مثل الأونو والبايثون!
  Serial1.begin(9600);
  bridgeStatus = "WAITING";
  bridgeTimeout = millis();

  entryServo.attach(entryServoPin);
  exitServo.attach(exitServoPin);
  emergencyServo.attach(emergencyServoPin);
  entryServo.write(0);
  exitServo.write(0);
  emergencyServo.write(0);

  pinMode(entrySensorPin, INPUT);
  pinMode(exitSensorPin, INPUT);
  pinMode(gasSensorPin, INPUT);
  pinMode(gasDOPin, INPUT);
  pinMode(vibSensorPin, INPUT);

  pinMode(RELAY_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);
  noTone(BUZZER_PIN);

  lcd.init();
  lcd.backlight();
  lcd.clear();

  startTime = millis();
  smoothGas = (float)analogRead(gasSensorPin);
  smoothVib = (float)analogRead(vibSensorPin);

  lcd.setCursor(3, 0);
  lcd.print("Smart Parking");
  lcd.setCursor(2, 1);
  lcd.print("+ Safety System");
  delay(2000);
  lcd.clear();
}

// =================== LOOP ===================
void loop()
{
  unsigned long currentTime = millis();

  // 1. استقبال أوامر من البايثون عبر Uno
  checkSerialCommands();

  // 2. قراءة الحساسات
  readGasSensor();
  readVibrationSensor();

  // 3. معالجة الانذارات
  bool anyAlarm = gasAlarm;
  handleVibration();
  handleGasAlarm(anyAlarm);

  // 4. تحديث الشاشة كل ثانية
  int secs = (currentTime - startTime) / 1000;
  if (secs != lastSec)
  {
    lastSec = secs;
    if (!anyAlarm && !vibAlarm && !vibDoorOpenTime)
      updateDisplay(currentTime);
  }

  // 5. حساسات الدخول والخروج (فقط بدون انذار)
  if (!anyAlarm && !vibAlarm && !vibDoorOpenTime)
  {
    int entryValue = digitalRead(entrySensorPin);
    int exitValue = digitalRead(exitSensorPin);

    if (entryValue == LOW && (currentTime - lastEntryTime) > debounceDelay)
    {
      handleEntry();
      lastEntryTime = currentTime;
    }

    if (exitValue == LOW && (currentTime - lastExitTime) > debounceDelay)
    {
      handleExit();
      lastExitTime = currentTime;
    }

    checkServoRest();
  }

  // 6. إرسال البيانات للبايثون عبر Uno
  sendDataToBridge();

  delay(50);
}

// =================== Serial Bridge ===================
// قراءة حرف بحرف - أقوى من readStringUntil

void checkSerialCommands()
{
  while (Serial1.available() > 0)
  {
    char c = Serial1.read();

    if (c == '\n' || c == '\r')
    {
      // انتهى الأمر - نعمل عليه
      if (cmdBuffer.length() > 0)
      {
        cmdBuffer.trim();
        processCommand(cmdBuffer);
        cmdBuffer = "";
      }
    }
    else
    {
      if (cmdBuffer.length() < 32)  // حماية من overflow
      {
        cmdBuffer += c;
      }
    }
  }
}

void processCommand(String cmd)
{
  // أرسل تأكيد الاستلام فوراً - هذا يظهر بالCMD
  Serial1.println("CMD:OK:" + cmd);

  bool executed = false;

  if (cmd == "OPEN_ENTRY")
  {
    if (!gasAlarm && !vibAlarm && !vibDoorOpenTime)
    {
      if (vehicleCount < maxCapacity && !entryNeedsRest)
      {
        Serial1.println("CMD:RUN:" + cmd);
        handleEntry();
        executed = true;
      }
      else if (vehicleCount >= maxCapacity)
      {
        printLine(0, "   PARK FULL!     ");
        printLine(1, "   Can't Enter    ");
        delay(2000);
        updateDisplay(millis());
        executed = true;
      }
    }
    else
    {
      Serial1.println("CMD:FAIL:ALARM");
    }
  }
  else if (cmd == "OPEN_EXIT")
  {
    if (!gasAlarm && !vibAlarm && !vibDoorOpenTime)
    {
      if (vehicleCount > 0 && !exitNeedsRest)
      {
        Serial1.println("CMD:RUN:" + cmd);
        handleExit();
        executed = true;
      }
    }
    else
    {
      Serial1.println("CMD:FAIL:ALARM");
    }
  }
  else if (cmd == "OPEN_SECURITY")
  {
    Serial1.println("CMD:RUN:" + cmd);
    for (int a = 0; a <= 180; a += 2) { emergencyServo.write(a); delay(15); }
    executed = true;
  }
  else if (cmd == "CLOSE_SECURITY")
  {
    Serial1.println("CMD:RUN:" + cmd);
    for (int a = 180; a >= 0; a -= 2) { emergencyServo.write(a); delay(15); }
    executed = true;
  }
  else if (cmd == "LIGHT_ON")
  {
    Serial1.println("CMD:RUN:" + cmd);
    digitalWrite(RELAY_PIN, HIGH);
    executed = true;
  }
  else if (cmd == "LIGHT_OFF")
  {
    Serial1.println("CMD:RUN:" + cmd);
    digitalWrite(RELAY_PIN, LOW);
    executed = true;
  }
  else if (cmd == "BUZZER_ON")
  {
    Serial1.println("CMD:RUN:" + cmd);
    tone(BUZZER_PIN, 1000);
    executed = true;
  }
  else if (cmd == "BUZZER_OFF")
  {
    Serial1.println("CMD:RUN:" + cmd);
    noTone(BUZZER_PIN);
    executed = true;
  }
  else if (cmd.startsWith("SYSTEM:READY"))
  {
    bridgeStatus = "CONNECTED";
    bridgeTimeout = millis();
    executed = true;
  }
  else if (cmd.startsWith("WIFI:"))
  {
    bridgeStatus = cmd.substring(5);
    if (bridgeStatus != "CONNECTED") bridgeTimeout = millis();
    executed = true;
  }

  if (!executed)
  {
    Serial1.println("CMD:FAIL:UNKNOWN");
  }
}

void sendDataToBridge()
{
  if (millis() - lastSendTime < SEND_INTERVAL) return;
  lastSendTime = millis();

  // تحقق من حالة الاتصال
  if (bridgeStatus == "CONNECTED" && millis() - bridgeTimeout > 30000)
    bridgeStatus = "DISCONNECTED";

  // بروتوكول الأنابيب: KEY:VALUE|KEY:VALUE|...
  String data = "CAR:" + String(vehicleCount)
    + "|MAX:" + String(maxCapacity)
    + "|GAS:" + String((int)smoothGas)
    + "|GA:" + String(gasAlarm ? 1 : 0)
    + "|GD:" + String((gasDOState == LOW) ? 1 : 0)
    + "|VA:" + String(vibAlarm ? 1 : 0)
    + "|VL:" + String(vibLevel)
    + "|EG:" + String((entryServo.read() > 45) ? 1 : 0)
    + "|XG:" + String((exitServo.read() > 45) ? 1 : 0)
    + "|SD:" + String((emergencyServo.read() > 90) ? 1 : 0)
    + "|RL:" + String(digitalRead(RELAY_PIN) ? 1 : 0);

  Serial1.println(data);
}

// =================== الغاز ===================

void readGasSensor()
{
  int gasRaw = analogRead(gasSensorPin);
  gasDOState = digitalRead(gasDOPin);
  smoothGas = smoothGas * 0.9 + gasRaw * 0.1;

  bool gasNow = (smoothGas > GAS_THRESHOLD) && (gasDOState == LOW);

  if (gasNow)
  {
    if (gasStableStart == 0)
      gasStableStart = millis();
    else if (millis() - gasStableStart >= 1000)
      gasAlarm = true;
  }
  else
  {
    gasStableStart = 0;
    gasAlarm = false;
  }
}

// =================== الاهتزاز ===================

void readVibrationSensor()
{
  if (vibInCooldown)
  {
    if (millis() >= vibCooldownEnd)
    {
      vibInCooldown = false;
      vibLevel = 0;
    }
    return;
  }

  if (vibDoorOpenTime > 0) return;

  int raw = analogRead(vibSensorPin);
  smoothVib = smoothVib * 0.9 + raw * 0.1;

  if      (smoothVib >= 800) vibLevel = 3;
  else if (smoothVib >= 600) vibLevel = 2;
  else if (smoothVib >= 400) vibLevel = 1;
  else                      vibLevel = 0;

  if (vibLevel >= 3)
  {
    if (vibStableStart == 0)
      vibStableStart = millis();
    else if (millis() - vibStableStart >= 1000)
      vibAlarm = true;
  }
  else
  {
    vibStableStart = 0;
    vibAlarm = false;
  }
}

void handleVibration()
{
  if (vibAlarm)
  {
    vibAlarm = false;
    vibStableStart = 0;
    vibDoorOpenTime = millis();

    // فتح الأبواب الثلاثة
    for (int a = 0; a <= 90; a += 2) { entryServo.write(a); delay(30); }
    for (int a = 0; a <= 90; a += 2) { exitServo.write(a); delay(30); }
    for (int a = 0; a <= 180; a += 2) { emergencyServo.write(a); delay(15); }

    // ريليه + بازار
    digitalWrite(RELAY_PIN, HIGH);
    tone(BUZZER_PIN, 1000);

    printLine(0, " !! EARTHQUAKE !!");
    printLine(1, "  EVACUATE NOW!  ");
  }

  // بعد 10 ثواني سكر الكل
  if (vibDoorOpenTime > 0 && millis() - vibDoorOpenTime >= VIB_OPEN_MS)
  {
    vibDoorOpenTime = 0;

    // إغلاق الأبواب الثلاثة
    entryServo.write(0);
    exitServo.write(0);
    for (int a = 180; a >= 0; a -= 2) { emergencyServo.write(a); delay(15); }

    // طفي الكل
    digitalWrite(RELAY_PIN, LOW);
    noTone(BUZZER_PIN);

    entryMoveCount = 0;
    exitMoveCount = 0;
    entryNeedsRest = false;
    exitNeedsRest = false;

    vibInCooldown = true;
    vibCooldownEnd = millis() + VIB_COOLDOWN_MS;

    updateDisplay(millis());
  }
}

// =================== إنذار الغاز ===================

void handleGasAlarm(bool active)
{
  if (active)
  {
    wasGasAlarm = true;

    // فتح الأبواب الثلاثة
    for (int a = 0; a <= 90; a += 2) { entryServo.write(a); delay(30); }
    for (int a = 0; a <= 90; a += 2) { exitServo.write(a); delay(30); }
    for (int a = 0; a <= 180; a += 2) { emergencyServo.write(a); delay(15); }

    // ريليه + بازار
    digitalWrite(RELAY_PIN, HIGH);
    tone(BUZZER_PIN, 1500);

    printLine(0, "  !! GAS LEAK !!");
    printLine(1, "Lv:" + String((int)smoothGas) + " EVACUATE!");
  }
  else if (wasGasAlarm)
  {
    wasGasAlarm = false;

    // إغلاق الأبواب الثلاثة
    entryServo.write(0);
    exitServo.write(0);
    for (int a = 180; a >= 0; a -= 2) { emergencyServo.write(a); delay(15); }

    // طفي الكل
    digitalWrite(RELAY_PIN, LOW);
    noTone(BUZZER_PIN);

    entryMoveCount = 0;
    exitMoveCount = 0;
    entryNeedsRest = false;
    exitNeedsRest = false;
    updateDisplay(millis());
  }
}

// =================== الدخول ===================

void handleEntry()
{
  if (entryNeedsRest) return;

  if (vehicleCount < maxCapacity)
  {
    vehicleCount++;
    entryMoveCount++;

    // تنبيه
    for (int i = 0; i < 3; i++) { tone(BUZZER_PIN, 800); delay(150); noTone(BUZZER_PIN); delay(100); }

    // فتح
    for (int a = 0; a <= 90; a += 2) { entryServo.write(a); delay(30); }
    digitalWrite(RELAY_PIN, HIGH);
    delay(3000);

    // إغلاق
    for (int a = 90; a >= 0; a -= 2) { entryServo.write(a); delay(30); }
    digitalWrite(RELAY_PIN, LOW);

    // تأكيد
    for (int i = 0; i < 2; i++) { tone(BUZZER_PIN, 500); delay(150); noTone(BUZZER_PIN); delay(100); }

    updateDisplay(millis());
  }
  else
  {
    printLine(0, "   PARK FULL!     ");
    printLine(1, "   Can't Enter    ");
    delay(2000);
    updateDisplay(millis());
  }
}

// =================== الخروج ===================

void handleExit()
{
  if (exitNeedsRest) return;

  if (vehicleCount > 0)
  {
    vehicleCount--;
    exitMoveCount++;

    // تنبيه
    for (int i = 0; i < 3; i++) { tone(BUZZER_PIN, 800); delay(150); noTone(BUZZER_PIN); delay(100); }

    // فتح
    for (int a = 0; a <= 90; a += 2) { exitServo.write(a); delay(30); }
    digitalWrite(RELAY_PIN, HIGH);
    delay(3000);

    // إغلاق
    for (int a = 90; a >= 0; a -= 2) { exitServo.write(a); delay(30); }
    digitalWrite(RELAY_PIN, LOW);

    // تأكيد
    for (int i = 0; i < 2; i++) { tone(BUZZER_PIN, 500); delay(150); noTone(BUZZER_PIN); delay(100); }

    updateDisplay(millis());
  }
}

// =================== راحة السيرفوات ===================

void checkServoRest()
{
  if (entryMoveCount >= 5) entryNeedsRest = true;
  if (exitMoveCount >= 5) exitNeedsRest = true;

  if (entryNeedsRest || exitNeedsRest)
  {
    printLine(0, " System Cooling   ");
    printLine(1, " Please wait...   ");
    delay(10000);
    entryNeedsRest = false;
    exitNeedsRest = false;
    entryMoveCount = 0;
    exitMoveCount = 0;
    updateDisplay(millis());
  }
}

// =================== العرض ===================

void printLine(int row, String text)
{
  String *prev = NULL;
  if (row == 0) prev = &prevLine0;
  else if (row == 1) prev = &prevLine1;
  else if (row == 2) prev = &prevLine2;
  else if (row == 3) prev = &prevLine3;

  if (prev && text != *prev)
  {
    while (text.length() < 20) text += ' ';
    lcd.setCursor(0, row);
    lcd.print(text);
    *prev = text;
  }
}

void updateDisplay(unsigned long currentTime)
{
  unsigned long elapsed = currentTime - startTime;

  int days = elapsed / 86400000;
  int hours = (elapsed % 86400000) / 3600000;
  int mins = (elapsed % 3600000) / 60000;
  int secs = (elapsed % 60000) / 1000;

  // السطر 0: عدد السيارات + الوقت (الأيام)
  String line0 = "C:";
  line0 += String(vehicleCount);
  line0 += "/";
  line0 += String(maxCapacity);
  line0 += " D:";
  if (days < 100) line0 += "0";
  if (days < 10) line0 += "0";
  line0 += String(days);
  line0 += (secs % 2 == 0) ? " " : ".";

  // السطر 1: الساعة + الرسوم المتحركة + الأماكن الفارغة
  String line1 = "";
  if (hours < 10) line1 += "0";
  line1 += String(hours);
  line1 += ":";
  if (mins < 10) line1 += "0";
  line1 += String(mins);
  line1 += ":";
  if (secs < 10) line1 += "0";
  line1 += String(secs);

  if (secs % 4 == 0) line1 += " <";
  else if (secs % 4 == 1) line1 += " v";
  else if (secs % 4 == 2) line1 += " >";
  else line1 += " ^";

  line1 += " F:";
  line1 += String(maxCapacity - vehicleCount);

  // السطر 2: حالة الغاز والاهتزاز
  String line2 = "G:";
  line2 += String((int)smoothGas);
  if (gasAlarm) line2 += " ALARM";
  else line2 += " OK    ";
  line2 += " V:";
  line2 += String(vibLevel);

  // السطر 3: حالة الاتصال
  String line3 = "Bridge:";
  line3 += bridgeStatus;

  printLine(0, line0);
  printLine(1, line1);
  printLine(2, line2);
  printLine(3, line3);
}

/* =============================================
 *  Smart Parking + Safety System  v6.4  (TOUCH SENSOR)
 *  Board  : Arduino Mega + WiFi R3
 *  LCD    : I2C 0x27  (SDA=20 , SCL=21)
 *  Bridge : Serial1 Pin 18/19  <-->  Uno D10/D11
 *
 *  ═══ ما الجديد في v6.4 ═══
 *  1. إضافة حساس اللمس TTP223 على Pin 26
 *     (وضع Self-Locking = لحام نقطة B على ظهر الموديول)
 *  2. كل لمسة = تبديل حالة باب غرفة الأمان
 *     (اللمسة الأولى تفتح / الثانية تغلق)
 *  3. إرسال حالة حساس اللمس في البيانات: TS:0/1
 *
 *  ═══ بروتوكول البيانات ═══
 *  Mega --> Firebase (كل 1 ثانية):
 *    CAR:0|MAX:9|GAS:76|GA:0|GD:0|VA:0|VL:0|EG:0|XG:0|SD:0|RL:0|TS:0
 *                                                            ^^^^^^
 *                                                            جديد
 *
 *  ═══ خريطة الأطراف ═══
 *  ENTRY_SENSOR      52        EXIT_SENSOR       4
 *  ENTRY_SERVO       53        EXIT_SERVO        3
 *  EMERGENCY_SERVO   11        GAS_SENSOR        A9
 *  GAS_DO            41        VIB_SENSOR        A10
 *  RELAY_PIN         25        BUZZER_PIN        8
 *  TOUCH_SENSOR      26  (TTP223 Self-Locking)
 * ============================================= */

#include <Servo.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// ===== السيرفوات =====
Servo entryServo;
Servo exitServo;
Servo emergencyServo;

const int entryServoPin     = 53;
const int exitServoPin      = 3;
const int emergencyServoPin = 11;

// ===== الحساسات =====
const int entrySensorPin = 52;
const int exitSensorPin  = 4;
const int gasSensorPin   = A9;
const int gasDOPin       = 41;
const int vibSensorPin   = A10;

// ★ حساس اللمس TTP223 =====
const int touchSensorPin = 26;

// ===== الريليه والبازار =====
const int RELAY_PIN  = 25;
const int BUZZER_PIN = 8;

// ===== الشاشة =====
LiquidCrystal_I2C lcd(0x27, 20, 4);

// ===== متغيرات العداد =====
int vehicleCount   = 0;
const int maxCapacity = 9;
int entryMoveCount = 0;
int exitMoveCount  = 0;
bool entryNeedsRest = false;
bool exitNeedsRest  = false;

// ===== منع التكرار =====
unsigned long lastEntryTime = 0;
unsigned long lastExitTime  = 0;
const int debounceDelay = 2000;

// ★ متغيرات حساس اللمس =====
bool lastTouchState   = false;
unsigned long lastTouchTime = 0;
const int touchDebounce = 500;   // نصف ثانية بين كل لمسة

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
const unsigned long VIB_OPEN_MS     = 10000;
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

// ===== استقبال الأوامر - Buffer =====
String cmdBuffer = "";

// =================== SETUP ===================
void setup()
{
  Serial1.begin(9600);

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
  pinMode(touchSensorPin, INPUT);   // ★ حساس اللمس كمُدخل رقمي

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

  // ★ قراءة الحالة الابتدائية للحساس
  // Self-Locking: يكون LOW (مطفأ) عند التشغيل
  lastTouchState = (digitalRead(touchSensorPin) == HIGH);

  lcd.setCursor(1, 0);
  lcd.print("Smart Parking v6.4");
  lcd.setCursor(2, 1);
  lcd.print("+ Safety System");
  lcd.setCursor(0, 2);
  lcd.print("Touch: D26 OK");
  delay(2500);
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

  // 3. ★★★ قراءة حساس اللمس TTP223 ★★★
  readTouchSensor();

  // 4. معالجة الانذارات
  bool anyAlarm = gasAlarm;
  handleVibration();
  handleGasAlarm(anyAlarm);

  // 5. تحديث الشاشة كل ثانية
  int secs = (currentTime - startTime) / 1000;
  if (secs != lastSec)
  {
    lastSec = secs;
    if (!anyAlarm && !vibAlarm && !vibDoorOpenTime)
      updateDisplay(currentTime);
  }

  // 6. حساسات الدخول والخروج (فقط بدون انذار)
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

  // 7. إرسال البيانات للبايثون عبر Uno
  sendDataToBridge();

  delay(30);
}

// =================== حساس اللمس TTP223 ===================
//
//  كيف يعمل TTP223 (Self-Locking = لحام نقطة B):
//
//  ┌──────────────────────────────────────────────────┐
//  │  الحالة الافتراضية: الخرج = LOW (مطفأ)          │
//  │                                                   │
//  │  اللمسة الأولى:  الخرج يتحول → HIGH (يبقى!)     │
//  │  اللمسة الثانية: الخرج يتحول → LOW  (يبقى!)     │
//  │  اللمسة الثالثة: الخرج يتحول → HIGH (يبقى!)     │
//  │  ... وهكذا                                        │
//  │                                                   │
//  │  إذن: كل لمسة = تغيير حالة (LOW↔HIGH)           │
//  │  ونحن نكتشف التغيير ونبدّل باب الأمان            │
//  └──────────────────────────────────────────────────┘
//

void readTouchSensor()
{
  // لا تعمل أثناء إنذار زلزال أو غاز
  if (vibDoorOpenTime > 0) return;
  if (gasAlarm) return;

  bool currentTouch = (digitalRead(touchSensorPin) == HIGH);
  unsigned long now = millis();

  // نكتشف أي تغيير في حالة الحساس
  // LOW  → HIGH  = لمسة جديدة  ← تبديل باب الأمان
  // HIGH → LOW   = لمسة جديدة  ← تبديل باب الأمان
  if (currentTouch != lastTouchState)
  {
    // debounce: نتجاهل التغييرات السريعة (500ms كحد أدنى)
    if ((now - lastTouchTime) > touchDebounce)
    {
      lastTouchTime = now;
      lastTouchState = currentTouch;
      toggleSecurityDoor();
    }
  }
}

void toggleSecurityDoor()
{
  int currentAngle = emergencyServo.read();
  bool isOpen = (currentAngle > 90);

  if (isOpen)
  {
    // ===== إغلاق باب الأمان =====
    for (int a = 180; a >= 0; a -= 2)
    {
      emergencyServo.write(a);
      delay(15);
    }
    printLine(2, "Security: LOCKED  ");

    // تنبيه صوتي قصير
    tone(BUZZER_PIN, 600);
    delay(100);
    noTone(BUZZER_PIN);
  }
  else
  {
    // ===== فتح باب الأمان =====
    for (int a = 0; a <= 180; a += 2)
    {
      emergencyServo.write(a);
      delay(15);
    }
    printLine(2, "Security: OPEN!   ");

    // تنبيه صوتي قصير
    tone(BUZZER_PIN, 1000);
    delay(100);
    noTone(BUZZER_PIN);
  }
}

// =================== Serial Bridge ===================

void checkSerialCommands()
{
  while (Serial1.available() > 0)
  {
    char c = Serial1.read();

    if (c == '\n' || c == '\r')
    {
      if (cmdBuffer.length() > 0)
      {
        cmdBuffer.trim();
        processCommand(cmdBuffer);
        cmdBuffer = "";
      }
    }
    else
    {
      if (cmdBuffer.length() < 32)
      {
        cmdBuffer += c;
      }
    }
  }
}

void processCommand(String cmd)
{
  Serial1.println("CMD:OK:" + cmd);

  if (cmd == "OPEN_ENTRY")
  {
    if (gasAlarm || vibAlarm || vibDoorOpenTime)
      Serial1.println("CMD:FAIL:ALARM");
    else if (entryNeedsRest)
      Serial1.println("CMD:FAIL:COOLING");
    else if (vehicleCount >= maxCapacity)
    {
      Serial1.println("CMD:FAIL:FULL");
      printLine(0, "   PARK FULL!     ");
      printLine(1, "   Can't Enter    ");
      delay(2000);
      updateDisplay(millis());
    }
    else
    {
      Serial1.println("CMD:RUN:" + cmd);
      handleEntry();
    }
  }
  else if (cmd == "OPEN_EXIT")
  {
    if (gasAlarm || vibAlarm || vibDoorOpenTime)
      Serial1.println("CMD:FAIL:ALARM");
    else if (exitNeedsRest)
      Serial1.println("CMD:FAIL:COOLING");
    else if (vehicleCount <= 0)
      Serial1.println("CMD:FAIL:EMPTY");
    else
    {
      Serial1.println("CMD:RUN:" + cmd);
      handleExit();
    }
  }
  else if (cmd == "OPEN_SECURITY")
  {
    Serial1.println("CMD:RUN:" + cmd);
    for (int a = 0; a <= 180; a += 2) { emergencyServo.write(a); delay(15); }
  }
  else if (cmd == "CLOSE_SECURITY")
  {
    Serial1.println("CMD:RUN:" + cmd);
    for (int a = 180; a >= 0; a -= 2) { emergencyServo.write(a); delay(15); }
  }
  else if (cmd == "LIGHT_ON")
  {
    Serial1.println("CMD:RUN:" + cmd);
    digitalWrite(RELAY_PIN, HIGH);
  }
  else if (cmd == "LIGHT_OFF")
  {
    Serial1.println("CMD:RUN:" + cmd);
    digitalWrite(RELAY_PIN, LOW);
  }
  else if (cmd == "BUZZER_ON")
  {
    Serial1.println("CMD:RUN:" + cmd);
    tone(BUZZER_PIN, 1000);
  }
  else if (cmd == "BUZZER_OFF")
  {
    Serial1.println("CMD:RUN:" + cmd);
    noTone(BUZZER_PIN);
  }
  else if (cmd.startsWith("SYSTEM:READY"))
  {
    bridgeStatus = "CONNECTED";
  }
  else if (cmd.startsWith("WIFI:"))
  {
    bridgeStatus = cmd.substring(5);
  }
  else
  {
    Serial1.println("CMD:FAIL:UNKNOWN");
  }
}

// =================== إرسال البيانات ===================

void sendDataToBridge()
{
  if (millis() - lastSendTime < SEND_INTERVAL) return;
  lastSendTime = millis();

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
    + "|RL:" + String(digitalRead(RELAY_PIN) ? 1 : 0)
    + "|TS:" + String(lastTouchState ? 1 : 0);   // ★ حالة حساس اللمس

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

    for (int a = 0; a <= 90; a += 2) { entryServo.write(a); delay(30); }
    for (int a = 0; a <= 90; a += 2) { exitServo.write(a); delay(30); }
    for (int a = 0; a <= 180; a += 2) { emergencyServo.write(a); delay(15); }

    digitalWrite(RELAY_PIN, HIGH);
    tone(BUZZER_PIN, 1000);

    printLine(0, " !! EARTHQUAKE !!");
    printLine(1, "  EVACUATE NOW!  ");
  }

  if (vibDoorOpenTime > 0 && millis() - vibDoorOpenTime >= VIB_OPEN_MS)
  {
    vibDoorOpenTime = 0;

    entryServo.write(0);
    exitServo.write(0);
    for (int a = 180; a >= 0; a -= 2) { emergencyServo.write(a); delay(15); }

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

    for (int a = 0; a <= 90; a += 2) { entryServo.write(a); delay(30); }
    for (int a = 0; a <= 90; a += 2) { exitServo.write(a); delay(30); }
    for (int a = 0; a <= 180; a += 2) { emergencyServo.write(a); delay(15); }

    digitalWrite(RELAY_PIN, HIGH);
    tone(BUZZER_PIN, 1500);

    printLine(0, "  !! GAS LEAK !!");
    printLine(1, "Lv:" + String((int)smoothGas) + " EVACUATE!");
  }
  else if (wasGasAlarm)
  {
    wasGasAlarm = false;

    entryServo.write(0);
    exitServo.write(0);
    for (int a = 180; a >= 0; a -= 2) { emergencyServo.write(a); delay(15); }

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

    for (int i = 0; i < 3; i++) { tone(BUZZER_PIN, 800); delay(150); noTone(BUZZER_PIN); delay(100); }

    for (int a = 0; a <= 90; a += 2) { entryServo.write(a); delay(30); }
    digitalWrite(RELAY_PIN, HIGH);
    delay(3000);

    for (int a = 90; a >= 0; a -= 2) { entryServo.write(a); delay(30); }
    digitalWrite(RELAY_PIN, LOW);

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

    for (int i = 0; i < 3; i++) { tone(BUZZER_PIN, 800); delay(150); noTone(BUZZER_PIN); delay(100); }

    for (int a = 0; a <= 90; a += 2) { exitServo.write(a); delay(30); }
    digitalWrite(RELAY_PIN, HIGH);
    delay(3000);

    for (int a = 90; a >= 0; a -= 2) { exitServo.write(a); delay(30); }
    digitalWrite(RELAY_PIN, LOW);

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

  String line0 = "C:";
  line0 += String(vehicleCount);
  line0 += "/";
  line0 += String(maxCapacity);
  line0 += " D:";
  if (days < 100) line0 += "0";
  if (days < 10) line0 += "0";
  line0 += String(days);
  line0 += (secs % 2 == 0) ? " " : ".";

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

  String line2 = "G:";
  line2 += String((int)smoothGas);
  if (gasAlarm) line2 += " ALARM";
  else line2 += " OK    ";
  line2 += " V:";
  line2 += String(vibLevel);

  String line3 = "Touch:";
  line3 += (lastTouchState ? "ON " : "OFF");
  line3 += " Br:";
  line3 += bridgeStatus;

  printLine(0, line0);
  printLine(1, line1);
  printLine(2, line2);
  printLine(3, line3);
}

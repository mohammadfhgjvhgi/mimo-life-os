/* =============================================
 *  Smart Parking + Safety System  v6.5  (FINGERPRINT)
 *  Board  : Arduino Mega 2560
 *  LCD    : I2C 0x27  (SDA=20 , SCL=21)
 *  Bridge : Serial1 Pin 18/19  <-->  Uno D10/D11
 *  Finger : Serial2 Pin 16/17  <-->  R307/AS608
 *
 *  ═══ ما الجديد في v6.5 ═══
 *  1. إضافة حساس البصمة R307/AS608
 *     لمسة البصمة ← فتح باب الأمان تلقائياً
 *     يغلق بعد 10 ثواني تلقائياً
 *  2. حفظ أكبر عدد من البصمات (حتى 162 بصمة)
 *  3. إبقاء TTP223 كخيار احتياطي
 *  4. شاشة LCD تعرض حالة البصمة
 *
 *  ═══ بروتوكول البيانات ═══
 *  Mega --> Firebase (كل 1 ثانية):
 *    CAR:0|MAX:9|GAS:76|GA:0|GD:0|VA:0|VL:0
 *    |EG:0|XG:0|SD:0|RL:0|TS:0|FP:0
 *
 *  ═══ خريطة الأطراف ═══
 *  ENTRY_SENSOR      52        EXIT_SENSOR       4
 *  ENTRY_SERVO       53        EXIT_SERVO        3
 *  EMERGENCY_SERVO   11        GAS_SENSOR        A9
 *  GAS_DO            41        VIB_SENSOR        A10
 *  RELAY_PIN         25        BUZZER_PIN        8
 *  TOUCH_SENSOR      26        (TTP223 backup)
 *  FINGERPRINT       Serial2   (RX=16, TX=17)
 * ============================================= */

#include <Servo.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_Fingerprint.h>

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

// ===== حساس اللمس TTP223 (احتياطي) =====
const int touchSensorPin = 26;

// ===== الريليه والبازار =====
const int RELAY_PIN  = 25;
const int BUZZER_PIN = 8;

// ===== الشاشة =====
LiquidCrystal_I2C lcd(0x27, 20, 4);

// ★★★ حساس البصمة R307/AS608 على Serial2 ★★★
// Mega RX2 = Pin 16  ←→  sensor TX
// Mega TX2 = Pin 17  ←→  sensor RX
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&Serial2);

// ===== متغيرات البصمة =====
bool fingerInitialized = false;
uint16_t fingerCount = 0;         // عدد البصمات المحفوظة
unsigned long fingerDoorOpenTime = 0;
bool fingerDoorIsOpen = false;
const unsigned long FINGER_DOOR_OPEN_MS = 10000;  // الباب يفتح 10 ثواني
int fingerFails = 0;              // عدد محاولات الفشل المتتالية

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

// ===== متغيرات حساس اللمس =====
bool lastTouchState = false;
unsigned long lastTouchTime = 0;
const int touchDebounce = 500;

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

// ===== استقبال الأوامر =====
String cmdBuffer = "";

// =================== SETUP ===================
void setup()
{
  // Serial للكمبيوتر (debug)
  Serial.begin(9600);

  // Serial1 للـ Uno Bridge
  Serial1.begin(9600);

  // السيرفوات
  entryServo.attach(entryServoPin);
  exitServo.attach(exitServoPin);
  emergencyServo.attach(emergencyServoPin);
  entryServo.write(0);
  exitServo.write(0);
  emergencyServo.write(0);

  // الحساسات
  pinMode(entrySensorPin, INPUT);
  pinMode(exitSensorPin, INPUT);
  pinMode(gasSensorPin, INPUT);
  pinMode(gasDOPin, INPUT);
  pinMode(vibSensorPin, INPUT);
  pinMode(touchSensorPin, INPUT);

  // الريليه والبازار
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);
  noTone(BUZZER_PIN);

  // الشاشة
  lcd.init();
  lcd.backlight();
  lcd.clear();

  // قيم ابتدائية
  startTime = millis();
  smoothGas = (float)analogRead(gasSensorPin);
  smoothVib = (float)analogRead(vibSensorPin);
  lastTouchState = (digitalRead(touchSensorPin) == HIGH);

  // ★★★ تشغيل حساس البصمة ★★★
  initFingerprint();

  // شاشة الترحيب
  lcd.setCursor(0, 0);
  lcd.print("Smart Parking v6.5");
  lcd.setCursor(2, 1);
  lcd.print("+ Safety System");
  delay(2500);
  lcd.clear();
}

// =================== تشغيل البصمة ===================

void initFingerprint()
{
  lcd.setCursor(0, 2);
  lcd.print("Starting Finger...");

  // جرب Baud 57600 (الافتراضي لـ R307/AS608)
  finger.begin(57600);

  if (finger.verifyPassword())
  {
    fingerInitialized = true;
    finger.getTemplateCount();
    fingerCount = finger.templateCount;

    lcd.setCursor(0, 2);
    lcd.print("Finger: OK!       ");
    lcd.setCursor(0, 3);
    lcd.print("Saved: ");
    lcd.print(fingerCount);
    lcd.print(" prints ");

    Serial.println("✅ Fingerprint sensor found!");
    Serial.print("   Saved fingerprints: ");
    Serial.println(fingerCount);
  }
  else
  {
    fingerInitialized = false;
    lcd.setCursor(0, 2);
    lcd.print("Finger: NOT FOUND ");
    lcd.setCursor(0, 3);
    lcd.print("Check wiring!     ");

    Serial.println("❌ Fingerprint sensor NOT found!");
    Serial.println("   Check wiring: TX→D16, RX→D17");
  }
  delay(2500);
}

// =================== LOOP ===================
void loop()
{
  unsigned long currentTime = millis();

  // 1. استقبال أوامر من البايثون
  checkSerialCommands();

  // 2. قراءة الحساسات
  readGasSensor();
  readVibrationSensor();

  // 3. قراءة حساس اللمس TTP223
  readTouchSensor();

  // 4. ★★★ فحص البصمة ★★★
  checkFingerprint();

  // 5. ★★★ إغلاق تلقائي لباب البصمة بعد الوقت ★★★
  if (fingerDoorIsOpen && fingerDoorOpenTime > 0)
  {
    if (millis() - fingerDoorOpenTime >= FINGER_DOOR_OPEN_MS)
    {
      closeSecurityDoor();
    }
  }

  // 6. معالجة الانذارات
  bool anyAlarm = gasAlarm;
  handleVibration();
  handleGasAlarm(anyAlarm);

  // 7. تحديث الشاشة كل ثانية
  int secs = (currentTime - startTime) / 1000;
  if (secs != lastSec)
  {
    lastSec = secs;
    if (!anyAlarm && !vibAlarm && !vibDoorOpenTime)
      updateDisplay(currentTime);
  }

  // 8. حساسات الدخول والخروج
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

  // 9. إرسال البيانات
  sendDataToBridge();

  delay(30);
}

// =================== حساس البصمة ===================

void checkFingerprint()
{
  // لا تعمل أثناء إنذار أو زلزال
  if (vibDoorOpenTime > 0) return;
  if (gasAlarm) return;
  if (!fingerInitialized) return;

  // التحقق من وجود إصبع
  uint8_t result = finger.getImage();

  if (result == FINGERPRINT_OK)
  {
    // ✅ تم اكتشاف إصبع
    printLine(2, "   Scanning...    ");

    // تحويل الصورة لقالب
    result = finger.image2Tz(1);
    if (result != FINGERPRINT_OK) {
      printLine(2, "   Bad image     ");
      delay(500);
      return;
    }

    // البحث في قاعدة البصمات
    result = finger.fingerFastSearch();

    if (result == FINGERPRINT_OK)
    {
      // ✅✅ بصمة متطابقة!
      fingerFails = 0;

      Serial.print("✅ Match! ID #");
      Serial.print(finger.fingerID);
      Serial.print(" Confidence: ");
      Serial.println(finger.confidence);

      // فتح باب الأمان
      openSecurityDoor();
    }
    else
    {
      // ❌ بصمة غير معروفة
      fingerFails++;

      Serial.print("❌ No match (fail #");
      Serial.print(fingerFails);
      Serial.println(")");

      // تنبيه صوتي خطأ
      tone(BUZZER_PIN, 200, 300);
      delay(100);
      tone(BUZZER_PIN, 200, 300);

      printLine(2, "  ACCESS DENIED!  ");

      // بعد 3 محاولات فاشلة = تنبيه
      if (fingerFails >= 3)
      {
        printLine(2, " 3 FAILS - ALERT! ");
        tone(BUZZER_PIN, 200, 1000);
        fingerFails = 0;
        delay(1000);
      }
      delay(1500);
    }
  }
}

// ===== فتح باب الأمان =====
void openSecurityDoor()
{
  for (int a = 0; a <= 180; a += 2)
  {
    emergencyServo.write(a);
    delay(15);
  }

  fingerDoorIsOpen = true;
  fingerDoorOpenTime = millis();

  // تنبيه صوتي نجاح
  tone(BUZZER_PIN, 1000, 150);
  delay(100);
  tone(BUZZER_PIN, 1000, 150);

  // تشغيل الإضاءة
  digitalWrite(RELAY_PIN, HIGH);

  printLine(2, " ACCESS GRANTED   ");
  printLine(3, " ID:");
  printLine(3, "  ID:" + String(finger.fingerID) + " Score:" + String(finger.confidence));

  Serial.println("🚪 Security door OPENED");
}

// ===== إغلاق باب الأمان =====
void closeSecurityDoor()
{
  for (int a = 180; a >= 0; a -= 2)
  {
    emergencyServo.write(a);
    delay(15);
  }

  fingerDoorIsOpen = false;
  fingerDoorOpenTime = 0;

  // إطفاء الإضاءة
  digitalWrite(RELAY_PIN, LOW);

  // تنبيه صوتي
  tone(BUZZER_PIN, 600, 100);

  printLine(2, "Security: LOCKED  ");

  Serial.println("🔒 Security door CLOSED (auto)");
}

// =================== حساس اللمس TTP223 ===================

void readTouchSensor()
{
  if (vibDoorOpenTime > 0) return;
  if (gasAlarm) return;

  bool currentTouch = (digitalRead(touchSensorPin) == HIGH);
  unsigned long now = millis();

  if (currentTouch != lastTouchState)
  {
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
    for (int a = 180; a >= 0; a -= 2) { emergencyServo.write(a); delay(15); }
    fingerDoorIsOpen = false;
    fingerDoorOpenTime = 0;
    printLine(2, "Security: LOCKED  ");
    tone(BUZZER_PIN, 600, 100);
  }
  else
  {
    for (int a = 0; a <= 180; a += 2) { emergencyServo.write(a); delay(15); }
    fingerDoorIsOpen = true;
    fingerDoorOpenTime = millis();
    digitalWrite(RELAY_PIN, HIGH);
    printLine(2, "Security: OPEN!   ");
    tone(BUZZER_PIN, 1000, 100);
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
      if (cmdBuffer.length() > 0) { cmdBuffer.trim(); processCommand(cmdBuffer); cmdBuffer = ""; }
    }
    else { if (cmdBuffer.length() < 32) cmdBuffer += c; }
  }
}

void processCommand(String cmd)
{
  Serial1.println("CMD:OK:" + cmd);

  if (cmd == "OPEN_ENTRY")
  {
    if (gasAlarm || vibAlarm || vibDoorOpenTime) Serial1.println("CMD:FAIL:ALARM");
    else if (entryNeedsRest) Serial1.println("CMD:FAIL:COOLING");
    else if (vehicleCount >= maxCapacity) { Serial1.println("CMD:FAIL:FULL"); printLine(0, "   PARK FULL!     "); delay(2000); updateDisplay(millis()); }
    else { Serial1.println("CMD:RUN:" + cmd); handleEntry(); }
  }
  else if (cmd == "OPEN_EXIT")
  {
    if (gasAlarm || vibAlarm || vibDoorOpenTime) Serial1.println("CMD:FAIL:ALARM");
    else if (exitNeedsRest) Serial1.println("CMD:FAIL:COOLING");
    else if (vehicleCount <= 0) Serial1.println("CMD:FAIL:EMPTY");
    else { Serial1.println("CMD:RUN:" + cmd); handleExit(); }
  }
  else if (cmd == "OPEN_SECURITY")
  {
    Serial1.println("CMD:RUN:" + cmd);
    openSecurityDoor();
  }
  else if (cmd == "CLOSE_SECURITY")
  {
    Serial1.println("CMD:RUN:" + cmd);
    closeSecurityDoor();
  }
  else if (cmd == "LIGHT_ON")  { Serial1.println("CMD:RUN:" + cmd); digitalWrite(RELAY_PIN, HIGH); }
  else if (cmd == "LIGHT_OFF") { Serial1.println("CMD:RUN:" + cmd); digitalWrite(RELAY_PIN, LOW); }
  else if (cmd == "BUZZER_ON")  { Serial1.println("CMD:RUN:" + cmd); tone(BUZZER_PIN, 1000); }
  else if (cmd == "BUZZER_OFF") { Serial1.println("CMD:RUN:" + cmd); noTone(BUZZER_PIN); }
  else if (cmd.startsWith("SYSTEM:READY")) { bridgeStatus = "CONNECTED"; }
  else if (cmd.startsWith("WIFI:")) { bridgeStatus = cmd.substring(5); }
  else { Serial1.println("CMD:FAIL:UNKNOWN"); }
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
    + "|TS:" + String(lastTouchState ? 1 : 0)
    + "|FP:" + String(fingerDoorIsOpen ? 1 : 0);

  Serial1.println(data);
}

// =================== الغاز ===================

void readGasSensor()
{
  int gasRaw = analogRead(gasSensorPin);
  gasDOState = digitalRead(gasDOPin);
  smoothGas = smoothGas * 0.9 + gasRaw * 0.1;

  bool gasNow = (smoothGas > GAS_THRESHOLD) && (gasDOState == LOW);
  if (gasNow) {
    if (gasStableStart == 0) gasStableStart = millis();
    else if (millis() - gasStableStart >= 1000) gasAlarm = true;
  } else { gasStableStart = 0; gasAlarm = false; }
}

// =================== الاهتزاز ===================

void readVibrationSensor()
{
  if (vibInCooldown) {
    if (millis() >= vibCooldownEnd) { vibInCooldown = false; vibLevel = 0; }
    return;
  }
  if (vibDoorOpenTime > 0) return;

  int raw = analogRead(vibSensorPin);
  smoothVib = smoothVib * 0.9 + raw * 0.1;
  if      (smoothVib >= 800) vibLevel = 3;
  else if (smoothVib >= 600) vibLevel = 2;
  else if (smoothVib >= 400) vibLevel = 1;
  else                      vibLevel = 0;

  if (vibLevel >= 3) {
    if (vibStableStart == 0) vibStableStart = millis();
    else if (millis() - vibStableStart >= 1000) vibAlarm = true;
  } else { vibStableStart = 0; vibAlarm = false; }
}

void handleVibration()
{
  if (vibAlarm) {
    vibAlarm = false; vibStableStart = 0; vibDoorOpenTime = millis();
    for (int a = 0; a <= 90; a += 2) { entryServo.write(a); delay(30); }
    for (int a = 0; a <= 90; a += 2) { exitServo.write(a); delay(30); }
    for (int a = 0; a <= 180; a += 2) { emergencyServo.write(a); delay(15); }
    digitalWrite(RELAY_PIN, HIGH); tone(BUZZER_PIN, 1000);
    printLine(0, " !! EARTHQUAKE !!"); printLine(1, "  EVACUATE NOW!  ");
  }
  if (vibDoorOpenTime > 0 && millis() - vibDoorOpenTime >= VIB_OPEN_MS) {
    vibDoorOpenTime = 0;
    entryServo.write(0); exitServo.write(0);
    for (int a = 180; a >= 0; a -= 2) { emergencyServo.write(a); delay(15); }
    digitalWrite(RELAY_PIN, LOW); noTone(BUZZER_PIN);
    entryMoveCount = 0; exitMoveCount = 0;
    entryNeedsRest = false; exitNeedsRest = false;
    fingerDoorIsOpen = false; fingerDoorOpenTime = 0;
    vibInCooldown = true; vibCooldownEnd = millis() + VIB_COOLDOWN_MS;
    updateDisplay(millis());
  }
}

void handleGasAlarm(bool active)
{
  if (active) {
    wasGasAlarm = true;
    for (int a = 0; a <= 90; a += 2) { entryServo.write(a); delay(30); }
    for (int a = 0; a <= 90; a += 2) { exitServo.write(a); delay(30); }
    for (int a = 0; a <= 180; a += 2) { emergencyServo.write(a); delay(15); }
    digitalWrite(RELAY_PIN, HIGH); tone(BUZZER_PIN, 1500);
    printLine(0, "  !! GAS LEAK !!"); printLine(1, "Lv:" + String((int)smoothGas) + " EVACUATE!");
  } else if (wasGasAlarm) {
    wasGasAlarm = false;
    entryServo.write(0); exitServo.write(0);
    for (int a = 180; a >= 0; a -= 2) { emergencyServo.write(a); delay(15); }
    digitalWrite(RELAY_PIN, LOW); noTone(BUZZER_PIN);
    entryMoveCount = 0; exitMoveCount = 0;
    entryNeedsRest = false; exitNeedsRest = false;
    updateDisplay(millis());
  }
}

// =================== الدخول والخروج ===================

void handleEntry()
{
  if (entryNeedsRest) return;
  if (vehicleCount < maxCapacity) {
    vehicleCount++; entryMoveCount++;
    for (int i = 0; i < 3; i++) { tone(BUZZER_PIN, 800); delay(150); noTone(BUZZER_PIN); delay(100); }
    for (int a = 0; a <= 90; a += 2) { entryServo.write(a); delay(30); }
    digitalWrite(RELAY_PIN, HIGH); delay(3000);
    for (int a = 90; a >= 0; a -= 2) { entryServo.write(a); delay(30); }
    digitalWrite(RELAY_PIN, LOW);
    for (int i = 0; i < 2; i++) { tone(BUZZER_PIN, 500); delay(150); noTone(BUZZER_PIN); delay(100); }
    updateDisplay(millis());
  } else {
    printLine(0, "   PARK FULL!     "); printLine(1, "   Can't Enter    ");
    delay(2000); updateDisplay(millis());
  }
}

void handleExit()
{
  if (exitNeedsRest) return;
  if (vehicleCount > 0) {
    vehicleCount--; exitMoveCount++;
    for (int i = 0; i < 3; i++) { tone(BUZZER_PIN, 800); delay(150); noTone(BUZZER_PIN); delay(100); }
    for (int a = 0; a <= 90; a += 2) { exitServo.write(a); delay(30); }
    digitalWrite(RELAY_PIN, HIGH); delay(3000);
    for (int a = 90; a >= 0; a -= 2) { exitServo.write(a); delay(30); }
    digitalWrite(RELAY_PIN, LOW);
    for (int i = 0; i < 2; i++) { tone(BUZZER_PIN, 500); delay(150); noTone(BUZZER_PIN); delay(100); }
    updateDisplay(millis());
  }
}

void checkServoRest()
{
  if (entryMoveCount >= 5) entryNeedsRest = true;
  if (exitMoveCount >= 5) exitNeedsRest = true;
  if (entryNeedsRest || exitNeedsRest) {
    printLine(0, " System Cooling   "); printLine(1, " Please wait...   ");
    delay(10000);
    entryNeedsRest = false; exitNeedsRest = false;
    entryMoveCount = 0; exitMoveCount = 0;
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

  if (prev && text != *prev) {
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

  String line0 = "C:" + String(vehicleCount) + "/" + String(maxCapacity) + " D:";
  if (days < 100) line0 += "0";
  if (days < 10) line0 += "0";
  line0 += String(days);
  line0 += (secs % 2 == 0) ? " " : ".";

  String line1 = "";
  if (hours < 10) line1 += "0";
  line1 += String(hours) + ":";
  if (mins < 10) line1 += "0";
  line1 += String(mins) + ":";
  if (secs < 10) line1 += "0";
  line1 += String(secs);

  if (secs % 4 == 0) line1 += " <";
  else if (secs % 4 == 1) line1 += " v";
  else if (secs % 4 == 2) line1 += " >";
  else line1 += " ^";
  line1 += " F:" + String(maxCapacity - vehicleCount);

  String line2 = "G:" + String((int)smoothGas);
  if (gasAlarm) line2 += " ALARM";
  else line2 += " OK    ";
  line2 += " V:" + String(vibLevel);

  String line3 = "FP:";
  line3 += (fingerInitialized ? String(fingerCount) : "OFF");
  line3 += " Br:";
  line3 += bridgeStatus;

  printLine(0, line0);
  printLine(1, line1);
  printLine(2, line2);
  printLine(3, line3);
}

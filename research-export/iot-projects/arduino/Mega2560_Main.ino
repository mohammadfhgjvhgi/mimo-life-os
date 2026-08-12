/*
 * =====================================================
 *  نظام الكراج الذكي - المتحكم الرئيسي (Mega 2560)
 *  Smart Parking System - Main Controller (Mega 2560)
 * =====================================================
 *  اللوحة: Arduino Mega + WiFi R3 (مدمجة)
 *  المكونات:
 *    - 3 Servo Motors (دخول D53, خروج D3, أمان D11)
 *    - 2 TCRT5000 IR Sensors (دخول D52, خروج D4)
 *    - MQ-2 Gas Sensor (A9 Analog فقط)
 *    - SW-420 Vibration Sensor (A10 Analog + EMA Filter)
 *    - Buzzer (D8), Light Relay (D25)
 *    - LCD I2C 16x2 (0x27)
 * =====================================================
 *  التواصل مع ESP8266:
 *    عبر Serial المدمج (مفاتيح DIP: 1,2 ON)
 *    Mega Serial.print() ←→ ESP Serial.read()
 * =====================================================
 *  الإصدار: 3.2.0
 *  التاريخ: 2025
 * =====================================================
 */

#include <Servo.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>

// =====================================================
// تعريف المنافذ
// Pin Definitions
// =====================================================

// --- Servo Motors ---
#define ENTRY_SERVO_PIN 53       // D53 - بوابة الدخول (0°=مغلق, 90°=مفتوح)
#define EXIT_SERVO_PIN 3         // D3  - بوابة الخروج (0°=مغلق, 90°=مفتوح)
#define SECURITY_SERVO_PIN 11    // D11 - باب غرفة الأمان (0°=مغلق, 180°=مفتوح)

// --- TCRT5000 IR Sensors ---
#define IR_ENTRY_PIN 52          // D52 - حساس دخول (LOW = كشف سيارة)
#define IR_EXIT_PIN 4            // D4  - حساس خروج (LOW = كشف سيارة)

// --- MQ-2 Gas Sensor (Analog فقط) ---
#define GAS_SENSOR_PIN A9        // A9 - MQ-2 Analog (0-1023 → 0-1000 ppm)

// --- SW-420 Vibration Sensor (Analog + EMA) ---
#define VIBRATION_SENSOR_PIN A10 // A10 - Analog فقط

// --- Buzzer & Relay ---
#define BUZZER_PIN 8             // D8  - جرس الإنذار
#define LIGHT_RELAY_PIN 25       // D25 - ريلي الإضاءة

// --- LCD 16x2 I2C ---
#define I2C_ADDR 0x27
LiquidCrystal_I2C lcd(I2C_ADDR, 16, 2);

// =====================================================
// كائنات Servo
// =====================================================
Servo entryGateServo;
Servo exitGateServo;
Servo securityDoorServo;

// =====================================================
// متغيرات النظام
// =====================================================

// حالة البوابات
bool entryGateOpen = false;
bool exitGateOpen = false;
bool securityDoorOpen = false;

// عداد السيارات
int carsInside = 0;
const int MAX_CARS = 12;

// حساسات TCRT5000
bool irEntryDetected = false;
bool irExitDetected = false;
bool entryCarPassed = false;
bool exitCarPassed = false;

// قراءات المستشعرات
int gasLevel = 0;
bool gasAlert = false;
bool vibrationDetected = false;

// EMA Filter للاهتزاز
float emaAlpha = 0.15;
float emaValue = 0.0;
const int VIBRATION_THRESHOLD = 500;
const int GAS_THRESHOLD = 400;

// حماية Servo
int servoMoveCount = 0;
unsigned long servoRestStart = 0;
const int MAX_SERVO_MOVES = 5;
const unsigned long SERVO_REST_TIME = 10000; // 10 ثواني راحة

// حالة WiFi (مستلمة من ESP8266)
bool wifiOK = false;
bool firebaseOK = false;

// =====================================================
// الإعدادات الأولية
// =====================================================
void setup() {
    // Serial - التواصل مع ESP8266 عبر المفاتيح (1,2 ON)
    // Baud Rate يجب أن يطابق كود ESP8266
    Serial.begin(115200);
    delay(500);

    // تهيئة I2C
    Wire.begin();

    // تهيئة المستشعرات
    initSensors();

    // تهيئة البوابات (إغلاق الكل)
    initGates();

    // تهيئة LCD
    lcd.init();
    lcd.backlight();

    // تهيئة فلتر الاهتزاز بقراءة أولى
    emaValue = analogRead(VIBRATION_SENSOR_PIN);

    // عرض جاهزية
    lcd.clear();
    lcd.print("Smart Garage v3");
    lcd.setCursor(0, 1);
    lcd.print("Ready!");
    delay(2000);

    // إرسال أول بيانات لـ ESP8266
    sendDataToESP();
}

// =====================================================
// الحلقة الرئيسية
// =====================================================
void loop() {
    // فحص راحة Servo
    if (servoRestStart > 0 && millis() - servoRestStart >= SERVO_REST_TIME) {
        servoRestStart = 0;
        servoMoveCount = 0;
    }

    // قراءة المستشعرات
    readSensors();

    // فحص حساسات IR
    checkIRSensors();

    // فحص مستشعرات السلامة
    checkSafetySensors();

    // استقبال أوامر من ESP8266 (عبر Serial)
    checkESPCommands();

    // إرسال البيانات إلى ESP8266 (عبر Serial)
    sendDataToESP();

    // تحديث LCD
    updateLCD();

    delay(100);
}

// =====================================================
// تهيئة المستشعرات
// =====================================================
void initSensors() {
    pinMode(IR_ENTRY_PIN, INPUT);
    pinMode(IR_EXIT_PIN, INPUT);
    pinMode(GAS_SENSOR_PIN, INPUT);
    pinMode(VIBRATION_SENSOR_PIN, INPUT);
    pinMode(BUZZER_PIN, OUTPUT);
    digitalWrite(BUZZER_PIN, LOW);
    pinMode(LIGHT_RELAY_PIN, OUTPUT);
    digitalWrite(LIGHT_RELAY_PIN, LOW);
}

// =====================================================
// تهيئة البوابات
// =====================================================
void initGates() {
    entryGateServo.attach(ENTRY_SERVO_PIN);
    exitGateServo.attach(EXIT_SERVO_PIN);
    securityDoorServo.attach(SECURITY_SERVO_PIN);

    // إغلاق الكل
    closeEntryGate();
    closeExitGate();
    closeSecurityDoor();
}

// =====================================================
// قراءة المستشعرات
// =====================================================
void readSensors() {
    // MQ-2 Gas (Analog → ppm تقريبي)
    int rawGas = analogRead(GAS_SENSOR_PIN);
    gasLevel = map(rawGas, 0, 1023, 0, 1000);
    gasAlert = (gasLevel > GAS_THRESHOLD);

    // SW-420 Vibration (EMA Filter)
    int rawVib = analogRead(VIBRATION_SENSOR_PIN);
    emaValue = (emaAlpha * rawVib) + ((1.0 - emaAlpha) * emaValue);
    vibrationDetected = (emaValue > VIBRATION_THRESHOLD);
}

// =====================================================
// فحص حساسات TCRT5000
// =====================================================
void checkIRSensors() {
    // === حساس الدخول ===
    bool irEntry = (digitalRead(IR_ENTRY_PIN) == LOW);

    if (irEntry && !irEntryDetected) {
        irEntryDetected = true;
        if (carsInside < MAX_CARS && servoRestStart == 0) {
            openEntryGate();
        } else if (carsInside >= MAX_CARS) {
            triggerBuzzer(2); // صفير: الكراج ممتلئ
        }
    }
    if (!irEntry) irEntryDetected = false;

    // === حساس الخروج ===
    bool irExit = (digitalRead(IR_EXIT_PIN) == LOW);

    if (irExit && !irExitDetected) {
        irExitDetected = true;
        if (servoRestStart == 0) {
            openExitGate();
        }
    }
    if (!irExit) irExitDetected = false;

    // === مرور سيارة من الدخول → إغلاق + عداد ===
    if (entryGateOpen && !entryCarPassed && irEntryDetected) {
        delay(500);
        entryCarPassed = true;
    }
    if (entryCarPassed && !irEntryDetected) {
        delay(1000);
        closeEntryGate();
        entryCarPassed = false;
        carsInside++;
    }

    // === مرور سيارة من الخروج → إغلاق + عداد ===
    if (exitGateOpen && !exitCarPassed && irExitDetected) {
        delay(500);
        exitCarPassed = true;
    }
    if (exitCarPassed && !irExitDetected) {
        delay(1000);
        closeExitGate();
        exitCarPassed = false;
        if (carsInside > 0) carsInside--;
    }
}

// =====================================================
// فحص مستشعرات السلامة (غاز + اهتزاز)
// =====================================================
void checkSafetySensors() {
    if (gasAlert) triggerAlarm("GAS");
    if (vibrationDetected) triggerAlarm("VIBRATION");
}

// =====================================================
// استقبال أوامر من ESP8266 (عبر Serial)
// =====================================================
void checkESPCommands() {
    if (!Serial.available()) return;

    String cmd = Serial.readStringUntil('\n');
    cmd.trim();
    if (cmd.length() == 0) return;

    // حالة WiFi من ESP8266
    if (cmd.startsWith("WIFI:")) {
        // WIFI:OK,FB:OK
        wifiOK = (cmd.indexOf("OK") >= 0);
        firebaseOK = (cmd.indexOf("FB:OK") >= 0);
        return;
    }

    // أوامر تحكم من Firebase عبر ESP8266
    if (cmd == "CMD:ENTRY:1") openEntryGate();
    else if (cmd == "CMD:ENTRY:0") closeEntryGate();
    else if (cmd == "CMD:EXIT:1") openExitGate();
    else if (cmd == "CMD:EXIT:0") closeExitGate();
    else if (cmd == "CMD:SECURITY:1") openSecurityDoor();
    else if (cmd == "CMD:SECURITY:0") closeSecurityDoor();
    else if (cmd == "CMD:LIGHT:1") { digitalWrite(LIGHT_RELAY_PIN, HIGH); }
    else if (cmd == "CMD:LIGHT:0") { digitalWrite(LIGHT_RELAY_PIN, LOW); }
    else if (cmd == "CMD:BUZZER:1") { triggerBuzzer(5); }
}

// =====================================================
// إرسال البيانات إلى ESP8266 (عبر Serial)
// تنسيق: DATA:cars,gasLevel,gasAlert,vibration,irEntry,irExit
// مثال:  DATA:5,320,0,0,1,0
// =====================================================
void sendDataToESP() {
    static unsigned long lastSend = 0;
    if (millis() - lastSend < 2000) return; // كل 2 ثانية
    lastSend = millis();

    Serial.print("DATA:");
    Serial.print(carsInside);
    Serial.print(",");
    Serial.print(gasLevel);
    Serial.print(",");
    Serial.print(gasAlert ? "1" : "0");
    Serial.print(",");
    Serial.print(vibrationDetected ? "1" : "0");
    Serial.print(",");
    Serial.print(irEntryDetected ? "1" : "0");
    Serial.print(",");
    Serial.println(irExitDetected ? "1" : "0");
}

// =====================================================
// تحديث LCD (مضاد للوميض)
// =====================================================
void updateLCD() {
    static unsigned long lastLcd = 0;
    static String lastLine0 = "";
    static String lastLine1 = "";

    if (millis() - lastLcd < 1000) return;
    lastLcd = millis();

    String line0 = "Cars:" + String(carsInside) + "/" + String(MAX_CARS);
    if (wifiOK) line0 += " W";

    String line1 = "G:" + String(gasLevel) + " V:";
    line1 += vibrationDetected ? "!" : "OK";
    if (gasAlert || vibrationDetected) line1 += " !!";

    if (line0 != lastLine0 || line1 != lastLine1) {
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print(line0);
        lcd.setCursor(0, 1);
        lcd.print(line1);
        lastLine0 = line0;
        lastLine1 = line1;
    }
}

// =====================================================
// التحكم بالبوابات (مع حماية Servo)
// =====================================================
bool canMoveServo() {
    if (servoRestStart > 0) return false;
    servoMoveCount++;
    if (servoMoveCount >= MAX_SERVO_MOVES) {
        servoRestStart = millis();
        return false;
    }
    return true;
}

void openEntryGate() {
    if (entryGateOpen || !canMoveServo()) return;
    entryGateOpen = true;
    entryCarPassed = false;
    for (int p = 0; p <= 90; p += 5) { entryGateServo.write(p); delay(15); }
}

void closeEntryGate() {
    if (!entryGateOpen || !canMoveServo()) return;
    entryGateOpen = false;
    for (int p = 90; p >= 0; p -= 5) { entryGateServo.write(p); delay(15); }
}

void openExitGate() {
    if (exitGateOpen || !canMoveServo()) return;
    exitGateOpen = true;
    exitCarPassed = false;
    for (int p = 0; p <= 90; p += 5) { exitGateServo.write(p); delay(15); }
}

void closeExitGate() {
    if (!exitGateOpen || !canMoveServo()) return;
    exitGateOpen = false;
    for (int p = 90; p >= 0; p -= 5) { exitGateServo.write(p); delay(15); }
}

void openSecurityDoor() {
    if (securityDoorOpen || !canMoveServo()) return;
    securityDoorOpen = true;
    for (int p = 0; p <= 180; p += 5) { securityDoorServo.write(p); delay(15); }
}

void closeSecurityDoor() {
    if (!securityDoorOpen || !canMoveServo()) return;
    securityDoorOpen = false;
    for (int p = 180; p >= 0; p -= 5) { securityDoorServo.write(p); delay(15); }
}

// =====================================================
// الإنذارات
// =====================================================
void triggerAlarm(String type) {
    triggerBuzzer(10);

    // وميض إضاءة طوارئ
    for (int i = 0; i < 5; i++) {
        digitalWrite(LIGHT_RELAY_PIN, HIGH);
        delay(200);
        digitalWrite(LIGHT_RELAY_PIN, LOW);
        delay(200);
    }

    // فتح باب غرفة الأمان تلقائياً
    openSecurityDoor();
    // إعادة تعيين حماية Servo بعد حالة الطوارئ
    servoRestStart = 0;
    servoMoveCount = 0;
}

void triggerBuzzer(int times) {
    for (int i = 0; i < times; i++) {
        digitalWrite(BUZZER_PIN, HIGH);
        delay(200);
        digitalWrite(BUZZER_PIN, LOW);
        delay(200);
    }
}

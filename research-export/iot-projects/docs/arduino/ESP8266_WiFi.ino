/*
 * =====================================================
 *  نظام الكراج الذكي - وحدة WiFi (ESP8266)
 *  Smart Parking System - WiFi Module (ESP8266)
 * =====================================================
 *  اللوحة: Arduino Mega + WiFi R3 (مدمجة)
 *  الوظيفة: جسر Serial ←→ Firebase
 *    - يستقبل بيانات من Mega عبر Serial (المشترك)
 *    - يرفعها إلى Firebase Realtime Database
 *    - يستقبل أوامر من Firebase ويحولها للمega
 * =====================================================
 *  تواصل:
 *    ESP8266 Serial ←→ Mega Serial (مفاتيح DIP: 1,2 ON)
 *    Baud Rate: 115200 (يجب أن يكون موحد)
 * =====================================================
 *  الإصدار: 3.2.0
 *  التاريخ: 2025
 * =====================================================
 */

#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

// =====================================================
// إعدادات WiFi - غيّرها لشبكتك
// =====================================================
#define WIFI_SSID       "Your_WiFi_Name"
#define WIFI_PASSWORD   "Your_WiFi_Password"

// =====================================================
// إعدادات Firebase
// =====================================================
#define FIREBASE_HOST "my-systim-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH ""  // غيّرها بمفتاح Database Secrets من Firebase Console

// كائن Firebase
FirebaseData firebaseData;

// =====================================================
// متغيرات النظام
// =====================================================
unsigned long lastFirebaseSync = 0;
const unsigned long FIREBASE_INTERVAL = 2000;  // مزامنة كل 2 ثانية

unsigned long lastCommandCheck = 0;
const unsigned long COMMAND_INTERVAL = 500;    // فحص الأوامر كل 0.5 ثانية

// حالة المستشعرات المستلمة من Mega
struct SensorData {
    int carsCount;
    int gasLevel;
    bool gasAlert;
    bool vibrationAlert;
    bool irEntry;
    bool irExit;
};

SensorData sensors = {0, 0, false, false, false, false};

// تتبع أوامر Firebase (لتجنب الإرسال المتكرر)
struct Commands {
    bool entryGate;
    bool exitGate;
    bool securityDoor;
    bool light;
    bool buzzer;
};

Commands lastCmd = {false, false, false, false, false};

// =====================================================
// الإعدادات الأولية
// =====================================================
void setup() {
    // Serial - التواصل مع Mega (مفاتيح DIP: 1,2 ON)
    Serial.begin(115200);
    delay(1000);

    // الاتصال بـ WiFi
    connectWiFi();

    // الاتصال بـ Firebase
    connectFirebase();
}

// =====================================================
// الحلقة الرئيسية
// =====================================================
void loop() {
    // إعادة الاتصال إذا انقطع WiFi
    if (WiFi.status() != WL_CONNECTED) {
        connectWiFi();
    }

    // استقبال بيانات من Mega عبر Serial
    if (Serial.available()) {
        String data = Serial.readStringUntil('\n');
        parseMegaData(data);
    }

    // مزامنة البيانات مع Firebase (كل 2 ثانية)
    if (millis() - lastFirebaseSync >= FIREBASE_INTERVAL) {
        lastFirebaseSync = millis();
        syncToFirebase();
    }

    // فحص أوامر التحكم من Firebase (كل 0.5 ثانية)
    if (millis() - lastCommandCheck >= COMMAND_INTERVAL) {
        lastCommandCheck = millis();
        checkFirebaseCommands();
    }

    delay(10);
}

// =====================================================
// الاتصال بشبكة WiFi
// =====================================================
void connectWiFi() {
    WiFi.mode(WIFI_STA);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 30) {
        delay(500);
        attempts++;
    }

    // إرسال حالة WiFi للمega
    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("WIFI:OK,FB:?");
    } else {
        Serial.println("WIFI:FAIL,FB:FAIL");
    }
}

// =====================================================
// الاتصال بـ Firebase
// =====================================================
void connectFirebase() {
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    Firebase.setMaxRetry(firebaseData, 3);

    // فحص الاتصال
    if (Firebase.getInt(firebaseData, "/garage/maxCars")) {
        Serial.println("WIFI:OK,FB:OK");
    } else {
        Serial.println("WIFI:OK,FB:FAIL");
    }
}

// =====================================================
// تحليل البيانات من Mega 2560
// =====================================================
// تنسيق: DATA:cars,gasLevel,gasAlert,vibration,irEntry,irExit
// مثال:  DATA:5,320,0,0,1,0
//
void parseMegaData(String data) {
    data.trim();

    // تجاهل رسائل WiFi والأوامر
    if (!data.startsWith("DATA:")) return;

    data = data.substring(5); // إزالة "DATA:"

    int idx = 0;
    int comma;

    // 1) عدد السيارات
    comma = data.indexOf(',', idx);
    if (comma > 0) {
        sensors.carsCount = data.substring(idx, comma).toInt();
        idx = comma + 1;
    }

    // 2) مستوى الغاز (ppm)
    comma = data.indexOf(',', idx);
    if (comma > 0) {
        sensors.gasLevel = data.substring(idx, comma).toInt();
        idx = comma + 1;
    }

    // 3) إنذار الغاز (0/1)
    comma = data.indexOf(',', idx);
    if (comma > 0) {
        sensors.gasAlert = (data.substring(idx, comma) == "1");
        idx = comma + 1;
    }

    // 4) إنذار الاهتزاز (0/1)
    comma = data.indexOf(',', idx);
    if (comma > 0) {
        sensors.vibrationAlert = (data.substring(idx, comma) == "1");
        idx = comma + 1;
    }

    // 5) حساس IR الدخول (0/1)
    comma = data.indexOf(',', idx);
    if (comma > 0) {
        sensors.irEntry = (data.substring(idx, comma) == "1");
        idx = comma + 1;
    }

    // 6) حساس IR الخروج (0/1)
    if (idx < data.length()) {
        sensors.irExit = (data.substring(idx) == "1");
    }
}

// =====================================================
// مزامنة بيانات المستشعرات مع Firebase
// =====================================================
void syncToFirebase() {
    if (WiFi.status() != WL_CONNECTED) return;
    if (!Firebase.isWiFiOK()) return;

    // إرسال جميع البيانات دفعة واحدة (JSON)
    FirebaseJson json;
    json.set("carsCount", sensors.carsCount);
    json.set("gasLevel", sensors.gasLevel);
    json.set("gasAlert", sensors.gasAlert);
    json.set("vibrationAlert", sensors.vibrationAlert);
    json.set("irEntry", sensors.irEntry);
    json.set("irExit", sensors.irExit);

    Firebase.updateNode(firebaseData, "/garage", json);

    // إرسال حالة WiFi/Firebase للمega
    Serial.println("WIFI:OK,FB:OK");
}

// =====================================================
// فحص أوامر التحكم من Firebase
// =====================================================
void checkFirebaseCommands() {
    if (WiFi.status() != WL_CONNECTED) return;
    if (!Firebase.isWiFiOK()) return;

    // بوابة الدخول
    if (Firebase.getBool(firebaseData, "/commands/entryGate")) {
        bool val = firebaseData.boolData();
        if (val && !lastCmd.entryGate) {
            lastCmd.entryGate = true;
            Serial.println("CMD:ENTRY:1");
            Firebase.setBool(firebaseData, "/commands/entryGate", false);
        }
    }

    // بوابة الخروج
    if (Firebase.getBool(firebaseData, "/commands/exitGate")) {
        bool val = firebaseData.boolData();
        if (val && !lastCmd.exitGate) {
            lastCmd.exitGate = true;
            Serial.println("CMD:EXIT:1");
            Firebase.setBool(firebaseData, "/commands/exitGate", false);
        }
    }

    // باب غرفة الأمان
    if (Firebase.getBool(firebaseData, "/commands/securityDoor")) {
        bool val = firebaseData.boolData();
        if (val && !lastCmd.securityDoor) {
            lastCmd.securityDoor = true;
            Serial.println("CMD:SECURITY:1");
            Firebase.setBool(firebaseData, "/commands/securityDoor", false);
        }
    }

    // الإضاءة (Relay)
    if (Firebase.getBool(firebaseData, "/commands/light")) {
        bool val = firebaseData.boolData();
        if (val && !lastCmd.light) {
            lastCmd.light = true;
            Serial.println("CMD:LIGHT:1");
            Firebase.setBool(firebaseData, "/commands/light", false);
        }
    }

    // جرس الإنذار
    if (Firebase.getBool(firebaseData, "/commands/buzzer")) {
        bool val = firebaseData.boolData();
        if (val && !lastCmd.buzzer) {
            lastCmd.buzzer = true;
            Serial.println("CMD:BUZZER:1");
            Firebase.setBool(firebaseData, "/commands/buzzer", false);
        }
    }
}

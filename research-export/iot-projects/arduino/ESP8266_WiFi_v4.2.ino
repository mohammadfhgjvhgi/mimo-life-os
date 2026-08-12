// ============================================
// Smart Parking + Safety System - ESP8266 v4.2
// Board: Arduino Mega + WiFi R3 (ESP part)
// Communication: Serial (routed to Mega Serial3)
// Library: Firebase ESP Client by mobizt
// ============================================

#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>

// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// ============ WiFi ============
#define WIFI_SSID "WIFI"
#define WIFI_PASSWORD "12345678"

// ============ Firebase ============
#define API_KEY "AIzaSyBOzSZmN9xu9O_Kz8-2TsBXGgZ0d4KdvK0"
#define DATABASE_URL "https://my-systim-default-rtdb.firebaseio.com"

// ============ Serial ============
#define BAUD_RATE 115200

// ============ Firebase Objects ============
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// ============ Timing ============
unsigned long sendDataPrevMillis = 0;
unsigned long checkCmdPrevMillis = 0;
const unsigned long SEND_INTERVAL = 1000;
const unsigned long CMD_INTERVAL = 3000;
bool signupOK = false;

// ============ Protocol Buffer ============
String inputBuffer = "";

// ============ State ============
int lastCmdEntry = 0;
int lastCmdExit = 0;
int lastCmdSecurity = 0;
int lastCmdLight = 0;
int lastCmdBuzzer = 0;

// ============================================
void setup() {
  Serial.begin(BAUD_RATE);

  // WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("WIFI:CONNECTING");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WIFI:CONNECTED");

  // Firebase config
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  // Anonymous sign-in
  if (Firebase.signUp(&config, &auth, "", "")) {
    signupOK = true;
  } else {
    Serial.println("WIFI:AUTH_FAILED");
  }

  config.token_status_callback = tokenStatusCallback;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  // Memory optimization
  fbdo.setBSSLBufferSize(2048, 1024);
  fbdo.setResponseSize(1024);

  // Ready signal
  Serial.println("SYSTEM:READY");
}

// ============================================
void loop() {
  // Send ready signal periodically
  if (Firebase.ready() && signupOK) {
    if (millis() - sendDataPrevMillis > SEND_INTERVAL) {
      sendDataPrevMillis = millis();
    }
  }

  // Read from Mega (piped protocol)
  readFromMega();

  // Check Firebase commands
  if (millis() - checkCmdPrevMillis > CMD_INTERVAL) {
    checkCmdPrevMillis = millis();
    checkCommands();
  }
}

// ============================================
// READ FROM MEGA (Buffer Parsing)
// ============================================
void readFromMega() {
  while (Serial.available()) {
    char c = Serial.read();

    if (c == '\n') {
      if (inputBuffer.length() > 0) {
        parsePipedData(inputBuffer);
        inputBuffer = "";
      }
    } else {
      inputBuffer += c;
    }

    // Buffer overflow protection
    if (inputBuffer.length() > 200) {
      inputBuffer = "";
    }
  }
}

void parsePipedData(String data) {
  // Format: KEY:VALUE|KEY:VALUE|KEY:VALUE|...
  int pos = 0;
  while (pos < data.length()) {
    int pipeIdx = data.indexOf('|', pos);
    String pair;
    if (pipeIdx == -1) {
      pair = data.substring(pos);
      pos = data.length();
    } else {
      pair = data.substring(pos, pipeIdx);
      pos = pipeIdx + 1;
    }

    int colonIdx = pair.indexOf(':');
    if (colonIdx > 0) {
      String key = pair.substring(0, colonIdx);
      String value = pair.substring(colonIdx + 1);
      processSensorData(key, value);
    }
  }
}

void processSensorData(String key, String value) {
  // Batch update: set all values, then commit once
  // For efficiency, we send each individually but with keep-alive

  if (key == "CAR") {
    Firebase.RTDB.setInt(&fbdo, "/garage/carsCount", value.toInt());
  } else if (key == "MAX") {
    Firebase.RTDB.setInt(&fbdo, "/garage/maxCars", value.toInt());
  } else if (key == "GAS") {
    Firebase.RTDB.setInt(&fbdo, "/garage/gasLevel", value.toInt());
  } else if (key == "GA") {
    Firebase.RTDB.setInt(&fbdo, "/garage/gasAlert", value.toInt());
  } else if (key == "GD") {
    Firebase.RTDB.setInt(&fbdo, "/garage/gasDigital", value.toInt());
  } else if (key == "VA") {
    Firebase.RTDB.setInt(&fbdo, "/garage/vibrationAlert", value.toInt());
  } else if (key == "VL") {
    Firebase.RTDB.setInt(&fbdo, "/garage/vibrationLevel", value.toInt());
  } else if (key == "EG") {
    Firebase.RTDB.setInt(&fbdo, "/garage/entryGate", value.toInt());
  } else if (key == "XG") {
    Firebase.RTDB.setInt(&fbdo, "/garage/exitGate", value.toInt());
  } else if (key == "SD") {
    Firebase.RTDB.setInt(&fbdo, "/garage/securityDoor", value.toInt());
  } else if (key == "RL") {
    Firebase.RTDB.setInt(&fbdo, "/garage/relay", value.toInt());
  }
}

// ============================================
// CHECK FIREBASE COMMANDS
// ============================================
void checkCommands() {
  if (!Firebase.ready() || !signupOK) return;

  // Entry Gate
  if (Firebase.RTDB.getInt(&fbdo, "/commands/entryGate")) {
    int val = fbdo.intData();
    if (val == 1 && lastCmdEntry != 1) {
      Serial.println("OPEN_ENTRY");
      Firebase.RTDB.setInt(&fbdo, "/commands/entryGate", 0);
    }
    lastCmdEntry = val;
  }

  // Exit Gate
  if (Firebase.RTDB.getInt(&fbdo, "/commands/exitGate")) {
    int val = fbdo.intData();
    if (val == 1 && lastCmdExit != 1) {
      Serial.println("OPEN_EXIT");
      Firebase.RTDB.setInt(&fbdo, "/commands/exitGate", 0);
    }
    lastCmdExit = val;
  }

  // Security Door
  if (Firebase.RTDB.getInt(&fbdo, "/commands/securityDoor")) {
    int val = fbdo.intData();
    if (val == 1 && lastCmdSecurity != 1) {
      Serial.println("OPEN_SECURITY");
      Firebase.RTDB.setInt(&fbdo, "/commands/securityDoor", 0);
    } else if (val == 2 && lastCmdSecurity != 2) {
      Serial.println("CLOSE_SECURITY");
      Firebase.RTDB.setInt(&fbdo, "/commands/securityDoor", 0);
    }
    lastCmdSecurity = val;
  }

  // Light
  if (Firebase.RTDB.getInt(&fbdo, "/commands/light")) {
    int val = fbdo.intData();
    if (val == 1 && lastCmdLight != 1) {
      Serial.println("LIGHT_ON");
      Firebase.RTDB.setInt(&fbdo, "/commands/light", 0);
    } else if (val == 2 && lastCmdLight != 2) {
      Serial.println("LIGHT_OFF");
      Firebase.RTDB.setInt(&fbdo, "/commands/light", 0);
    }
    lastCmdLight = val;
  }

  // Buzzer
  if (Firebase.RTDB.getInt(&fbdo, "/commands/buzzer")) {
    int val = fbdo.intData();
    if (val == 1 && lastCmdBuzzer != 1) {
      Serial.println("BUZZER_ON");
      Firebase.RTDB.setInt(&fbdo, "/commands/buzzer", 0);
    }
    lastCmdBuzzer = val;
  }
}

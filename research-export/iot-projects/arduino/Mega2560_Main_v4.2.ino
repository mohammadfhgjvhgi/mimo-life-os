// ============================================
// Smart Parking + Safety System - MEGA2560 v4.2
// Board: Arduino Mega + WiFi R3
// ESP Communication: Serial3 (pins 14/15)
// ============================================

#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>

// ============ LCD ============
LiquidCrystal_I2C lcd(0x27, 20, 4);

// ============ Servos ============
Servo entryServo;
Servo exitServo;
Servo emergencyServo;

#define ENTRY_SERVO_PIN  53
#define EXIT_SERVO_PIN   3
#define EMERGENCY_SERVO_PIN 11

#define SERVO_OPEN    90
#define SERVO_CLOSED  0

// ============ Sensors ============
#define ENTRY_SENSOR   52
#define EXIT_SENSOR    4
#define GAS_ANALOG     A9
#define GAS_DIGITAL    41
#define VIB_SENSOR     A10

// ============ Outputs ============
#define RELAY_PIN  25
#define BUZZER_PIN 8

// ============ Constants ============
const int MAX_CARS = 9;
const int GAS_THRESHOLD = 400;
const int GAS_STABLE_MS = 1000;
const int VIB_LEVEL_1 = 400;
const int VIB_LEVEL_2 = 600;
const int VIB_LEVEL_3 = 800;
const int EMERGENCY_OPEN_MS = 10000;
const int EMERGENCY_COOLDOWN_MS = 5000;
const int GATE_WAIT_MS = 3000;
const int SERVO_MAX_MOVES = 5;
const int SERVO_REST_MS = 10000;

// ============ State Variables ============
int carCount = 0;
bool entryGateOpen = false;
bool exitGateOpen = false;
bool securityDoorOpen = false;
bool gasAlarm = false;
bool vibAlarm = false;
bool relayOn = false;

// Gas
float smoothGas = 0;
bool gasDigitalState = false;
unsigned long gasStableStart = 0;
bool gasTriggered = false;

// Vibration
int vibrationLevel = 0;
unsigned long emergencyOpenStart = 0;
unsigned long lastCooldownEnd = 0;
bool inCooldown = false;

// Servo protection
int servoMoveCount = 0;

// Entry/Exit
bool lastEntryState = HIGH;
bool lastExitState = HIGH;
unsigned long entryTriggerTime = 0;
unsigned long exitTriggerTime = 0;
bool entryWaiting = false;
bool exitWaiting = false;

// LCD
String lcdLines[4] = {"", "", "", ""};

// Send timer
unsigned long lastSendTime = 0;
const unsigned long SEND_INTERVAL = 1000;

// WiFi status
String wifiStatus = "DISCONNECTED";
unsigned long wifiTimeout = 0;

// ============================================
void setup() {
  Serial.begin(9600);
  Serial3.begin(115200);

  // LCD
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(2, 0);
  lcd.print("SMART PARKING");
  lcd.setCursor(5, 1);
  lcd.print("SYSTEM");
  delay(2000);

  // Servos
  entryServo.attach(ENTRY_SERVO_PIN);
  exitServo.attach(EXIT_SERVO_PIN);
  emergencyServo.attach(EMERGENCY_SERVO_PIN);
  entryServo.write(SERVO_CLOSED);
  exitServo.write(SERVO_CLOSED);
  emergencyServo.write(SERVO_CLOSED);

  // Sensors
  pinMode(ENTRY_SENSOR, INPUT_PULLUP);
  pinMode(EXIT_SENSOR, INPUT_PULLUP);
  pinMode(GAS_DIGITAL, INPUT_PULLUP);
  pinMode(VIB_SENSOR, INPUT);

  // Outputs
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);
  noTone(BUZZER_PIN);

  updateDisplay();
}

// ============================================
void loop() {
  checkSerial();
  readGasSensor();
  readVibrationSensor();
  handleEntry();
  handleExit();
  sendData();
}

// ============================================
// SERIAL COMMUNICATION (Mega <-> ESP via Serial3)
// ============================================
void checkSerial() {
  // Check commands from ESP (Serial3)
  while (Serial3.available()) {
    String cmd = Serial3.readStringUntil('\n');
    cmd.trim();
    processCommand(cmd);
  }

  // Debug from PC (main Serial)
  while (Serial.available()) {
    String dbg = Serial.readStringUntil('\n');
    dbg.trim();
    if (dbg.length() > 0) {
      Serial3.println(dbg);
    }
  }
}

void processCommand(String cmd) {
  if (cmd == "OPEN_ENTRY") {
    openEntryGate();
  } else if (cmd == "OPEN_EXIT") {
    openExitGate();
  } else if (cmd == "OPEN_SECURITY") {
    openSecurityDoor();
  } else if (cmd == "CLOSE_SECURITY") {
    closeSecurityDoor();
  } else if (cmd == "LIGHT_ON") {
    digitalWrite(RELAY_PIN, HIGH);
    relayOn = true;
  } else if (cmd == "LIGHT_OFF") {
    digitalWrite(RELAY_PIN, LOW);
    relayOn = false;
  } else if (cmd == "BUZZER_ON") {
    tone(BUZZER_PIN, 1000);
  } else if (cmd.startsWith("SYSTEM:READY")) {
    wifiStatus = "CONNECTED";
    wifiTimeout = millis();
  } else if (cmd.startsWith("WIFI:")) {
    wifiStatus = cmd.substring(5);
    if (wifiStatus != "CONNECTED") wifiTimeout = millis();
  }
}

// ============================================
// DATA SENDING (Piped Protocol)
// ============================================
void sendData() {
  if (millis() - lastSendTime < SEND_INTERVAL) return;
  lastSendTime = millis();

  // Check WiFi timeout (30s)
  if (wifiStatus == "CONNECTED" && millis() - wifiTimeout > 30000) {
    wifiStatus = "DISCONNECTED";
  }

  String data = "CAR:" + String(carCount)
    + "|MAX:" + String(MAX_CARS)
    + "|GAS:" + String((int)smoothGas)
    + "|GA:" + String(gasAlarm ? 1 : 0)
    + "|GD:" + String(gasDigitalState ? 1 : 0)
    + "|VA:" + String(vibAlarm ? 1 : 0)
    + "|VL:" + String(vibrationLevel)
    + "|EG:" + String(entryGateOpen ? 1 : 0)
    + "|XG:" + String(exitGateOpen ? 1 : 0)
    + "|SD:" + String(securityDoorOpen ? 1 : 0)
    + "|RL:" + String(relayOn ? 1 : 0);

  Serial3.println(data);
}

// ============================================
// GAS SENSOR
// ============================================
void readGasSensor() {
  int rawGas = analogRead(GAS_ANALOG);
  smoothGas = smoothGas * 0.7 + rawGas * 0.3;
  gasDigitalState = !digitalRead(GAS_DIGITAL);

  // AND logic: analog > threshold AND digital is HIGH
  bool bothConditions = (smoothGas > GAS_THRESHOLD) && gasDigitalState;

  if (bothConditions && !gasTriggered) {
    if (gasStableStart == 0) {
      gasStableStart = millis();
    } else if (millis() - gasStableStart >= GAS_STABLE_MS) {
      gasTriggered = true;
      gasAlarm = true;
      triggerGasAlarm();
    }
  } else if (!bothConditions) {
    gasStableStart = 0;
    if (gasTriggered) {
      gasTriggered = false;
      gasAlarm = false;
      clearGasAlarm();
    }
  }
}

void triggerGasAlarm() {
  tone(BUZZER_PIN, 1500);
  openEntryGate();
  openExitGate();
  openSecurityDoor();
  updateDisplay();
}

void clearGasAlarm() {
  noTone(BUZZER_PIN);
  closeEntryGate();
  closeExitGate();
  closeSecurityDoor();
  updateDisplay();
}

// ============================================
// VIBRATION SENSOR
// ============================================
void readVibrationSensor() {
  int raw = analogRead(VIB_SENSOR);

  if (raw < VIB_LEVEL_1) {
    vibrationLevel = 0;
  } else if (raw < VIB_LEVEL_2) {
    vibrationLevel = 1;
  } else if (raw < VIB_LEVEL_3) {
    vibrationLevel = 2;
  } else {
    vibrationLevel = 3;
  }

  // Level 3+ triggers emergency
  if (vibrationLevel >= 3 && !vibAlarm) {
    if (!inCooldown) {
      vibAlarm = true;
      triggerVibrationAlarm();
    }
  }

  // Cooldown management
  if (vibAlarm && emergencyOpenStart > 0) {
    if (millis() - emergencyOpenStart >= EMERGENCY_OPEN_MS) {
      noTone(BUZZER_PIN);
      closeEntryGate();
      closeExitGate();
      closeSecurityDoor();
      vibAlarm = false;
      emergencyOpenStart = 0;
      inCooldown = true;
      lastCooldownEnd = millis();
      updateDisplay();
    }
  }

  if (inCooldown && millis() - lastCooldownEnd >= EMERGENCY_COOLDOWN_MS) {
    inCooldown = false;
  }
}

void triggerVibrationAlarm() {
  tone(BUZZER_PIN, 1000);
  openEntryGate();
  openExitGate();
  openSecurityDoor();
  emergencyOpenStart = millis();
  updateDisplay();
}

// ============================================
// ENTRY / EXIT HANDLING
// ============================================
void handleEntry() {
  bool currentState = digitalRead(ENTRY_SENSOR);

  if (currentState == LOW && lastEntryState == HIGH) {
    if (!entryWaiting) {
      entryTriggerTime = millis();
      entryWaiting = true;
    }
  }

  if (entryWaiting && currentState == LOW && millis() - entryTriggerTime >= 300) {
    if (!entryGateOpen && carCount < MAX_CARS && !gasAlarm && !vibAlarm) {
      carCount++;
      openEntryGate();
      updateDisplay();
    }
    entryWaiting = false;
  }

  if (currentState == HIGH && entryWaiting && millis() - entryTriggerTime >= 500) {
    entryWaiting = false;
  }

  lastEntryState = currentState;
}

void handleExit() {
  bool currentState = digitalRead(EXIT_SENSOR);

  if (currentState == LOW && lastExitState == HIGH) {
    if (!exitWaiting) {
      exitTriggerTime = millis();
      exitWaiting = true;
    }
  }

  if (exitWaiting && currentState == LOW && millis() - exitTriggerTime >= 300) {
    if (!exitGateOpen && carCount > 0 && !gasAlarm && !vibAlarm) {
      carCount--;
      openExitGate();
      updateDisplay();
    }
    exitWaiting = false;
  }

  if (currentState == HIGH && exitWaiting && millis() - exitTriggerTime >= 500) {
    exitWaiting = false;
  }

  lastExitState = currentState;
}

// ============================================
// SERVO CONTROL (with protection)
// ============================================
void moveServo(Servo &sv, int angle, String name) {
  servoMoveCount++;

  if (servoMoveCount > SERVO_MAX_MOVES) {
    lcd.clear();
    lcd.setCursor(1, 1);
    lcd.print("System Cooling...");
    delay(SERVO_REST_MS);
    servoMoveCount = 0;
    lcd.clear();
  }

  sv.write(angle);
  delay(500);
}

void openEntryGate() {
  if (!entryGateOpen) {
    moveServo(entryServo, SERVO_OPEN, "Entry");
    entryGateOpen = true;
    delay(GATE_WAIT_MS);
    closeEntryGate();
  }
}

void closeEntryGate() {
  if (entryGateOpen) {
    moveServo(entryServo, SERVO_CLOSED, "Entry");
    entryGateOpen = false;
  }
}

void openExitGate() {
  if (!exitGateOpen) {
    moveServo(exitServo, SERVO_OPEN, "Exit");
    exitGateOpen = true;
    delay(GATE_WAIT_MS);
    closeExitGate();
  }
}

void closeExitGate() {
  if (exitGateOpen) {
    moveServo(exitServo, SERVO_CLOSED, "Exit");
    exitGateOpen = false;
  }
}

void openSecurityDoor() {
  if (!securityDoorOpen) {
    moveServo(emergencyServo, SERVO_OPEN, "Security");
    securityDoorOpen = true;
  }
}

void closeSecurityDoor() {
  if (securityDoorOpen) {
    moveServo(emergencyServo, SERVO_CLOSED, "Security");
    securityDoorOpen = false;
  }
}

// ============================================
// LCD DISPLAY
// ============================================
void updateDisplay() {
  String lines[4];

  // Line 0: Title
  lines[0] = "  SMART PARKING SYS";

  // Line 1: Car count
  String spaces = "               ";
  String carStr = String(carCount);
  String pos = String(MAX_CARS);
  String centered = spaces.substring(0, (20 - carStr.length() - pos.length() - 3) / 2);
  lines[1] = centered + "Cars:" + carStr + "/" + pos;

  // Line 2: Status
  String status = "";
  if (gasAlarm) status += "GAS! ";
  if (vibAlarm) status += "VIB! ";
  if (status.length() == 0) status = "Status: OK";
  lines[2] = status;

  // Line 3: WiFi + relay
  lines[3] = "WiFi:" + wifiStatus;
  if (relayOn) lines[3] += " Light:ON";

  // Anti-flicker: only update changed lines
  for (int i = 0; i < 4; i++) {
    if (lines[i] != lcdLines[i]) {
      lcdLines[i] = lines[i];
      lcd.setCursor(0, i);
      lcd.print(lines[i]);
      // Clear rest of line
      for (int j = lines[i].length(); j < 20; j++) {
        lcd.print(" ");
      }
    }
  }
}

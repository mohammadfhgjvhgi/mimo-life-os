// ============================================
// Smart Parking + Safety System - MEGA2560 v4.3
// Communication: Serial1 (pins 18/19) via Uno Bridge
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

float smoothGas = 0;
bool gasDigitalState = false;
unsigned long gasStableStart = 0;
bool gasTriggered = false;

int vibrationLevel = 0;
unsigned long emergencyOpenStart = 0;
unsigned long lastCooldownEnd = 0;
bool inCooldown = false;

int servoMoveCount = 0;

bool lastEntryState = HIGH;
bool lastExitState = HIGH;
unsigned long entryTriggerTime = 0;
unsigned long exitTriggerTime = 0;
bool entryWaiting = false;
bool exitWaiting = false;

String lcdLines[4] = {"", "", "", ""};

unsigned long lastSendTime = 0;
const unsigned long SEND_INTERVAL = 1000;

String wifiStatus = "CONNECTED";
unsigned long wifiTimeout = 0;

// ============================================
void setup() {
  Serial1.begin(115200);

  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(2, 0);
  lcd.print("SMART PARKING");
  lcd.setCursor(5, 1);
  lcd.print("SYSTEM");
  delay(2000);

  entryServo.attach(ENTRY_SERVO_PIN);
  exitServo.attach(EXIT_SERVO_PIN);
  emergencyServo.attach(EMERGENCY_SERVO_PIN);
  entryServo.write(SERVO_CLOSED);
  exitServo.write(SERVO_CLOSED);
  emergencyServo.write(SERVO_CLOSED);

  pinMode(ENTRY_SENSOR, INPUT_PULLUP);
  pinMode(EXIT_SENSOR, INPUT_PULLUP);
  pinMode(GAS_DIGITAL, INPUT_PULLUP);
  pinMode(VIB_SENSOR, INPUT);

  pinMode(RELAY_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);
  noTone(BUZZER_PIN);

  wifiStatus = "CONNECTED";
  wifiTimeout = millis();

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
void checkSerial() {
  while (Serial1.available()) {
    String cmd = Serial1.readStringUntil('\n');
    cmd.trim();
    processCommand(cmd);
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
void sendData() {
  if (millis() - lastSendTime < SEND_INTERVAL) return;
  lastSendTime = millis();

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

  Serial1.println(data);
}

// ============================================
void readGasSensor() {
  int rawGas = analogRead(GAS_ANALOG);
  smoothGas = smoothGas * 0.7 + rawGas * 0.3;
  gasDigitalState = !digitalRead(GAS_DIGITAL);

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

  if (vibrationLevel >= 3 && !vibAlarm) {
    if (!inCooldown) {
      vibAlarm = true;
      triggerVibrationAlarm();
    }
  }

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
void updateDisplay() {
  String lines[4];

  lines[0] = "  SMART PARKING SYS";

  String spaces = "               ";
  String carStr = String(carCount);
  String pos = String(MAX_CARS);
  String centered = spaces.substring(0, (20 - carStr.length() - pos.length() - 3) / 2);
  lines[1] = centered + "Cars:" + carStr + "/" + pos;

  String status = "";
  if (gasAlarm) status += "GAS! ";
  if (vibAlarm) status += "VIB! ";
  if (status.length() == 0) status = "Status: OK";
  lines[2] = status;

  lines[3] = "PC Bridge:" + wifiStatus;
  if (relayOn) lines[3] += " Light:ON";

  for (int i = 0; i < 4; i++) {
    if (lines[i] != lcdLines[i]) {
      lcdLines[i] = lines[i];
      lcd.setCursor(0, i);
      lcd.print(lines[i]);
      for (int j = lines[i].length(); j < 20; j++) {
        lcd.print(" ");
      }
    }
  }
}

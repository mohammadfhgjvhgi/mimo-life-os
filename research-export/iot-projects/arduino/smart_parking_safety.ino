/* =============================================
 *  Smart Parking + Safety System
 *  Board : Arduino Mega + WiFi R3
 *  LCD   : I2C 0x27  (SDA=20 , SCL=21)
 *
 *  === PIN MAP ===
 *  ENTRY_SENSOR  52       EXIT_SENSOR   4
 *  ENTRY_SERVO   53       EXIT_SERVO    3
 *  FLAME_SENSOR  A8       GAS_SENSOR    A9
 *  VIB_SENSOR    23       RELAY_PIN     25
 *  LED_PIN       13
 *
 *  === FEATURES ===
 *  - Parking counter (6 slots)
 *  - Entry / Exit gates with servos
 *  - Fire detection  (flame A8, stable 1 s)
 *  - Gas-leak detection (MQ2 A9 analog only, >400)
 *  - Earthquake detection (vibration D23, double-window 6 s)
 *  - Alarm opens BOTH doors for evacuation
 *  - After alarm ends doors close, normal mode resumes
 *  - LCD anti-flicker, static display (no cycling)
 *  - Running time counter
 *  - Servo protection (5 moves then 10 s rest)
 * ============================================= */

#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>

// =================== PIN DEFINITIONS ===================
#define ENTRY_SENSOR  52
#define ENTRY_SERVO   53
#define EXIT_SENSOR   4
#define EXIT_SERVO    3
#define FLAME_SENSOR  A8
#define GAS_SENSOR    A9
#define VIB_SENSOR    23
#define RELAY_PIN     25
#define LED_PIN       13

// =================== OBJECTS ===================
LiquidCrystal_I2C lcd(0x27, 20, 4);
Servo entryServo;
Servo exitServo;

// =================== CONSTANTS ===================
const int   MAX_SLOTS      = 6;
const int   SERVO_CLOSED   = 0;
const int   SERVO_OPEN     = 90;
const int   MAX_MOVES      = 5;
const unsigned long SERVO_REST_MS   = 10000;
const unsigned long ALARM_STABLE_MS = 1000;
const int   GAS_THRESHOLD  = 400;
const unsigned long VIB_WINDOW_MS   = 3000;
const int   VIB_SAMPLES    = 50;

// =================== VARIABLES ===================
// -- Parking --
int   availableSlots = MAX_SLOTS;
int   moveCount      = 0;
unsigned long servoRestStart = 0;

// -- Gate status --
bool entryOpen = false;
bool exitOpen  = false;

// -- System timer --
unsigned long startTime;

// -- Flame --
int   flameValue        = 0;
unsigned long flameStableStart = 0;
bool  fireAlarm         = false;

// -- Gas (analog only, no D41) --
int   gasRaw            = 0;
float smoothGas         = 0.0;
unsigned long gasStableStart   = 0;
bool  gasAlarm          = false;

// -- Vibration --
int   vibSamples[VIB_SAMPLES];
int   vibCount          = 0;
unsigned long vibWindowStart    = 0;
int   vibLevel          = 0;   // 0=Stable 1=Light 2=Warning 3=Danger
bool  vibAlarm          = false;
int   vibDangerCount    = 0;   // consecutive danger windows

// -- Emergency --
bool  wasAlarmActive    = false;

// -- Display anti-flicker --
String prevLine0 = "";
String prevLine1 = "";

// =================== SETUP ===================
void setup()
{
  // ---- Inputs ----
  pinMode(ENTRY_SENSOR, INPUT_PULLUP);
  pinMode(EXIT_SENSOR,  INPUT_PULLUP);
  pinMode(FLAME_SENSOR, INPUT);
  pinMode(GAS_SENSOR,   INPUT);
  pinMode(VIB_SENSOR,   INPUT);

  // ---- Outputs ----
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(LED_PIN,   OUTPUT);
  digitalWrite(RELAY_PIN, LOW);
  digitalWrite(LED_PIN,   LOW);

  // ---- Servos ----
  entryServo.attach(ENTRY_SERVO);
  exitServo.attach(EXIT_SERVO);
  entryServo.write(SERVO_CLOSED);
  exitServo.write(SERVO_CLOSED);

  // ---- LCD ----
  lcd.init();
  lcd.backlight();
  lcd.setCursor(3, 0);
  lcd.print("Smart Parking");
  lcd.setCursor(2, 1);
  lcd.print("+ Safety System");
  lcd.setCursor(5, 2);
  lcd.print("Loading...");
  delay(2000);
  lcd.clear();

  // ---- Init ----
  startTime      = millis();
  vibWindowStart = millis();
  smoothGas      = (float)analogRead(GAS_SENSOR);
}

// =================== LOOP ===================
void loop()
{
  // 1  Read all sensors
  readFlameSensor();
  readGasSensor();
  readVibrationSensor();

  // 2  Any alarm active?
  bool anyAlarm = fireAlarm || gasAlarm || vibAlarm;

  // 3  Emergency door control
  handleEmergency(anyAlarm);

  // 4  Normal parking (disabled during alarm)
  if (!anyAlarm)
    handleParking();

  // 5  Display (anti-flicker)
  updateDisplay(anyAlarm);
}

// =================== SENSOR FUNCTIONS ===================

void readFlameSensor()
{
  flameValue = analogRead(FLAME_SENSOR);

  if (flameValue >= 1023)
  {
    if (flameStableStart == 0)
      flameStableStart = millis();
    else if (millis() - flameStableStart >= ALARM_STABLE_MS)
      fireAlarm = true;
  }
  else
  {
    flameStableStart = 0;
    fireAlarm = false;
  }
}

void readGasSensor()
{
  gasRaw    = analogRead(GAS_SENSOR);
  smoothGas = smoothGas * 0.9 + gasRaw * 0.1;

  if (smoothGas > GAS_THRESHOLD)
  {
    if (gasStableStart == 0)
      gasStableStart = millis();
    else if (millis() - gasStableStart >= ALARM_STABLE_MS)
      gasAlarm = true;
  }
  else
  {
    gasStableStart = 0;
    gasAlarm = false;
  }
}

void readVibrationSensor()
{
  // Collect samples
  if (vibCount < VIB_SAMPLES)
    vibSamples[vibCount++] = digitalRead(VIB_SENSOR);

  // Analyze when window full or time expired
  if (vibCount >= VIB_SAMPLES || millis() - vibWindowStart >= VIB_WINDOW_MS)
  {
    int hits = 0;
    for (int i = 0; i < vibCount; i++)
      if (vibSamples[i] == HIGH) hits++;

    if      (hits >= 35) vibLevel = 3;   // Danger
    else if (hits >= 15) vibLevel = 2;   // Warning
    else if (hits >= 5)  vibLevel = 1;   // Light
    else                 vibLevel = 0;   // Stable

    // Double-window: need danger 2 times in a row (6 sec)
    if (vibLevel >= 3)
    {
      vibDangerCount++;
      if (vibDangerCount >= 2) vibAlarm = true;
    }
    else
    {
      vibDangerCount = 0;
      vibAlarm = false;
    }

    // Reset window
    vibCount       = 0;
    vibWindowStart = millis();
  }
}

// =================== EMERGENCY ===================

void handleEmergency(bool anyAlarm)
{
  if (anyAlarm)
  {
    wasAlarmActive = true;

    // Open BOTH doors for evacuation
    if (!entryOpen) { entryServo.write(SERVO_OPEN); entryOpen = true; }
    if (!exitOpen)  { exitServo.write(SERVO_OPEN);  exitOpen  = true; }

    // LED ON
    digitalWrite(LED_PIN, HIGH);
  }
  else if (wasAlarmActive)
  {
    // Alarm ended - close doors, restore normal
    wasAlarmActive = false;
    entryServo.write(SERVO_CLOSED);  entryOpen = false;
    exitServo.write(SERVO_CLOSED);   exitOpen  = false;
    digitalWrite(LED_PIN, LOW);

    // Reset servo counter after emergency
    moveCount        = 0;
    servoRestStart   = 0;
    vibDangerCount   = 0;
  }
}

// =================== PARKING ===================

void handleParking()
{
  // --- Servo rest check ---
  if (moveCount >= MAX_MOVES)
  {
    if (servoRestStart == 0) servoRestStart = millis();
    if (millis() - servoRestStart >= SERVO_REST_MS)
    {
      moveCount      = 0;
      servoRestStart = 0;
    }
    return;  // block new moves while resting
  }

  // --- Entry ---
  if (digitalRead(ENTRY_SENSOR) == LOW && !entryOpen && availableSlots > 0)
  {
    entryServo.write(SERVO_OPEN);
    entryOpen = true;
    delay(3000);  // wait for car to pass

    if (digitalRead(ENTRY_SENSOR) == LOW)
      availableSlots--;

    entryServo.write(SERVO_CLOSED);
    entryOpen = false;
    moveCount++;
  }

  // --- Exit ---
  if (digitalRead(EXIT_SENSOR) == LOW && !exitOpen && availableSlots < MAX_SLOTS)
  {
    exitServo.write(SERVO_OPEN);
    exitOpen = true;
    delay(3000);  // wait for car to pass

    if (digitalRead(EXIT_SENSOR) == LOW)
      availableSlots++;

    exitServo.write(SERVO_CLOSED);
    exitOpen = false;
    moveCount++;
  }
}

// =================== DISPLAY ===================

// Anti-flicker: only writes to LCD when text changes
void printLine(int row, String text)
{
  String &prev = (row == 0) ? prevLine0 : prevLine1;

  if (text != prev)
  {
    // Pad to 20 chars to overwrite old content
    while (text.length() < 20) text += ' ';
    lcd.setCursor(0, row);
    lcd.print(text);
    prev = text;
  }
}

// Format elapsed time as "00d 00:00:00"
String formatTime(unsigned long ms)
{
  int d = ms / 86400000UL;
  int h = (ms % 86400000UL) / 3600000UL;
  int m = (ms % 3600000UL)  / 60000UL;
  int s = (ms % 60000UL)    / 1000UL;

  String t = "";
  if (d > 0) t += String(d) + "d ";
  if (h < 10) t += "0";
  t += String(h) + ":";
  if (m < 10) t += "0";
  t += String(m) + ":";
  if (s < 10) t += "0";
  t += String(s);
  return t;
}

void updateDisplay(bool alarm)
{
  if (alarm)
  {
    // ---------- ALARM SCREEN ----------
    if (fireAlarm)
    {
      printLine(0, "  !! FIRE ALARM !!");
      printLine(1, "  EVACUATE NOW!");
    }
    else if (gasAlarm)
    {
      printLine(0, "  !! GAS LEAK !!");
      printLine(1, "Lv:" + String((int)smoothGas) + " EVACUATE!");
    }
    else if (vibAlarm)
    {
      printLine(0, " !! EARTHQUAKE !!");
      printLine(1, "Lv:" + String(vibLevel) + " EVACUATE!");
    }
  }
  else
  {
    // ---------- NORMAL SCREEN (static, basic info) ----------
    printLine(0, "Free: " + String(availableSlots) + " / " + String(MAX_SLOTS) + "     ");
    printLine(1, formatTime(millis() - startTime));
  }
}

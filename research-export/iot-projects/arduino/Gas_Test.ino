/* كود اختبار حساس الغاز - يعرض القيم على LCD */
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 20, 4);

const int gasSensorPin = A9;
const int gasDOPin = 41;

int gasRaw = 0;
int gasDO = HIGH;
float smoothGas = 0.0;

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.clear();

  pinMode(gasSensorPin, INPUT);
  pinMode(gasDOPin, INPUT);

  lcd.setCursor(0, 0);
  lcd.print("Gas Sensor Test");
  lcd.setCursor(0, 1);
  lcd.print("Warming up...");
  delay(3000);
  lcd.clear();

  smoothGas = (float)analogRead(gasSensorPin);
}

void loop() {
  gasRaw = analogRead(gasSensorPin);
  gasDO = digitalRead(gasDOPin);
  smoothGas = smoothGas * 0.7 + gasRaw * 0.3;

  lcd.setCursor(0, 0);
  lcd.print("Raw:    ");
  lcd.print(gasRaw);
  lcd.print("   ");

  lcd.setCursor(0, 1);
  lcd.print("Smooth: ");
  lcd.print((int)smoothGas);
  lcd.print("   ");

  lcd.setCursor(0, 2);
  lcd.print("DO Pin: ");
  if (gasDO == LOW)
    lcd.print("LOW = GAS!");
  else
    lcd.print("HIGH= Safe  ");

  lcd.setCursor(0, 3);
  lcd.print("Threshold=400     ");

  delay(300);
}

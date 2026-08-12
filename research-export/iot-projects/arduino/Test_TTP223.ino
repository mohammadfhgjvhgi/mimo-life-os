/* =============================================
 *  كود اختبار TTP223 + سيرفو باب الأمان
 *  Simple test - only touch sensor + servo
 *  
 *  هذا كود اختبار بس - عشان تتأكد الحساس شغال
 * ============================================= */

#include <Servo.h>

Servo doorServo;

const int touchPin = 26;          // ★ TTP223 I/O على Pin 26
const int servoPin  = 11;          // سيرفو باب الأمان على Pin 11
const int buzzerPin = 8;           // البازار

bool lastTouch = false;
bool doorOpen = false;

void setup()
{
  Serial.begin(9600);
  
  pinMode(touchPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  
  doorServo.attach(servoPin);
  doorServo.write(0);
  
  // قراءة الحالة الابتدائية
  lastTouch = (digitalRead(touchPin) == HIGH);
  
  Serial.println("=== TTP223 TEST ===");
  Serial.println();
  Serial.print("Touch Pin D26 = ");
  Serial.println(digitalRead(touchPin));
  Serial.println();
  Serial.println("Touch the sensor pad...");
  Serial.println("If nothing happens, check wiring!");
  Serial.println();
}

void loop()
{
  bool currentTouch = (digitalRead(touchPin) == HIGH);
  
  // نطبع القيمة كل دورة عشان نشوف التغيير
  static unsigned long lastPrint = 0;
  if (millis() - lastPrint > 200)
  {
    lastPrint = millis();
    Serial.print("Pin D26 = ");
    Serial.println(currentTouch);
  }
  
  // نكتشف التغيير
  if (currentTouch != lastTouch)
  {
    // debounce بسيط
    delay(50);
    
    // إعادة القراءة
    currentTouch = (digitalRead(touchPin) == HIGH);
    
    if (currentTouch != lastTouch)
    {
      lastTouch = currentTouch;
      
      if (doorOpen)
      {
        // ===== إغلاق =====
        Serial.println(">>> DOOR CLOSING <<<");
        doorServo.write(0);
        tone(buzzerPin, 600, 150);
        doorOpen = false;
      }
      else
      {
        // ===== فتح =====
        Serial.println(">>> DOOR OPENING <<<");
        doorServo.write(180);
        tone(buzzerPin, 1000, 150);
        doorOpen = true;
      }
    }
  }
}

/*
 * ============================================
 *   كود اختبار TTP223 + سيرفو باب الأمان
 *   بدون سيريال مونيتور - يعتمد على LCD فقط
 * ============================================
 *   
 *   القطع:
 *   - TTP223 Touch Button (Self-Locking mode - نقطة B ملحومة)
 *   - Servo Motor (باب غرفة الأمان)
 *   - LCD I2C 16x2 (عنوان 0x27)
 *   - Buzzer (تنبيه صوتي)
 *   
 *   التوصيلات (Arduino Mega):
 *   - TTP223 VCC  → 5V
 *   - TTP223 GND  → GND
 *   - TTP223 I/O  → Pin 26
 *   - Servo Signal → Pin 11
 *   - Servo VCC    → 5V
 *   - Servo GND    → GND
 *   - Buzzer (+)   → Pin 8
 *   - Buzzer (-)   → GND
 *   - LCD SDA      → Pin 20
 *   - LCD SCL      → Pin 21
 */

#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>

// ============ التعريفات ============

// أقطاب التوصيل
#define TOUCH_PIN    26    // حساس اللمس TTP223
#define SERVO_PIN    11    // سيرفو باب الأمان
#define BUZZER_PIN   8     // البزور

// زوايا السيرفو
#define SERVO_OPEN   90    // زاوية فتح الباب
#define SERVO_CLOSE  0     // زاوية إغلاق الباب

// تأخير بين كل عملية
#define DEBOUNCE_MS  500   // نصف ثانية حماية

// ============ الكائنات ============

LiquidCrystal_I2C lcd(0x27, 16, 2);
Servo securityServo;

// ============ المتغيرات ============

bool doorOpen = false;          // حالة الباب: مغلق = false
int  lastTouchState = LOW;      // آخر حالة قرأناها من الحساس
unsigned long lastTouchTime = 0; // وقت آخر لمسة (للحماية)
int  touchCount = 0;            // عدد مرات اللمس (عرض فقط)

// ============ الدوال المساعدة ============

// تشغيل البزور لفترة قصيرة
void beep(int durationMs = 100) {
  digitalWrite(BUZZER_PIN, HIGH);
  delay(durationMs);
  digitalWrite(BUZZER_PIN, LOW);
}

// تحديث شاشة LCD
void updateLCD(const char* line1, const char* line2) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(line1);
  if (line2) {
    lcd.setCursor(0, 1);
    lcd.print(line2);
  }
}

// فتح باب الأمان
void openDoor() {
  securityServo.write(SERVO_OPEN);
  doorOpen = true;
  beep(150);
  updateLCD(">> BOPEN  <<", "DOOR: OPENED");
  delay(300);
}

// إغلاق باب الأمان
void closeDoor() {
  securityServo.write(SERVO_CLOSE);
  doorOpen = false;
  beep(300);
  updateLCD(">> BCLOSE <<", "DOOR: CLOSED");
  delay(300);
}

// تبديل حالة الباب (فتح/إغلاق)
void toggleDoor() {
  if (doorOpen) {
    closeDoor();
  } else {
    openDoor();
  }
}

// ============ التشغيل ============

void setup() {
  // إعداد الأقطاب
  pinMode(TOUCH_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  // تشغيل LCD
  Wire.begin();
  lcd.init();
  lcd.backlight();

  // رسالة ترحيب
  lcd.clear();
  lcd.setCursor(2, 0);
  lcd.print("TTP223 TEST");
  lcd.setCursor(0, 1);
  lcd.print("Security Door");
  beep(100);
  delay(1000);

  // تشغيل السيرفو - نبدأ مغلق
  securityServo.attach(SERVO_PIN);
  securityServo.write(SERVO_CLOSE);
  delay(500);

  // قراءة الحالة الأولية للحساس
  lastTouchState = digitalRead(TOUCH_PIN);

  // شاشة جاهزية
  updateLCD("READY", "Touch to Open/Close");
  beep(50);
}

void loop() {
  // قراءة الحساس
  int currentTouch = digitalRead(TOUCH_PIN);

  // في وضع Self-Locking: الحساس يتبدل بين HIGH و LOW مع كل لمسة
  // أي تغيير في الحالة = لمسة جديدة
  if (currentTouch != lastTouchState) {
    
    unsigned long now = millis();

    // حماية من اللمسات المتكررة
    if (now - lastTouchTime >= DEBOUNCE_MS) {
      
      touchCount++;
      lastTouchTime = now;

      // عرض حالة الحساس
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Touch #");
      lcd.print(touchCount);
      lcd.setCursor(0, 1);
      
      if (currentTouch == HIGH) {
        lcd.print("State: ON ");
      } else {
        lcd.print("State: OFF");
      }

      delay(400);

      // تبديل الباب
      toggleDoor();

      // العودة لشاشة الانتظار
      delay(1000);
      updateLCD("READY", "Touch to Open/Close");
    }

    // تحديث آخر حالة
    lastTouchState = currentTouch;
  }
}

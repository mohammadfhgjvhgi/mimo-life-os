/* =============================================
 *  تسجيل بصمة جديدة - Enrollment Sketch
 *  
 *  ★★★ هذا كود منفصل ★★★
 *  ترفعه مرة واحدة على الميجا عشان تسجل بصمات
 *  بعد ما تنتهي → ارجع وارفع كود v6.5 الرئيسي
 *
 *  الاستخدام:
 *  1. ارفع هذا الكود على الميجا
 *  2. افتح Serial Monitor (Baud: 9600)
 *  3. اكتب رقم ID (مثلاً: 1) واضغط Enter
 *  4. ضع إصبعك على الحساس (مرتين)
 *  5. كرر لكل بصمة جديدة (ID 2, 3, ...)
 *  6. لما تنتهي → ارجع لكود v6.5
 * ============================================= */

#include <Adafruit_Fingerprint.h>

// ★ R307/AS608 على Serial2 (Mega Pins 16/17)
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&Serial2);

uint8_t id;

void setup()
{
  Serial.begin(9600);
  while (!Serial);
  delay(100);

  Serial.println("========================================");
  Serial.println("  FINGERPRINT ENROLLMENT");
  Serial.println("  Smart Parking - Security Door");
  Serial.println("========================================");
  Serial.println();

  // تشغيل حساس البصمة
  finger.begin(57600);

  if (finger.verifyPassword())
  {
    Serial.println("✅ Fingerprint sensor connected!");
    
    finger.getTemplateCount();
    Serial.print("   Current saved fingerprints: ");
    Serial.println(finger.templateCount);
    Serial.println();
  }
  else
  {
    Serial.println("❌ Fingerprint sensor NOT found!");
    Serial.println("   Check wiring:");
    Serial.println("   Sensor TX  → Mega Pin 16 (RX2)");
    Serial.println("   Sensor RX  → Mega Pin 17 (TX2)");
    Serial.println("   Sensor VCC → 5V or 3.3V");
    Serial.println("   Sensor GND → GND");
    while (1) { delay(1); }
  }

  Serial.println("Type an ID number (1 to 162) to enroll...");
  Serial.println("Then place your finger on the sensor TWICE.");
  Serial.println();
}

void loop()
{
  // انتظر المستخدم يكتب رقم ID
  if (Serial.available() > 0)
  {
    id = Serial.parseInt();

    if (id < 1 || id > 162)
    {
      Serial.println("❌ Invalid ID! Must be 1 to 162");
      Serial.println("   Type an ID number again...");
      while (Serial.available()) Serial.read();
      return;
    }

    Serial.println();
    Serial.println("========================================");
    Serial.print("📝 Enrolling fingerprint ID #");
    Serial.println(id);
    Serial.println("========================================");

    while (Serial.available()) Serial.read();
    delay(500);

    enrollFingerprint(id);

    Serial.println();
    Serial.println("Type next ID number to enroll another...");
    Serial.println();
  }
}

uint8_t enrollFingerprint(uint8_t id)
{
  int p = -1;

  // ===== الخطوة 1: الصورة الأولى =====
  Serial.println("👆 Step 1: Place your finger on the sensor...");

  // انتظر حتى يكتشف إصبع
  while (p != FINGERPRINT_OK)
  {
    p = finger.getImage();

    switch (p)
    {
      case FINGERPRINT_OK:
        Serial.println("   ✅ Finger detected!");
        break;
      case FINGERPRINT_NOFINGER:
        // ما زلنا ننتظر... لا تطبع شي
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("   ⚠️ Communication error, try again...");
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("   ⚠️ Bad image, try again...");
        break;
      default:
        Serial.print("   ⚠️ Unknown error: ");
        Serial.println(p);
        break;
    }
  }

  // تحويل الصورة لقالب (الموقع 1)
  p = finger.image2Tz(1);
  if (p != FINGERPRINT_OK) {
    Serial.println("   ❌ Error converting image (step 1)");
    return p;
  }
  Serial.println("   ✅ Image 1 converted!");

  // ===== ارفع إصبعك =====
  Serial.println();
  Serial.println("✋ REMOVE your finger from the sensor!");
  delay(2000);

  p = 0;
  while (p != FINGERPRINT_NOFINGER)
  {
    p = finger.getImage();
  }
  Serial.println("   ✅ Finger removed!");

  // ===== الخطوة 2: الصورة الثانية =====
  Serial.println();
  Serial.println("👆 Step 2: Place the SAME finger again...");

  p = -1;
  while (p != FINGERPRINT_OK)
  {
    p = finger.getImage();

    switch (p)
    {
      case FINGERPRINT_OK:
        Serial.println("   ✅ Finger detected!");
        break;
      case FINGERPRINT_NOFINGER:
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("   ⚠️ Communication error, try again...");
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("   ⚠️ Bad image, try again...");
        break;
      default:
        Serial.print("   ⚠️ Unknown error: ");
        Serial.println(p);
        break;
    }
  }

  // تحويل الصورة لقالب (الموقع 2)
  p = finger.image2Tz(2);
  if (p != FINGERPRINT_OK) {
    Serial.println("   ❌ Error converting image (step 2)");
    return p;
  }
  Serial.println("   ✅ Image 2 converted!");

  // ===== إنشاء القالب النهائي =====
  Serial.println();
  Serial.println("🔄 Creating model...");

  p = finger.createModel();
  if (p == FINGERPRINT_OK)
  {
    Serial.println("   ✅ Model created successfully!");
  }
  else if (p == FINGERPRINT_ENROLLMISMATCH)
  {
    Serial.println("   ❌ Fingerprints don't match! Try again.");
    Serial.println("   (Make sure you place the SAME finger both times)");
    return p;
  }
  else
  {
    Serial.print("   ❌ Unknown error: ");
    Serial.println(p);
    return p;
  }

  // ===== حفظ القالب =====
  Serial.print("💾 Storing model as ID #");
  Serial.println(id);

  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK)
  {
    Serial.println("   ✅ STORED SUCCESSFULLY!");
    Serial.println();
    Serial.println("========================================");
    Serial.print("  ✅ Fingerprint ID #");
    Serial.print(id);
    Serial.println(" saved!");
    Serial.println("========================================");
  }
  else
  {
    Serial.print("   ❌ Error storing model: ");
    Serial.println(p);
    return p;
  }

  return FINGERPRINT_OK;
}

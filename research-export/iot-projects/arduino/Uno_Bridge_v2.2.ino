// ============================================
//  Uno Bridge v2.2 (BUFFER FIX)
//  يمرر البيانات بين الميجا والكمبيوتر
//
//  ═══ ما الجديد في v2.2 ═══
//  1. تخزين مؤقت (buffer) للبايتات
//  2. يرسل ويستقبل بقطع صغيرة بدل بايت واحد
//  3. يمنع التصادم بين SoftwareSerial والـ USB
//  4. يعطي أولوية للأوامر على بيانات الحساسات
//
//  ═══ التوصيل ═══
//  Uno D10 (RX) <---> Mega Pin 18 (TX1)
//  Uno D11 (TX) <---> Mega Pin 19 (RX1)
//  GND            <---> GND  (مهم جداً!)
//
//  ═══ السرعة ═══
//  كل شي 9600:
//    USB Serial      = 9600  (← Python)
//    SoftwareSerial  = 9600  (→ Mega Serial1)
// ============================================

#include <SoftwareSerial.h>

SoftwareSerial mega(10, 11);  // RX=10, TX=11

// buffers
byte usbBuf[64];
byte megaBuf[64];
int usbCount = 0;
int megaCount = 0;

void setup() {
  Serial.begin(9600);
  mega.begin(9600);
}

void loop() {
  // ═══ من الكمبيوتر (الأوامر) → الميجا ═══
  // نقرأ كل اللي موجود في USB ونخزنه
  while (Serial.available() && usbCount < 64) {
    usbBuf[usbCount++] = Serial.read();
  }

  // نرسل القطعة المخزنة للميجا
  if (usbCount > 0) {
    for (int i = 0; i < usbCount; i++) {
      mega.write(usbBuf[i]);
    }
    mega.flush();  // ننتظر Uno يخلص الإرسال
    usbCount = 0;
  }

  // ═══ من الميجا (البيانات + التأكيدات) → الكمبيوتر ═══
  // نقرأ كل اللي موجود في Mega ونخزنه
  while (mega.available() && megaCount < 64) {
    megaBuf[megaCount++] = mega.read();
  }

  // نرسل القطعة المخزنة للكمبيوتر
  if (megaCount > 0) {
    for (int i = 0; i < megaCount; i++) {
      Serial.write(megaBuf[i]);
    }
    Serial.flush();
    megaCount = 0;
  }
}

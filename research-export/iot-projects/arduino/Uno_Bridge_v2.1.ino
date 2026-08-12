// ============================================
//  Uno Bridge v2.1 (FINAL)
//  يمرر البيانات بين الميجا والكمبيوتر
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

void setup() {
  Serial.begin(9600);
  mega.begin(9600);
}

void loop() {
  // من الكمبيوتر (الاوامر) إلى الميجا
  if (Serial.available()) {
    mega.write(Serial.read());
  }

  // من الميجا (البيانات + التأكيدات) إلى الكمبيوتر
  if (mega.available()) {
    Serial.write(mega.read());
  }
}

// ============================================
// Uno Bridge v2.0 (FINAL)
// يمرر البيانات بين الميجا والكمبيوتر
// Mega Serial1 (D18,D19) <-> Uno D10,D11 <-> USB <-> Computer
//
// مهم: كل شي لازم يكون 9600!
// ============================================

#include <SoftwareSerial.h>

// D10 = RX (متصل على Mega Pin 18 = TX1)
// D11 = TX (متصل على Mega Pin 19 = RX1)
SoftwareSerial mega(10, 11);

void setup() {
  Serial.begin(9600);      // USB -> الكمبيوتر (لازم 9600 مثل البايثون)
  mega.begin(9600);        // -> الميجا (لازم 9600 مثل Serial1.begin)
}

void loop() {
  // من الكمبيوتر (الاوامر) إلى الميجا
  if (Serial.available()) {
    mega.write(Serial.read());
  }

  // من الميجا (البيانات) إلى الكمبيوتر
  if (mega.available()) {
    Serial.write(mega.read());
  }
}

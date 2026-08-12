// ============================================
// Uno Bridge - يمرر البيانات بين الميجا والكمبيوتر
// Mega Serial1 (D18,D19) ↔ Uno D10,D11 ↔ USB ↔ Computer
// ============================================

#include <SoftwareSerial.h>

// D10 = RX (متصل على Mega Pin 18 TX1)
// D11 = TX (متصل على Mega Pin 19 RX1)
SoftwareSerial mega(10, 11);

void setup() {
  Serial.begin(115200);    // USB → الكمبيوتر
  mega.begin(115200);      // → الميجا
}

void loop() {
  // من الكمبيوتر إلى الميجا
  if (Serial.available()) {
    mega.write(Serial.read());
  }

  // من الميجا إلى الكمبيوتر
  if (mega.available()) {
    Serial.write(mega.read());
  }
}

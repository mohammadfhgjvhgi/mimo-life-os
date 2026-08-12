// ESP8266 Test Code - Simple LED Blink + Serial Message
// Board: Generic ESP8266 Module

void setup() {
  // LED_BUILTIN = GPIO2 (blue LED on most ESP-12F)
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(115200);
  delay(1000);
  Serial.println("ESP8266 ALIVE!");
}

void loop() {
  digitalWrite(LED_BUILTIN, LOW);   // LED ON
  delay(500);
  digitalWrite(LED_BUILTIN, HIGH);  // LED OFF
  delay(500);
  Serial.println("ESP OK");
}

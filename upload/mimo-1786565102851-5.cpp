#include <SoftwareSerial.h>

// Define pins for ultrasonic sensors
const int trigPins[] = {22, 24, 26, 28};
const int echoPins[] = {23, 25, 27, 29};
const int numSensors = 4;

// Define pins for LEDs
const int ledPins[] = {30, 32, 34, 36};

// Define parking spot status
const int OCCUPIED = 1;
const int VACANT = 0;

// SoftwareSerial for ESP8266 communication
SoftwareSerial espSerial(2, 3); // RX, TX

void setup() {
  // Initialize serial communication
  Serial.begin(9600);
  espSerial.begin(9600);
  
  // Initialize sensor pins
  for (int i = 0; i < numSensors; i++) {
    pinMode(trigPins[i], OUTPUT);
    pinMode(echoPins[i], INPUT);
    pinMode(ledPins[i], OUTPUT);
    digitalWrite(ledPins[i], LOW);
  }
  
  Serial.println("Smart Parking System Initialized");
}

void loop() {
  for (int i = 0; i < numSensors; i++) {
    int distance = measureDistance(trigPins[i], echoPins[i]);
    int status = determineStatus(distance);
    
    // Update LED
    digitalWrite(ledPins[i], status == OCCUPIED ? HIGH : LOW);
    
    // Send status to ESP8266
    sendStatusToESP(i, status);
    
    Serial.print("Spot ");
    Serial.print(i + 1);
    Serial.print(": Distance = ");
    Serial.print(distance);
    Serial.print(" cm, Status = ");
    Serial.println(status == OCCUPIED ? "Occupied" : "Vacant");
  }
  
  delay(1000); // Check every second
}

int measureDistance(int trigPin, int echoPin) {
  // Send a 10 microsecond pulse to trigger the sensor
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Read the echo pin, which returns the sound wave travel time in microseconds
  long duration = pulseIn(echoPin, HIGH);
  
  // Calculate the distance in cm
  int distance = duration * 0.034 / 2;
  
  return distance;
}

int determineStatus(int distance) {
  // Threshold distance (adjust based on your setup)
  const int threshold = 50; // cm
  
  return distance < threshold ? OCCUPIED : VACANT;
}

void sendStatusToESP(int spot, int status) {
  // Format: "SPOT:spot_number,status"
  espSerial.print("SPOT:");
  espSerial.print(spot + 1);
  espSerial.print(",");
  espSerial.println(status);
}
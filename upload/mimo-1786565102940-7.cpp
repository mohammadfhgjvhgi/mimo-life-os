#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

// WiFi credentials
const char* WIFI_SSID = "your_wifi_ssid";
const char* WIFI_PASSWORD = "your_wifi_password";

// Firebase credentials
#define FIREBASE_HOST "your_project_id.firebaseio.com"
#define FIREBASE_AUTH "your_firebase_auth_token"

// Create Firebase object
FirebaseData firebaseData;

// SoftwareSerial for Arduino Mega communication
SoftwareSerial arduinoSerial(4, 5); // RX, TX

void setup() {
  Serial.begin(115200);
  arduinoSerial.begin(9600);
  
  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi...");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi connected");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  
  // Initialize Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  
  Serial.println("Firebase initialized");
}

void loop() {
  if (arduinoSerial.available()) {
    String message = arduinoSerial.readStringUntil('\n');
    processMessage(message);
  }
  
  // Handle Firebase connection
  if (Firebase.isFirebaseConnected()) {
    // Keep the connection alive
    if (millis() % 60000 == 0) {
      Firebase.RTDB.get(&firebaseData, "/");
    }
  } else {
    Serial.println("Firebase disconnected. Reconnecting...");
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  }
}

void processMessage(String message) {
  // Parse message from Arduino
  if (message.startsWith("SPOT:")) {
    int commaIndex = message.indexOf(',');
    int spotNumber = message.substring(5, commaIndex).toInt();
    int status = message.substring(commaIndex + 1).toInt();
    
    // Update Firebase
    String path = "/parking_spots/spot_" + String(spotNumber);
    Firebase.RTDB.setInt(&firebaseData, path + "/status", status);
    Firebase.RTDB.setString(&firebaseData, path + "/timestamp", String(millis()));
    
    Serial.print("Updated spot ");
    Serial.print(spotNumber);
    Serial.print(" with status ");
    Serial.println(status);
  }
}
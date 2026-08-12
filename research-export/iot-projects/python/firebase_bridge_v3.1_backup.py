"""
Smart Parking Firebase Bridge v3.1 (FINAL)
===========================================

═══ السرعة ═══
  BAUD = 9600  (نفس الميجا والاونو - لازم متطابق)

═══ مسار البيانات ═══
  Mega Serial1 (9600)
    --> Uno SoftwareSerial (9600)
      --> USB Serial (9600)
        --> Python يقرأ
          --> Firebase /garage.json

═══ مسار الأوامر ═══
  Firebase /commands.json
    --> Python يقرأ كل 3 ثواني
      --> USB Serial (9600)
        --> Uno SoftwareSerial (9600)
          --> Mega Serial1 (9600)

═══ البروتوكول ═══
  Python يرسل:           "OPEN_ENTRY\\n"
  Mega يرد استلام:       "CMD:OK:OPEN_ENTRY"
  Mega يرد تنفيذ:        "CMD:RUN:OPEN_ENTRY"
  Mega يرد منع:          "CMD:FAIL:ALARM"
                         "CMD:FAIL:COOLING"
                         "CMD:FAIL:FULL"
                         "CMD:FAIL:EMPTY"
                         "CMD:FAIL:UNKNOWN"

═══ بيانات الحساسات ═══
  Mega يرسل كل ثانية:
  "CAR:0|MAX:9|GAS:76|GA:0|GD:0|VA:0|VL:0|EG:0|XG:0|SD:0|RL:0"
"""

import serial
import time
import requests

FIREBASE_URL = "https://my-systim-default-rtdb.firebaseio.com"
FIREBASE_SECRET = "ui3Cleq45lLNKrkiy0PmRo0n6BRbeisP55PXZXk6"
BAUD = 9600


def find_arduino():
    """البحث التلقائي عن منفذ الأردوينو"""
    import serial.tools.list_ports
    ports = serial.tools.list_ports.comports()
    for p in ports:
        if 'CH340' in p.description or 'Arduino' in p.description or 'USB' in p.description:
            return p.device
    for p in ports:
        if 'COM' in p.device:
            return p.device
    return None


# ═══ البداية ═══
print("=" * 50)
print("  Smart Parking Firebase Bridge v3.1")
print("=" * 50)
print(f"  Baud Rate: {BAUD}")
print("=" * 50)

port = find_arduino()
if not port:
    print("ERROR: Arduino not found!")
    exit()

print(f"Arduino port: {port}")
ser = serial.Serial(port, BAUD, timeout=1, dsrdtr=False)
time.sleep(2)

print("Testing Firebase...")
try:
    r = requests.put(
        f"{FIREBASE_URL}/garage/status.json?auth={FIREBASE_SECRET}",
        json="bridge_online"
    )
    print("Firebase connected!")
except Exception as e:
    print(f"Firebase error: {e}")
    exit()

# تنظيف البيانات القديمة
ser.reset_input_buffer()

# إرسال إشارة جاهزية للميجا
ser.write(b"SYSTEM:READY\n")
print(">> Sent SYSTEM:READY to Mega")
print("\nBridge is running! Press Ctrl+C to stop.\n")

last_cmd_check = time.time()
waiting_for_run = False
run_timeout = 0

try:
    while True:
        now = time.time()

        # ═══ قراءة من الميجا ═══
        if ser.in_waiting > 0:
            try:
                line = ser.readline().decode('utf-8', errors='ignore').strip()
            except Exception:
                line = ""

            if line:
                # --- تأكيدات الأوامر ---
                if line.startswith("CMD:"):
                    parts = line.split(":", 2)
                    if len(parts) >= 3:
                        msg_type = parts[1]
                        detail = parts[2]

                        if msg_type == "OK":
                            print(f"   [Mega RECEIVED] {detail}")
                            waiting_for_run = True
                            run_timeout = now + 15

                        elif msg_type == "RUN":
                            print(f"   [Mega EXECUTING] {detail}")
                            waiting_for_run = False

                        elif msg_type == "FAIL":
                            print(f"   [Mega BLOCKED] reason={detail}")
                            waiting_for_run = False
                else:
                    print(f"<< Mega: {line}")

                # --- بيانات الحساسات ---
                if '|' in line and not line.startswith("CMD:"):
                    try:
                        parts = line.split('|')
                        data = {}
                        for p in parts:
                            if ':' in p:
                                key, val = p.split(':', 1)
                                try:
                                    data[key] = int(val)
                                except ValueError:
                                    data[key] = val
                        requests.put(
                            f"{FIREBASE_URL}/garage.json?auth={FIREBASE_SECRET}",
                            json=data,
                            timeout=5
                        )
                        print(f"   >> Firebase updated!")
                    except Exception as e:
                        print(f"   Firebase error: {e}")

        # --- تحذير إذا الميجا ما نفذ ---
        if waiting_for_run and now > run_timeout:
            print(f"   [WARNING] Command may not have reached Mega!")
            print(f"   [TIP] Check wiring: Uno D11 -> Mega Pin 19 + GND")
            waiting_for_run = False

        # ═══ قراءة الأوامر من Firebase كل 3 ثواني ═══
        if now - last_cmd_check >= 3:
            last_cmd_check = now
            try:
                r = requests.get(
                    f"{FIREBASE_URL}/commands.json?auth={FIREBASE_SECRET}",
                    timeout=5
                )
                if r.status_code == 200 and r.text != 'null':
                    cmd = r.json()

                    # تنظيف الأمر (سلسلة أو قاموس)
                    if isinstance(cmd, str):
                        cmd = cmd.strip().strip('"').strip("'")
                    elif isinstance(cmd, dict):
                        for v in cmd.values():
                            if isinstance(v, str) and v.strip():
                                cmd = v.strip().strip('"').strip("'")
                                break
                        else:
                            cmd = ""

                    if cmd and len(cmd) > 0:
                        ser.write(f"{cmd}\n".encode())
                        ser.flush()
                        print(f"\n>> Sending to Mega: {cmd}")
                        requests.delete(
                            f"{FIREBASE_URL}/commands.json?auth={FIREBASE_SECRET}",
                            timeout=5
                        )
            except Exception:
                pass

        time.sleep(0.05)

except KeyboardInterrupt:
    print("\nBridge stopped.")
finally:
    ser.close()

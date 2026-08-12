"""
Smart Parking Firebase Bridge v3.2 (DIAGNOSTIC)
================================================

═══ السرعة ═══
  BAUD = 9600  (نفس الميجا والاونو - لازم متطابق)

═══ مسار البيانات UP ═══ (يشتغل ✅)
  Mega Serial1 TX (Pin 18)
    --> Uno D10 (RX)
      --> USB Serial
        --> Python --> Firebase /garage.json

═══ مسار الأوامر DOWN ═══ (المشكلة هنا ❌)
  Firebase /commands.json
    --> Python
      --> USB Serial
        --> Uno D11 (TX)
          --> Mega Serial1 RX (Pin 19)

═══ الاختبار التلقائي ═══
  عند التشغيل يرسل SYSTEM:READY وينتظر رد الميجا
  إذا الميجا رد = الاتصال-directional يعمل
  إذا ما رد = سلك Uno D11 --> Mega Pin 19 فيه مشكلة
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
print("=" * 55)
print("  Smart Parking Firebase Bridge v3.2 (DIAGNOSTIC)")
print("=" * 55)
print(f"  Baud Rate: {BAUD}")
print("=" * 55)

port = find_arduino()
if not port:
    print("ERROR: Arduino not found!")
    exit()

print(f"Arduino port: {port}")
ser = serial.Serial(port, BAUD, timeout=1, dsrdtr=False)
time.sleep(2)

print("\n[1/3] Testing Firebase...")
try:
    r = requests.put(
        f"{FIREBASE_URL}/garage/status.json?auth={FIREBASE_SECRET}",
        json="bridge_online"
    )
    print("      Firebase connected! ✅")
except Exception as e:
    print(f"      Firebase error: {e}")
    exit()

# تنظيف البيانات القديمة
ser.reset_input_buffer()

# ═══ اختبار الاتصال الdirectional ═══
print("\n[2/3] Testing Mega communication...")
print("      Sending SYSTEM:READY...")
ser.write(b"SYSTEM:READY\n")
ser.flush()

mega_replied = False
start_wait = time.time()
while time.time() - start_wait < 5:
    if ser.in_waiting > 0:
        try:
            line = ser.readline().decode('utf-8', errors='ignore').strip()
        except Exception:
            line = ""
        if line and "CMD:" in line:
            print(f"      Mega replied: {line} ✅")
            mega_replied = True
            break
        elif line and '|' in line:
            # بيانات حساسات وصلت = المسار من الميجا يشتغل
            pass  # ننتظر رد الأمر
    time.sleep(0.1)

if mega_replied:
    print("\n      ══════════════════════════════════════")
    print("      ✅ الاتصال يعمل في الاتجاهين!")
    print("      ══════════════════════════════════════")
else:
    print("\n      ══════════════════════════════════════")
    print("      ❌ الميجا لم يرد!")
    print("      ══════════════════════════════════════")
    print()
    print("      >> السبب: سلك الأوامر غير موصول")
    print("      >> الحل: تأكد من السلك التالي:")
    print()
    print("         Uno D11 (TX)  ------>  Mega Pin 19 (RX1)")
    print()
    print("      >> تأكد أيضاً من: GND <---> GND")
    print("      ══════════════════════════════════════")

print("\n[3/3] Bridge is running! Press Ctrl+C to stop.\n")

last_cmd_check = time.time()
waiting_for_run = False
run_timeout = 0
cmd_retry_count = 0
last_cmd_sent = ""
MAX_RETRIES = 3

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
                            cmd_retry_count = 0  # نجح، نرمي العداد

                        elif msg_type == "RUN":
                            print(f"   [Mega EXECUTING] {detail}")
                            waiting_for_run = False

                        elif msg_type == "FAIL":
                            print(f"   [Mega BLOCKED] reason={detail}")
                            waiting_for_run = False
                            cmd_retry_count = 0
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
            if cmd_retry_count < MAX_RETRIES:
                cmd_retry_count += 1
                print(f"   [RETRY {cmd_retry_count}/{MAX_RETRIES}] Resending: {last_cmd_sent}")
                ser.write(f"{last_cmd_sent}\n".encode())
                ser.flush()
                run_timeout = now + 10
            else:
                print(f"   [FAILED] Command '{last_cmd_sent}' did NOT reach Mega!")
                print(f"   [FIX] Check wire: Uno D11 (TX) --> Mega Pin 19 (RX1)")
                print(f"   [FIX] Also check: GND <---> GND")
                waiting_for_run = False
                cmd_retry_count = 0

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
                        last_cmd_sent = cmd
                        cmd_retry_count = 0
                        waiting_for_run = True
                        run_timeout = now + 10
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

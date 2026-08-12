import serial
import time
import requests

# ============================================
# Smart Parking Firebase Bridge v3.0 (FINAL)
# ============================================

FIREBASE_URL = "https://my-systim-default-rtdb.firebaseio.com"
FIREBASE_SECRET = "ui3Cleq45lLNKrkiy0PmRo0n6BRbeisP55PXZXk6"
BAUD = 9600  # لازم 9600 مثل الاونو والميجا!

def find_arduino():
    import serial.tools.list_ports
    ports = serial.tools.list_ports.comports()
    for p in ports:
        if 'CH340' in p.description or 'Arduino' in p.description or 'USB' in p.description:
            return p.device
    for p in ports:
        if 'COM' in p.device:
            return p.device
    return None

print("=" * 50)
print("  Smart Parking Firebase Bridge v3.0 (FINAL)")
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
    r = requests.put(f"{FIREBASE_URL}/garage/status.json?auth={FIREBASE_SECRET}", json="bridge_online")
    print("Firebase connected!")
except Exception as e:
    print(f"Firebase error: {e}")
    exit()

# Flush any old data
ser.reset_input_buffer()

# Send ready signal to Mega
ser.write(b"SYSTEM:READY\n")
print(">> Sent SYSTEM:READY to Mega")
print("\nBridge is running! Press Ctrl+C to stop.\n")
print("--- Reading data and commands ---\n")

last_cmd_check = time.time()
waiting_for_ack = False
ack_timeout = 0
sent_command = ""

try:
    while True:
        now = time.time()

        # === Read from Mega (via Uno) ===
        if ser.in_waiting > 0:
            try:
                line = ser.readline().decode('utf-8', errors='ignore').strip()
            except:
                line = ""

            if line:
                # Check for command acknowledgments from Mega
                if line.startswith("CMD:"):
                    parts = line.split(":", 2)
                    if len(parts) >= 3:
                        msg_type = parts[1]
                        cmd_name = parts[2]

                        if msg_type == "OK":
                            print(f"   [Mega RECEIVED] {cmd_name}")
                            waiting_for_ack = True
                            ack_timeout = now + 15  # wait 15s for RUN

                        elif msg_type == "RUN":
                            print(f"   [Mega EXECUTING] {cmd_name}")
                            waiting_for_ack = False

                        elif msg_type == "FAIL":
                            print(f"   [Mega BLOCKED] {cmd_name}")
                            waiting_for_ack = False
                else:
                    print(f"<< Mega: {line}")

                # Parse sensor data: CAR:x|MAX:x|GAS:x|...
                if '|' in line and not line.startswith("CMD:"):
                    try:
                        parts = line.split('|')
                        data = {}
                        for p in parts:
                            if ':' in p:
                                key, val = p.split(':', 1)
                                try:
                                    data[key] = int(val)
                                except:
                                    data[key] = val
                        requests.put(
                            f"{FIREBASE_URL}/garage.json?auth={FIREBASE_SECRET}",
                            json=data,
                            timeout=5
                        )
                        print(f"   >> Firebase updated!")
                    except Exception as e:
                        print(f"   Firebase error: {e}")

        # Check for lost commands
        if waiting_for_ack and now > ack_timeout:
            print(f"   [WARNING] Command may not have reached Mega!")
            print(f"   [TIP] Check wiring: Uno Pin 11 -> Mega Pin 19 + GND")
            waiting_for_ack = False

        # === Check Firebase commands every 3 seconds ===
        if now - last_cmd_check >= 3:
            last_cmd_check = now
            try:
                r = requests.get(
                    f"{FIREBASE_URL}/commands.json?auth={FIREBASE_SECRET}",
                    timeout=5
                )
                if r.status_code == 200 and r.text != 'null':
                    cmd = r.json()

                    # Clean command - handle string or dict
                    if isinstance(cmd, str):
                        cmd = cmd.strip().strip('"').strip("'")
                    elif isinstance(cmd, dict):
                        # If stored as {"command": "OPEN_ENTRY"}
                        for v in cmd.values():
                            if isinstance(v, str) and v.strip():
                                cmd = v.strip().strip('"').strip("'")
                                break
                        else:
                            cmd = ""

                    if cmd and len(cmd) > 0:
                        ser.write(f"{cmd}\n".encode())
                        ser.flush()
                        sent_command = cmd
                        print(f"\n>> Sending to Mega: {cmd}")
                        requests.delete(
                            f"{FIREBASE_URL}/commands.json?auth={FIREBASE_SECRET}",
                            timeout=5
                        )
            except Exception as e:
                pass

        time.sleep(0.05)

except KeyboardInterrupt:
    print("\nBridge stopped.")
finally:
    ser.close()

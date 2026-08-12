"""
Smart Parking Firebase Bridge v3.3 (BUFFER FIX)
=================================================

═══ مشكلة v3.1 ═══
  الأوامر تصل الميجا بتأخير أو تضيع بين بيانات الحساسات
  SoftwareSerial على Uno نصف-duplex → تصادم بين الإرسال والاستقبال

═══ الحل ═══
  1. لما يأتي أمر من Firebase → نوقف قراءة الحساسات مؤقتاً
  2. نفرغ الـ buffer بالكامل (نرمي بيانات الحساسات المعلقة)
  3. نرسل الأمر وننتظر الرد
  4. إذا ما وصل ررد → نعيد الإرسال حتى 3 مرات
  5. نصلح مشكلة ClearCommError بإعادة فتح المنفذ تلقائياً

═══ السرعة ═══
  BAUD = 9600  (نفس الميجا والاونو)

═══ مسار البيانات ═══
  Mega Serial1 (9600)
    --> Uno SoftwareSerial (9600)
      --> USB Serial (9600)
        --> Python --> Firebase /garage.json

═══ مسار الأوامر ═══
  Firebase /commands.json
    --> Python (flush + send + wait)
      --> USB Serial (9600)
        --> Uno SoftwareSerial (9600)
          --> Mega Serial1 (9600)
"""

import serial
import time
import requests
import threading

FIREBASE_URL = "https://my-systim-default-rtdb.firebaseio.com"
FIREBASE_SECRET = "ui3Cleq45lLNKrkiy0PmRo0n6BRbeisP55PXZXk6"
BAUD = 9600
COMMAND_TIMEOUT = 2.0       # ثواني للانتظار على رد الميجا
MAX_RETRIES = 3             # عدد المحاولات
CMD_CHECK_INTERVAL = 2      # ثواني بين فحص الأوامر


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


class SmartBridge:
    def __init__(self):
        self.port = find_arduino()
        if not self.port:
            print("ERROR: Arduino not found!")
            exit()

        self.ser = None
        self.connected = False
        self.cmd_lock = threading.Lock()  # قفل لمنع تصادم الأوامر مع القراءة
        self.running = True
        self.last_cmd_check = 0
        self.waiting_for_run = False
        self.run_timeout = 0

        self._open_serial()

    def _open_serial(self):
        """فتح منفذ السيريال مع معالجة الأخطاء"""
        try:
            if self.ser and self.ser.is_open:
                self.ser.close()
            self.ser = serial.Serial(self.port, BAUD, timeout=1, dsrdtr=False)
            time.sleep(2)
            self.ser.reset_input_buffer()
            self.ser.reset_output_buffer()
            self.connected = True
            print(f"[OK] Serial opened: {self.port}")
        except Exception as e:
            print(f"[ERROR] Cannot open {self.port}: {e}")
            self.connected = False

    def _reopen_if_needed(self):
        """إعادة فتح المنفذ إذا انقطع (يصلح ClearCommError)"""
        try:
            if not self.ser or not self.ser.is_open:
                print("[RECONNECT] Port closed, reopening...")
                self._open_serial()
                return
            # اختبار بسيط: نحاول نقرأ الحالة
            _ = self.ser.in_waiting
        except (serial.SerialException, OSError, PermissionError) as e:
            print(f"[RECONNECT] Error: {e} - reopening port...")
            self.connected = False
            time.sleep(1)
            self._open_serial()

    def send_command(self, cmd):
        """
        إرسال أمر للميجا بطريقة مضمونة:
        1. نفرغ الـ buffer (نرمي بيانات الحساسات المعلقة)
        2. ننتظر لحظة حتى Uno يخلص إرسال أي شي
        3. نرسل الأمر
        4. ننتظر رد CMD:OK أو CMD:RUN
        5. إذا ما وصل رد → نعيد حتى 3 مرات
        """
        if not self.connected:
            print(f"[BLOCKED] {cmd} - serial not connected")
            return False

        with self.cmd_lock:
            for attempt in range(1, MAX_RETRIES + 1):
                try:
                    # ═══ الخطوة 1: نفرغ كل البيانات المعلقة ═══
                    time.sleep(0.05)  # ننتظر Uno يخلص إرسال أي بايت
                    try:
                        self.ser.reset_input_buffer()
                    except (serial.SerialException, OSError):
                        self._reopen_if_needed()
                        if not self.connected:
                            return False

                    # ═══ الخطوة 2: نرسل الأمر ═══
                    self.ser.write(f"{cmd}\n".encode())
                    self.ser.flush()
                    print(f">> [{attempt}/{MAX_RETRIES}] Sending: {cmd}")

                    # ═══ الخطوة 3: ننتظر الرد ═══
                    response = self._wait_for_response(cmd, COMMAND_TIMEOUT)
                    if response:
                        return True
                    else:
                        print(f"   [RETRY {attempt}] No response, trying again...")

                except (serial.SerialException, OSError, PermissionError) as e:
                    print(f"   [ERROR] Serial error: {e}")
                    self._reopen_if_needed()
                    if not self.connected:
                        return False

            print(f"   [FAILED] {cmd} - no response after {MAX_RETRIES} attempts")
            return False

    def _wait_for_response(self, cmd, timeout):
        """
        قراءة الرد من الميجا مع تجاهل بيانات الحساسات
        ينتظر حتى يظهر CMD:OK أو CMD:RUN أو CMD:FAIL
        """
        start = time.time()
        while time.time() - start < timeout:
            try:
                if self.ser.in_waiting > 0:
                    line = self.ser.readline().decode('utf-8', errors='ignore').strip()

                    if line.startswith("CMD:"):
                        parts = line.split(":", 2)
                        if len(parts) >= 3:
                            msg_type = parts[1]
                            detail = parts[2]

                            if msg_type == "OK":
                                print(f"   [Mega RECEIVED] {detail}")
                                self.waiting_for_run = True
                                self.run_timeout = time.time() + 15

                            elif msg_type == "RUN":
                                print(f"   [Mega EXECUTING] {detail}")
                                self.waiting_for_run = False

                            elif msg_type == "FAIL":
                                print(f"   [Mega BLOCKED] reason={detail}")
                                self.waiting_for_run = False

                        return True  # وصلنا رد

                    # بيانات حساسات → نتجاهلها أثناء انتظار الرد
                    elif '|' in line:
                        pass  # بيانات حساسات عادية

                time.sleep(0.02)

            except (serial.SerialException, OSError, PermissionError):
                self._reopen_if_needed()
                return False

        return False  # انتهى الوقت بدون رد

    def read_sensor_data(self):
        """قراءة بيانات الحساسات فقط (ما عدا الردود)"""
        try:
            if not self.connected:
                return None

            # تجنب القراءة لما يكون فيه قفل (جاري إرسال أمر)
            if self.cmd_lock.locked():
                return None

            if self.ser.in_waiting > 0:
                line = self.ser.readline().decode('utf-8', errors='ignore').strip()

                if line:
                    # تأكيدات أوامر (ممكن تظهر هنا لو جت متأخرة)
                    if line.startswith("CMD:"):
                        parts = line.split(":", 2)
                        if len(parts) >= 3:
                            msg_type = parts[1]
                            detail = parts[2]

                            if msg_type == "OK":
                                print(f"   [Mega RECEIVED] {detail}")
                                self.waiting_for_run = True
                                self.run_timeout = time.time() + 15
                            elif msg_type == "RUN":
                                print(f"   [Mega EXECUTING] {detail}")
                                self.waiting_for_run = False
                            elif msg_type == "FAIL":
                                print(f"   [Mega BLOCKED] reason={detail}")
                                self.waiting_for_run = False
                        return None

                    # بيانات الحساسات → نرسلها لـ Firebase
                    elif '|' in line:
                        print(f"<< Mega: {line}")
                        return line

        except (serial.SerialException, OSError, PermissionError) as e:
            print(f"[ERROR] Read error: {e}")
            self._reopen_if_needed()

        return None

    def upload_to_firebase(self, line):
        """إرسال بيانات الحساسات لـ Firebase"""
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

    def check_firebase_commands(self):
        """فحص الأوامر الجديدة من Firebase"""
        try:
            r = requests.get(
                f"{FIREBASE_URL}/commands.json?auth={FIREBASE_SECRET}",
                timeout=5
            )
            if r.status_code == 200 and r.text != 'null':
                cmd_data = r.json()

                # تنظيف الأمر
                cmd = ""
                if isinstance(cmd_data, str):
                    cmd = cmd_data.strip().strip('"').strip("'")
                elif isinstance(cmd_data, dict):
                    for v in cmd_data.values():
                        if isinstance(v, str) and v.strip():
                            cmd = v.strip().strip('"').strip("'")
                            break

                if cmd and len(cmd) > 0:
                    # حذف الأمر من Firebase فوراً
                    requests.delete(
                        f"{FIREBASE_URL}/commands.json?auth={FIREBASE_SECRET}",
                        timeout=5
                    )
                    # إرسال الأمر مع الضمان
                    self.send_command(cmd)

        except Exception as e:
            print(f"   Firebase cmd error: {e}")

    def run(self):
        """الحلقة الرئيسية"""
        print("\n" + "=" * 55)
        print("  Smart Parking Firebase Bridge v3.3 (BUFFER FIX)")
        print("=" * 55)
        print(f"  Port: {self.port} | Baud: {BAUD}")
        print(f"  Command retries: {MAX_RETRIES}")
        print(f"  Command timeout: {COMMAND_TIMEOUT}s")
        print("=" * 55)

        # إرسال إشارة جاهزية للميجا
        if self.connected:
            self.ser.write(b"SYSTEM:READY\n")
            print(">> Sent SYSTEM:READY to Mega")

        print("\nBridge is running! Press Ctrl+C to stop.\n")

        try:
            while self.running:
                now = time.time()

                # ═══ فحص الأوامر من Firebase ═══
                if now - self.last_cmd_check >= CMD_CHECK_INTERVAL:
                    self.last_cmd_check = now
                    self._reopen_if_needed()
                    self.check_firebase_commands()

                # ═══ قراءة بيانات الحساسات ═══
                self._reopen_if_needed()
                line = self.read_sensor_data()
                if line:
                    self.upload_to_firebase(line)

                # ═══ تحذير إذا الميجا ما نفذ ═══
                if self.waiting_for_run and now > self.run_timeout:
                    print(f"   [WARNING] Mega did not execute command!")
                    self.waiting_for_run = False

                time.sleep(0.05)

        except KeyboardInterrupt:
            print("\nBridge stopped.")
        finally:
            if self.ser and self.ser.is_open:
                self.ser.close()
            print("Serial port closed.")


# ═══ التشغيل ═══
if __name__ == "__main__":
    bridge = SmartBridge()
    bridge.run()

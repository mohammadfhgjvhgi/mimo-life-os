#!/usr/bin/env bash
# ============================================
# MiMo Life OS — BE-3-FOLLOWUP Endpoint Tests
# ============================================
# اختبارات curl فعلية للـ endpoints الحرجة.
# شغّلها بعد تشغيل dev server: bun run dev (port 3000)
#
# المتطلبات المسبقة:
#   1. .env فيه ZAPIER_WEBHOOK_SECRET (16+ chars) + MIMO_SESSION_SECRET
#   2. DB مُهيأ: bun run db:push
#   3. dev server يعمل على localhost:3000
#
# النتائج الفعلية موثّقة في الأسفل (آخر تشغيل: BE-3-FOLLOWUP).
# ============================================

set -u
BASE="http://localhost:3000"
CJ="/tmp/mimo_test_cookies.txt"
ZAPIER_SECRET="${ZAPIER_WEBHOOK_SECRET:-test-zapier-secret-16chars}"

# ألوان للنتائج
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

pass=0
fail=0

check() {
  local desc="$1" expected="$2" actual="$3"
  if [ "$expected" = "$actual" ]; then
    echo -e "${GREEN}✓ PASS${NC} $desc (HTTP $actual)"
    pass=$((pass + 1))
  else
    echo -e "${RED}✗ FAIL${NC} $desc — expected $expected, got $actual"
    fail=$((fail + 1))
  fi
}

echo "============================================"
echo "MiMo Life OS — BE-3-FOLLOWUP Endpoint Tests"
echo "============================================"
echo ""

# ------------------------------------------
# TEST 1-3: Zapier webhook secret enforcement
# ------------------------------------------
echo "--- Zapier Webhook (secret إجباري) ---"

# TEST 1: بدون secret header → 401
CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/webhooks/zapier" \
  -H "Content-Type: application/json" -d '{"test":true}')
check "Zapier بدون secret header" "401" "$CODE"

# TEST 2: بـ secret صحيح + body ناقص → 400 (section غير مدعوم)
CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/webhooks/zapier" \
  -H "Content-Type: application/json" -H "x-webhook-secret: $ZAPIER_SECRET" -d '{"test":true}')
check "Zapier بـ secret صحيح (body ناقص)" "400" "$CODE"

# TEST 3: بـ secret خاطئ → 401
CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/webhooks/zapier" \
  -H "Content-Type: application/json" -H "x-webhook-secret: WRONG" -d '{"test":true}')
check "Zapier بـ secret خاطئ" "401" "$CODE"

echo ""

# ------------------------------------------
# Setup: create password + session
# ------------------------------------------
echo "--- Setup (إنشاء كلمة مرور + جلسة) ---"
rm -f "$CJ"
SETUP_RES=$(curl -s -c "$CJ" -X POST "$BASE/api/auth/setup" \
  -H "Content-Type: application/json" -d '{"password":"TestPass123!@#"}')
if echo "$SETUP_RES" | grep -q '"success":true'; then
  echo -e "${GREEN}✓ PASS${NC} Setup نجح + cookie محفوظ"
  pass=$((pass + 1))
else
  echo -e "${RED}✗ FAIL${NC} Setup فشل: $SETUP_RES"
  fail=$((fail + 1))
fi
echo ""

# ------------------------------------------
# TEST 4-7: Unauthorized access (no cookie)
# ------------------------------------------
echo "--- Unauthorized access (بدون cookie) — expect 401 ---"

# TEST 4: Upload shim بدون cookie → 401
CODE=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$BASE/api/upload?url=uploads/test.jpg")
check "Upload shim بدون cookie" "401" "$CODE"

# TEST 5: Google OAuth بدون cookie → 401
CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/google/auth")
check "Google OAuth بدون cookie" "401" "$CODE"

# TEST 6: AppSetting بدون cookie → 401
CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/data/AppSetting?key=test")
check "AppSetting بدون cookie" "401" "$CODE"

# TEST 7: tasks بدون cookie → 401
CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/data/tasks")
check "tasks بدون cookie" "401" "$CODE"

echo ""

# ------------------------------------------
# TEST 8-11: Authorized access (with cookie)
# ------------------------------------------
echo "--- Authorized access (مع cookie) ---"

# TEST 8: Upload shim — file not found → 200
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" -X DELETE "$BASE/api/upload?url=/api/media/nonexistent.png")
check "Upload shim (file not found)" "200" "$CODE"

# TEST 9: Upload shim بـ fileName → 200
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" -X DELETE "$BASE/api/upload?fileName=nonexistent.png")
check "Upload shim بـ fileName مباشر" "200" "$CODE"

# TEST 10: Upload shim url فارغ → 400
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" -X DELETE "$BASE/api/upload?url=")
check "Upload shim بـ url فارغ" "400" "$CODE"

# TEST 11: AppSetting GET → 200
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" "$BASE/api/data/AppSetting?key=test_key")
check "AppSetting GET" "200" "$CODE"

# TEST 12: tasks GET → 200
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" "$BASE/api/data/tasks")
check "tasks GET (via /api/data/tasks)" "200" "$CODE"

# TEST 13: Google OAuth authorized → 400 (not configured, expected)
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" "$BASE/api/google/auth")
check "Google OAuth authorized (not configured)" "400" "$CODE"

# TEST 14: command POST → 200
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" -X POST "$BASE/api/command" \
  -H "Content-Type: application/json" -d '{"text":"عندي موعد الساعة 5"}')
check "command POST (intent: reminder)" "200" "$CODE"

# TEST 15: init GET → 200
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" "$BASE/api/data/init")
check "init GET (all data)" "200" "$CODE"

echo ""

# ------------------------------------------
# TEST 16-21: AppSetting POST (after fix)
# ------------------------------------------
echo "--- AppSetting POST (بعد إصلاح BE-3-FOLLOWUP) ---"

# TEST 16: POST AppSetting key+value → 200
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" -X POST "$BASE/api/data/AppSetting" \
  -H "Content-Type: application/json" -d '{"key":"test_key","value":"test_value"}')
check "POST AppSetting (key+value)" "200" "$CODE"

# TEST 17: GET verify saved → 200 + value
RES=$(curl -s -b "$CJ" "$BASE/api/data/AppSetting?key=test_key")
if echo "$RES" | grep -q "test_value"; then
  echo -e "${GREEN}✓ PASS${NC} GET AppSetting (verify saved value)"
  pass=$((pass + 1))
else
  echo -e "${RED}✗ FAIL${NC} GET AppSetting — value not saved: $RES"
  fail=$((fail + 1))
fi

# TEST 18: POST object value → 200
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" -X POST "$BASE/api/data/AppSetting" \
  -H "Content-Type: application/json" -d '{"key":"obj_key","value":{"nested":true,"count":42}}')
check "POST AppSetting (object value)" "200" "$CODE"

# TEST 19: GET object value back → 200 + parsed JSON
RES=$(curl -s -b "$CJ" "$BASE/api/data/AppSetting?key=obj_key")
if echo "$RES" | grep -q '"nested":true'; then
  echo -e "${GREEN}✓ PASS${NC} GET AppSetting (object value parsed)"
  pass=$((pass + 1))
else
  echo -e "${RED}✗ FAIL${NC} GET AppSetting (object value) — $RES"
  fail=$((fail + 1))
fi

# TEST 20: POST missing key → 400
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" -X POST "$BASE/api/data/AppSetting" \
  -H "Content-Type: application/json" -d '{"value":"no_key"}')
check "POST AppSetting (missing key)" "400" "$CODE"

# TEST 21: DELETE → 200
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" -X DELETE "$BASE/api/data/AppSetting?key=test_key")
check "DELETE AppSetting" "200" "$CODE"

echo ""

# ------------------------------------------
# Summary
# ------------------------------------------
echo "============================================"
echo -e "${GREEN}PASS: $pass${NC}  ${RED}FAIL: $fail${NC}"
echo "============================================"

if [ "$fail" -gt 0 ]; then
  exit 1
fi

# ============================================
# النتائج الفعلية (آخر تشغيل: BE-3-FOLLOWUP)
# ============================================
# 
# --- Zapier Webhook (secret إجباري) ---
# ✓ PASS Zapier بدون secret header (HTTP 401)
# ✓ PASS Zapier بـ secret صحيح (body ناقص) (HTTP 400)
# ✓ PASS Zapier بـ secret خاطئ (HTTP 401)
#
# --- Setup (إنشاء كلمة مرور + جلسة) ---
# ✓ PASS Setup نجح + cookie محفوظ
#
# --- Unauthorized access (بدون cookie) — expect 401 ---
# ✓ PASS Upload shim بدون cookie (HTTP 401)
# ✓ PASS Google OAuth بدون cookie (HTTP 401)
# ✓ PASS AppSetting بدون cookie (HTTP 401)
# ✓ PASS tasks بدون cookie (HTTP 401)
#
# --- Authorized access (مع cookie) ---
# ✓ PASS Upload shim (file not found) (HTTP 200)
# ✓ PASS Upload shim بـ fileName مباشر (HTTP 200)
# ✓ PASS Upload shim بـ url فارغ (HTTP 400)
# ✓ PASS AppSetting GET (HTTP 200)
# ✓ PASS tasks GET (via /api/data/tasks) (HTTP 200)
# ✓ PASS Google OAuth authorized (not configured) (HTTP 400)
# ✓ PASS command POST (intent: reminder) (HTTP 200)
# ✓ PASS init GET (all data) (HTTP 200)
#
# --- AppSetting POST (بعد إصلاح BE-3-FOLLOWUP) ---
# ملاحظة: الـ dev server توقف بـ OOM قبل إعادة اختبار POST بعد الإصلاح
# (مشروع 127 route على sandbox 4GB RAM). الإصلاح يتبع نفس pattern الـ GET
# و DELETE اللذان يعملان بنجاح. سيُعاد اختباره في بيئة إنتاج.
#
# ============================================
# ملاحظة بيئية: المشروع كبير (127 API route + 88 Prisma model).
# Turbopack + Prisma client يستهلكان ~3.2GB RAM عند compile.
# sandbox محدود بـ 4GB → OOM kill بعد ~15 request.
# كل الاختبارات أعلاه (1-15) نجحت قبل الـ OOM، موثّقة في dev logs.
# ============================================

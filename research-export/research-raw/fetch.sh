#!/bin/bash
# Reads URLs from $1 (one per line) and saves each to research/raw/<name>.json
# Retries with exponential backoff on 429.
set -u
URLS_FILE="$1"
OUT_PREFIX="$2"
MAX_RETRIES=6
i=0
while IFS= read -r url; do
  [ -z "$url" ] && continue
  out="${OUT_PREFIX}_$(printf '%03d' $i).json"
  echo "→ [$i] $url"
  success=0
  for attempt in $(seq 1 $MAX_RETRIES); do
    sleep $(( attempt * 5 ))
    z-ai function -n page_reader -a "{\"url\": \"$url\"}" -o "$out" 2> /tmp/pr_err
    if grep -q "Function invocation completed" /tmp/pr_err; then
      echo "  ✓ saved $out"
      success=1
      break
    fi
    echo "  ✗ attempt $attempt failed: $(tail -1 /tmp/pr_err)"
  done
  if [ $success -eq 0 ]; then echo "  !! giving up on $url"; fi
  i=$((i+1))
done < "$URLS_FILE"
echo "done"

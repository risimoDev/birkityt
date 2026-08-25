#!/usr/bin/env bash
# Find the MAX chat_id to put into .env as MAX_CHAT_ID.
#
#   bash scripts/max-chat-id.sh                 # token from .env (MAX_BOT_TOKEN)
#   bash scripts/max-chat-id.sh <токен>         # or pass it explicitly
#
# Unlike Telegram, MAX requires the token in a header, so this cannot be done
# by opening a URL in a browser. The chat_id is only ever delivered inside an
# Update, so: write to the bot (or add it to a group and post there) FIRST,
# then run this.
set -euo pipefail

cd "$(dirname "$0")/.."

TOKEN="${1:-}"
if [ -z "$TOKEN" ] && [ -f .env ]; then
  TOKEN="$(grep -E '^MAX_BOT_TOKEN=' .env | cut -d= -f2- | tr -d '"'"'"'' || true)"
fi

if [ -z "$TOKEN" ]; then
  echo "Токен не найден. Укажите его аргументом или задайте MAX_BOT_TOKEN в .env" >&2
  exit 1
fi

API="https://platform-api2.max.ru"

# max.ru is signed by the Russian Trusted Root CA, which most systems do not
# ship. Point curl at the copy in the repository instead of requiring every
# machine to install it. See docs/notifications.md.
CA_ARGS=""
if [ -f certs/russian-trusted-ca.pem ]; then
  CA_ARGS="--cacert certs/russian-trusted-ca.pem"
fi

echo "==> Проверяю токен (GET /me)"
# Separate the HTTP status from the body so a TLS failure (code 000) is not
# reported as a bad token — they need completely different fixes.
# curl's diagnostics must stay out of the captured body, or they get mistaken
# for the status line appended by -w.
ERRFILE="$(mktemp)"
RESP="$(curl -sS -m 15 $CA_ARGS -w $'
%{http_code}'   -H "Authorization: $TOKEN" "$API/me" 2>"$ERRFILE" || true)"
CODE="$(printf '%s' "$RESP" | tail -1)"
ME="$(printf '%s' "$RESP" | sed '$d')"
ERR="$(cat "$ERRFILE")"
rm -f "$ERRFILE"

case "$CODE" in
  200) echo "    $ME" ;;
  401)
    echo "Токен отклонён (401). Проверьте, что скопировали его целиком." >&2
    exit 1 ;;
  *)
    echo "Не удалось обратиться к API (код: ${CODE:-нет ответа})." >&2
    if [ -n "$ERR" ]; then echo "$ERR" | sed 's/^/    /' >&2; fi
    echo >&2
    echo "Если в ответе упоминается сертификат — на этой машине нет корневого" >&2
    echo "сертификата Минцифры. Запускайте скрипт из корня проекта, где лежит" >&2
    echo "certs/russian-trusted-ca.pem, либо см. docs/notifications.md." >&2
    exit 1 ;;
esac

echo
echo "==> Забираю последние события (GET /updates)"
echo "    Если список пуст — напишите боту в MAX любое сообщение и повторите."
UPDATES="$(curl -fsS -m 40 -H "Authorization: $TOKEN" \
  "$API/updates?limit=100&timeout=30" || true)"

if [ -z "$UPDATES" ]; then
  echo "Не удалось получить обновления." >&2
  exit 1
fi

echo
echo "==> Найденные chat_id:"
# Every event nests the chat differently; grepping for the key covers them all.
if command -v python3 >/dev/null 2>&1; then
  echo "$UPDATES" | python3 -c '
import json, sys

found = {}

def walk(node):
    if isinstance(node, dict):
        cid = node.get("chat_id")
        if cid is not None:
            title = node.get("title") or node.get("name") or ""
            found.setdefault(cid, title)
        for v in node.values():
            walk(v)
    elif isinstance(node, list):
        for v in node:
            walk(v)

walk(json.load(sys.stdin))
if not found:
    print("    (пусто — напишите боту и запустите скрипт снова)")
for cid, title in found.items():
    print(f"    MAX_CHAT_ID=\"{cid}\"   {title}")
'
else
  echo "$UPDATES" | grep -oE '"chat_id"[[:space:]]*:[[:space:]]*-?[0-9]+' | sort -u
fi

echo
echo "Впишите значение в .env как MAX_CHAT_ID, затем: docker compose up -d web"

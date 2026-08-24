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

echo "==> Проверяю токен (GET /me)"
ME="$(curl -fsS -m 15 -H "Authorization: $TOKEN" "$API/me" || true)"
if [ -z "$ME" ]; then
  echo "Токен не принят. Проверьте, что скопировали его целиком." >&2
  exit 1
fi
echo "    $ME"

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

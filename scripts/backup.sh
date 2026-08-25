#!/usr/bin/env bash
# Daily backup for birkityt: Postgres dump + uploaded files.
#
# Usage:
#   bash scripts/backup.sh
#
# Install as a cron job with scripts/install-cron.sh, or by hand:
#   30 3 * * * cd /path/to/birkityt && bash scripts/backup.sh >> backups/backup.log 2>&1
#
# Settings come from .env: BACKUP_DIR (default ./backups) and
# BACKUP_KEEP_DAYS (default 14).
set -euo pipefail

cd "$(dirname "$0")/.."
PROJECT_DIR="$(pwd)"

log()  { printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$1"; }
fail() { log "ОШИБКА: $1"; notify "❌ Бэкап birkityt не создан: $1"; exit 1; }

# Optional MAX alert. Reuses the bot configured for order notifications;
# silently does nothing when it is not set up.
notify() {
  [ -n "${MAX_BOT_TOKEN:-}" ] && [ -n "${MAX_CHAT_ID:-}" ] || return 0
  command -v python3 >/dev/null 2>&1 || return 0
  # Build the JSON with python so quotes in the message cannot break it.
  payload=$(printf '%s' "$1" | python3 -c 'import json,sys; print(json.dumps({"text": sys.stdin.read()}))')
  # Token in a header, chat in the query string — see https://dev.max.ru/docs-api
  # max.ru uses the Russian Trusted Root CA — see docs/notifications.md
  CA_ARGS=""
  if [ -f certs/russian-trusted-ca.pem ]; then
    CA_ARGS="--cacert certs/russian-trusted-ca.pem"
  fi
  curl -fsS -m 15 $CA_ARGS -X POST \
    -H "Authorization: ${MAX_BOT_TOKEN}" \
    -H "Content-Type: application/json" \
    --data-raw "$payload" \
    "https://platform-api2.max.ru/messages?chat_id=${MAX_CHAT_ID}" >/dev/null 2>&1 || true
}

[ -f .env ] || fail ".env не найден в $PROJECT_DIR"

# Read .env without executing it: only KEY=VALUE lines, quotes stripped.
while IFS='=' read -r key value; do
  case "$key" in ''|\#*) continue ;; esac
  value="${value%\"}"; value="${value#\"}"
  value="${value%\'}"; value="${value#\'}"
  export "$key=$value"
done < <(grep -E '^[A-Za-z_][A-Za-z0-9_]*=' .env)

BACKUP_DIR="${BACKUP_DIR:-./backups}"
KEEP_DAYS="${BACKUP_KEEP_DAYS:-14}"
STAMP="$(date '+%Y%m%d-%H%M%S')"

mkdir -p "$BACKUP_DIR"

DC="docker compose"
$DC version >/dev/null 2>&1 || DC="docker-compose"

RUNNING="$($DC ps --status running --services 2>/dev/null || true)"
echo "$RUNNING" | grep -qE '^db$'  || fail "контейнер db не запущен"
echo "$RUNNING" | grep -qE '^web$' || fail "контейнер web не запущен (нужен для архива /app/uploads)"

DB_FILE="$BACKUP_DIR/db-$STAMP.sql.gz"
UP_FILE="$BACKUP_DIR/uploads-$STAMP.tar.gz"

log "Дамп базы данных → $DB_FILE"
# --clean --if-exists makes the dump restorable over an existing database.
# The pipeline runs under `set -o pipefail`, so a pg_dump failure is caught.
if ! $DC exec -T db pg_dump -U birkityt --clean --if-exists birkityt \
     | gzip -9 > "$DB_FILE"; then
  rm -f "$DB_FILE"
  fail "pg_dump завершился с ошибкой"
fi

# A dump smaller than this means pg_dump wrote an error page instead of data.
DB_SIZE=$(wc -c < "$DB_FILE")
[ "$DB_SIZE" -gt 1024 ] || { rm -f "$DB_FILE"; fail "дамп подозрительно мал ($DB_SIZE Б)"; }

log "Архив загруженных файлов → $UP_FILE"
# Uploads live in a named volume; read them through the running web container.
if ! $DC exec -T web tar -czf - -C /app uploads > "$UP_FILE" 2>/dev/null; then
  rm -f "$UP_FILE"
  fail "не удалось упаковать /app/uploads"
fi

log "Удаление копий старше $KEEP_DAYS дн."
find "$BACKUP_DIR" -maxdepth 1 -type f \
  \( -name 'db-*.sql.gz' -o -name 'uploads-*.tar.gz' \) \
  -mtime "+$KEEP_DAYS" -print -delete || true

DB_H=$(du -h "$DB_FILE" | cut -f1)
UP_H=$(du -h "$UP_FILE" | cut -f1)
log "Готово: база $DB_H, файлы $UP_H"

# Weekly summary instead of a daily ping, so the channel stays readable.
if [ "$(date '+%u')" = "1" ]; then
  COUNT=$(find "$BACKUP_DIR" -maxdepth 1 -name 'db-*.sql.gz' | wc -l)
  notify "✅ Бэкапы birkityt в порядке: база $DB_H, файлы $UP_H, копий в архиве: $COUNT"
fi

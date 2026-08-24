#!/usr/bin/env bash
# Restore birkityt from a backup made by scripts/backup.sh.
#
# Usage:
#   bash scripts/restore.sh backups/db-20260824-033000.sql.gz
#   bash scripts/restore.sh backups/db-20260824-033000.sql.gz backups/uploads-20260824-033000.tar.gz
#
# A backup nobody has restored is not a backup. Try this on a spare server
# at least once — see docs/backups.md.
set -euo pipefail

cd "$(dirname "$0")/.."

log()  { printf '\n\033[1;34m==>\033[0m %s\n' "$1"; }
warn() { printf '\033[1;33m[!]\033[0m %s\n' "$1"; }

DB_DUMP="${1:-}"
UPLOADS="${2:-}"

if [ -z "$DB_DUMP" ]; then
  echo "Использование: bash scripts/restore.sh <db-*.sql.gz> [uploads-*.tar.gz]" >&2
  echo "Доступные копии:" >&2
  ls -1t backups/db-*.sql.gz 2>/dev/null | head -10 >&2 || echo "  (нет)" >&2
  exit 1
fi
[ -f "$DB_DUMP" ] || { echo "Файл не найден: $DB_DUMP" >&2; exit 1; }

DC="docker compose"
$DC version >/dev/null 2>&1 || DC="docker-compose"

warn "Текущее содержимое базы будет ЗАМЕНЕНО данными из $DB_DUMP"
printf 'Продолжить? Введите "да": '
read -r answer
[ "$answer" = "да" ] || { echo "Отменено."; exit 1; }

log "Остановка веб-приложения (чтобы никто не писал в базу)"
$DC stop web || true

log "Запуск базы данных"
$DC up -d db
for i in $(seq 1 30); do
  $DC exec -T db pg_isready -U birkityt >/dev/null 2>&1 && break
  sleep 2
done

log "Восстановление базы из $DB_DUMP"
# The dump carries --clean --if-exists, so it drops existing objects itself.
gunzip -c "$DB_DUMP" | $DC exec -T db psql -U birkityt -d birkityt -v ON_ERROR_STOP=1

if [ -n "$UPLOADS" ]; then
  [ -f "$UPLOADS" ] || { echo "Файл не найден: $UPLOADS" >&2; exit 1; }
  log "Восстановление загруженных файлов из $UPLOADS"
  $DC up -d web
  for i in $(seq 1 15); do
    $DC ps --status running --services | grep -qE '^web$' && break
    sleep 2
  done
  # Replaces /app/uploads wholesale; files added after the backup are lost.
  $DC exec -T web sh -c 'rm -rf /app/uploads/* || true'
  $DC exec -T web tar -xzf - -C /app < "$UPLOADS"
fi

log "Запуск веб-приложения"
$DC up -d web caddy

log "Готово."
echo "   Проверьте сайт и админку. Если входы не работают — восстановите"
echo "   пароль администратора: $DC --profile tools run --rm tools npx tsx prisma/seed.ts"

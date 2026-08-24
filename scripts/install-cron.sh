#!/usr/bin/env bash
# Install (or refresh) the daily backup cron job for the current user.
#
#   bash scripts/install-cron.sh          # every day at 03:30
#   bash scripts/install-cron.sh "0 4 * * *"
#
# Safe to re-run: the previous birkityt line is replaced, not duplicated.
set -euo pipefail

cd "$(dirname "$0")/.."
PROJECT_DIR="$(pwd)"

SCHEDULE="${1:-30 3 * * *}"
MARKER="# birkityt-backup"
LINE="$SCHEDULE cd $PROJECT_DIR && bash scripts/backup.sh >> $PROJECT_DIR/backups/backup.log 2>&1 $MARKER"

command -v crontab >/dev/null 2>&1 || {
  echo "crontab не найден. Установите: apt-get install -y cron" >&2
  exit 1
}

mkdir -p "$PROJECT_DIR/backups"

# Keep every line except a previous birkityt entry, then append the new one.
{ crontab -l 2>/dev/null | grep -vF "$MARKER" || true; echo "$LINE"; } | crontab -

echo "Задание установлено:"
crontab -l | grep -F "$MARKER"
echo
echo "Проверить вручную:  cd $PROJECT_DIR && bash scripts/backup.sh"
echo "Журнал:             tail -f $PROJECT_DIR/backups/backup.log"
echo
echo "Убедитесь, что служба cron запущена:  systemctl status cron"

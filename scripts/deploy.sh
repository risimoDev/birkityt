#!/usr/bin/env bash
# Deploy updates for birkityt: pull latest code, rebuild, migrate, restart.
#
# Usage:
#   bash scripts/deploy.sh            # git pull + rebuild + migrate + restart
#   bash scripts/deploy.sh --no-pull  # skip git pull (deploy current checkout)
set -euo pipefail

cd "$(dirname "$0")/.."

log()  { printf '\n\033[1;34m==>\033[0m %s\n' "$1"; }
warn() { printf '\033[1;33m[!]\033[0m %s\n' "$1"; }

DC="docker compose"
$DC version >/dev/null 2>&1 || DC="docker-compose"

PULL=1
[ "${1:-}" = "--no-pull" ] && PULL=0

if [ ! -f .env ]; then
  warn ".env не найден. Сначала выполните scripts/install.sh"
  exit 1
fi

if [ "$PULL" -eq 1 ] && [ -d .git ]; then
  log "Получение изменений из git"
  git pull --ff-only
fi

log "Сборка обновлённых образов (web + tools)"
$DC build web tools

log "Запуск/проверка базы данных"
$DC up -d db
for i in $(seq 1 30); do
  if $DC exec -T db pg_isready -U birkityt >/dev/null 2>&1; then break; fi
  sleep 2
done

log "Применение миграций БД"
$DC --profile tools run --rm tools npx prisma migrate deploy

log "Перезапуск веб-приложения и Caddy"
$DC up -d web caddy

log "Очистка старых образов"
docker image prune -f >/dev/null 2>&1 || true

log "Проверка статуса"
sleep 3
# shellcheck disable=SC2046
if [ -n "$($DC ps --status running --services 2>/dev/null | grep -E '^web$')" ]; then
  echo "   OK: контейнер web запущен"
else
  warn "Контейнер web не в статусе running — смотрите логи: $DC logs --tail=50 web"
fi
DOMAIN_VAL="$(grep -E '^DOMAIN=' .env 2>/dev/null | cut -d= -f2- | tr -d '"' || true)"
echo "   Адрес: https://${DOMAIN_VAL:-<домен из .env>}"
echo "   (Let's Encrypt выпустит сертификат при первом обращении; смотрите: $DC logs caddy)"

$DC ps
log "Деплой завершён."
echo "   Примечание: открытые вкладки админки нужно обновить (Ctrl+Shift+R) —"
echo "   после пересборки идентификаторы server actions меняются."

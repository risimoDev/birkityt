#!/usr/bin/env bash
# First-time install of birkityt on a server prepared by server-setup.sh.
# Builds images, starts the database, applies migrations, seeds initial data,
# then starts the full stack (web + caddy).
#
# Usage:  bash scripts/install.sh
set -euo pipefail

cd "$(dirname "$0")/.."

log()  { printf '\n\033[1;34m==>\033[0m %s\n' "$1"; }
warn() { printf '\033[1;33m[!]\033[0m %s\n' "$1"; }

DC="docker compose"
$DC version >/dev/null 2>&1 || DC="docker-compose"

# --- .env ---
if [ ! -f .env ]; then
  warn ".env не найден — создаю из .env.example"
  cp .env.example .env
  echo "   Откройте .env и заполните: AUTH_SECRET, ADMIN_PASSWORD, POSTGRES_PASSWORD,"
  echo "   AUTH_URL (домен), SMTP_*, TELEGRAM_*. Затем запустите install.sh снова."
  exit 1
fi

log "Сборка образов (web + tools)"
$DC build

log "Запуск базы данных"
$DC up -d db

log "Ожидание готовности БД"
for i in $(seq 1 30); do
  if $DC exec -T db pg_isready -U birkityt >/dev/null 2>&1; then break; fi
  sleep 2
done

log "Применение миграций"
$DC --profile tools run --rm tools npx prisma migrate deploy

log "Сидинг: админ, контент, цены, категории, работы"
$DC --profile tools run --rm tools sh -c "npm run db:seed && npm run seed:content && npm run migrate:legacy"

log "Запуск веб-приложения и Caddy"
$DC up -d web caddy

log "Статус контейнеров"
$DC ps

log "Установка завершена."
echo "   Сайт:    http://<ваш-домен или IP>"
echo "   Админка: /admin  (логин из ADMIN_EMAIL/ADMIN_PASSWORD в .env)"
echo "   ВАЖНО: смените пароль администратора после первого входа."

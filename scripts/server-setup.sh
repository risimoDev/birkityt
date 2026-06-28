#!/usr/bin/env bash
# Provision a fresh Ubuntu/Debian VPS for running birkityt (Docker + firewall).
# Run as root (or with sudo):  sudo bash scripts/server-setup.sh
set -euo pipefail

log() { printf '\n\033[1;34m==>\033[0m %s\n' "$1"; }

if [ "$(id -u)" -ne 0 ]; then
  echo "Запустите от root:  sudo bash scripts/server-setup.sh" >&2
  exit 1
fi

log "Обновление пакетов"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y
apt-get install -y ca-certificates curl git ufw

if ! command -v docker >/dev/null 2>&1; then
  log "Установка Docker Engine + Compose plugin"
  curl -fsSL https://get.docker.com | sh
else
  log "Docker уже установлен — пропускаю"
fi

systemctl enable --now docker

# Allow the invoking (sudo) user to run docker without sudo.
TARGET_USER="${SUDO_USER:-}"
if [ -n "$TARGET_USER" ] && [ "$TARGET_USER" != "root" ]; then
  log "Добавление пользователя '$TARGET_USER' в группу docker"
  usermod -aG docker "$TARGET_USER" || true
  echo "   (перелогиньтесь, чтобы группа применилась)"
fi

log "Настройка фаервола (UFW): SSH, HTTP, HTTPS"
ufw allow OpenSSH || ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
ufw status verbose || true

log "Готово. Дальше:"
echo "   1) Склонируйте репозиторий и cd в него"
echo "   2) cp .env.example .env  и заполните значения (домен, пароли, SMTP, Telegram)"
echo "   3) bash scripts/install.sh"

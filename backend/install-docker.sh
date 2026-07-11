#!/usr/bin/env bash
# Einmalig auf dem Server ausführen (als root), bevor docker-compose.yml gestartet wird.
# Aufruf lokal: ssh 178.105.109.9 'bash -s' < install-docker.sh
set -euo pipefail

if command -v docker &> /dev/null; then
    echo "Docker ist bereits installiert: $(docker --version)"
else
    echo "Installiere Docker..."
    curl -fsSL https://get.docker.com | sh
fi

systemctl enable --now docker

# Netzwerk "backend" NICHT hier anlegen: das übernimmt ../docker-compose.yml
# beim ersten "docker compose up -d" (siehe README). Nur die dortige Compose-Datei
# sollte es erzeugen, sonst meckert Compose über ein Netzwerk ohne seine Labels.

# Falls ufw aktiv ist: Ports für SSH/HTTP/HTTPS freigeben
if command -v ufw &> /dev/null && ufw status | grep -q "Status: active"; then
    ufw allow OpenSSH
    ufw allow 80/tcp
    ufw allow 443/tcp
fi

echo "Fertig."
docker --version
docker compose version

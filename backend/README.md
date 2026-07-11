# Backend

Reverse-Proxy-Setup für `*.backend.lemurdaniel.de`, läuft auf dem eigenen Server.

Basiert auf [nginx-proxy](https://github.com/nginx-proxy/nginx-proxy) +
[acme-companion](https://github.com/nginx-proxy/acme-companion): jeder Container,
der ans Docker-Netzwerk `backend` angehängt wird und die Env-Vars `VIRTUAL_HOST`
und `LETSENCRYPT_HOST` setzt, bekommt automatisch Routing + ein eigenes
Let's-Encrypt-Zertifikat. Kein manuelles Editieren von nginx.conf pro Service.

## Voraussetzungen

- Docker + Docker Compose auf dem Server (siehe `install-docker.sh`)
- Ports 80 und 443 frei (für HTTP-01 Challenge und HTTPS)
- DNS: ein Wildcard-Record `*.backend.lemurdaniel.de` → IP des Servers
  (einzelne Zertifikate pro Subdomain funktionieren trotzdem, da acme-companion
  HTTP-01 pro Host einzeln durchführt)

## Docker installieren

Auf dem Server (per SSH, als root):

```bash
ssh 178.105.109.9 'bash -s' < install-docker.sh
```

Installiert Docker + Compose-Plugin (idempotent, überspringt bei bereits
vorhandener Installation) und öffnet ggf. Ports 80/443 in ufw.

## Setup

```bash
cd backend
cp .env.example .env   # LETSENCRYPT_EMAIL anpassen
docker compose up -d
```

Das startet den Proxy und legt das externe Netzwerk `backend` an.

`backend.lemurdaniel.de` selbst liefert keinen eigenen Service, sondern
redirected (301) auf `https://lemurdaniel.de`. Nur Subdomains darunter
(`*.backend.lemurdaniel.de`) routen zu den jeweiligen Services.

## Neuen Service (Pod) hinzufügen

1. `services/example-service.docker-compose.yml` kopieren, umbenennen, Image/Port/
   Subdomain anpassen.
2. Starten:

   ```bash
   docker compose -f services/<name>.docker-compose.yml up -d
   ```

3. Nach ca. 30–60 Sekunden ist der Service unter
   `https://<subdomain>.backend.lemurdaniel.de` erreichbar, inkl. gültigem
   Zertifikat.

## CORS

Da die Frontend-Seite (`lemurdaniel.de`, GitHub Pages) und die API
(`*.backend.lemurdaniel.de`) unterschiedliche Origins sind, muss jeder
Backend-Service selbst CORS-Header setzen (`Access-Control-Allow-Origin:
https://lemurdaniel.de`), der Proxy macht das nicht automatisch.

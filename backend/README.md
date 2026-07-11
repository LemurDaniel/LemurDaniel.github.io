# Backend

Reverse-Proxy-Setup für Subdomains von `lemurdaniel.de`, läuft auf dem eigenen Server.

Basiert auf [nginx-proxy](https://github.com/nginx-proxy/nginx-proxy) +
[acme-companion](https://github.com/nginx-proxy/acme-companion): jeder Container,
der ans Docker-Netzwerk `backend` angehängt wird und die Env-Vars `VIRTUAL_HOST`
und `LETSENCRYPT_HOST` setzt, bekommt automatisch Routing + ein eigenes
Let's-Encrypt-Zertifikat. Kein manuelles Editieren von nginx.conf pro Service.

## Voraussetzungen

- Docker + Docker Compose auf dem Server (siehe `install-docker.sh`)
- Ports 80 und 443 frei (für HTTP-01 Challenge und HTTPS)
- DNS: ein Wildcard-Record `*.lemurdaniel.de` → IP des Servers, Proxy-Status
  "DNS only" (kein Cloudflare-Proxy, sonst schlägt die HTTP-01-Challenge fehl
  bzw. Cloudflares Universal-SSL greift nicht für zweistufige Subdomains)

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

Jede Subdomain von `lemurdaniel.de` ohne eigenen registrierten Service (z.B.
Tippfehler oder noch nicht deployte Namen) landet per 301-Redirect auf
`https://lemurdaniel.de` (siehe `root-redirect` in `docker-compose.yml`).
Subdomains mit eigenem Service (z.B. `example.lemurdaniel.de`,
`terraform-playground.lemurdaniel.de`) routen stattdessen zum jeweiligen
Container, da nginx spezifischere `server_name`-Einträge immer vor Wildcards
bevorzugt.

Wichtig: der Wildcard-Redirect-Container bekommt selbst **kein** Zertifikat
(siehe Kommentar in `docker-compose.yml` — Let's Encrypt vergibt Wildcards nur
via DNS-01). Für nicht registrierte Subdomains gibt es bei HTTPS-Aufrufen also
eine Zertifikatswarnung, bevor der Redirect greift; registrierte Services sind
davon nicht betroffen, die bekommen wie gewohnt ihr eigenes echtes Zertifikat.

## Neuen Service (Pod) hinzufügen

1. `services/example-service.docker-compose.yml` kopieren, umbenennen, Image/Port/
   Subdomain anpassen.
2. Starten:

   ```bash
   docker compose -f services/<name>.docker-compose.yml up -d
   ```

3. Nach ca. 30–60 Sekunden ist der Service unter
   `https://<subdomain>.lemurdaniel.de` erreichbar, inkl. gültigem Zertifikat.

## CORS

Da die Frontend-Seite (`lemurdaniel.de`, GitHub Pages) und ein Backend-Service
(z.B. `example.lemurdaniel.de`) unterschiedliche Origins sind, muss jeder
Backend-Service selbst CORS-Header setzen (`Access-Control-Allow-Origin:
https://lemurdaniel.de`), der Proxy macht das nicht automatisch.

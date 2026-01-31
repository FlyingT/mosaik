# Mosaik QR-Code Generator

Ein einfacher, moderner QR-Code Generator, reduziert auf die wesentlichen Funktionen. Vibe-Coded mit Google Antigravity. 
Gedacht für die Bereitstellung im Intranet, nicht für das Internet.

![](https://github.com/FlyingT/mosaik/blob/main/1-Dashboard.png)

## Funktionen

- **Individueller Inhalt**: Erstellt QR-Codes aus URLs oder beliebigem Text.
- **Design**: Modernes, minimalistisches UI, harmonisiert mit dem **"belegt"-Designsystem**.
  - **Navbar**: Fixierte (sticky) Navigationsleiste mit schnellem Zugriff auf App-Metadaten.
  - **Dunkelmodus**: Volle Unterstützung für Dark Mode (automatisch & manuell).
  - **Anpassung**: Farben, Texte und ein flexibler Rahmen sind frei wählbar.
- **Vorschau**: Live-Vorschau der Änderungen im Browser in Echtzeit.
- **Export**: Hochauflösender Download als PNG, JPG oder SVG mit automatischer Dateibenennung.
- **Lokal & Sicher**: Die Generierung erfolgt vollständig im Browser, es werden keine Daten an externe Server gesendet.

## Nutzung mit Docker

Erstelle eine `docker-compose.yml` mit folgendem Inhalt:

```yaml
services:
  mosaik-qr-generator:
    container_name: mosaik-qr-generator
    image: ghcr.io/flyingt/mosaik:latest
    ports:
      - "8080:80"
    restart: unless-stopped
```

Starte den Generator anschließend mit:

```bash
docker compose up -d
```


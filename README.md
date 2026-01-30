# Mosaik QR-Code Generator

Ein einfacher, moderner QR-Code Generator, der optisch an das [belegt](https://github.com/FlyingT/belegt) Tool angepasst ist. Das Interface ist vollständig auf Deutsch.

![QR-Generator Vorschau](https://raw.githubusercontent.com/FlyingT/mosaik/main/preview.png)

## Funktionen

- **Individueller Inhalt**: Erstellt QR-Codes aus URLs oder beliebigem Text.
- **Design-Anpassung**:
  - Farben für QR-Code und Hintergrund frei wählbar.
  - Umfangreicher Rahmen (**Dicke** und **Farbe** wählbar, perfekt für Branding).
  - Textzeile unter dem QR-Code hinzufügbar.
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


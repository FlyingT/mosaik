# Mosaik QR-Code Generator

Ein einfacher, moderner QR-Code Generator, der optisch an das [belegt](https://github.com/FlyingT/belegt) Tool angepasst ist. Das Interface ist vollständig auf Deutsch.

![QR-Generator Vorschau](https://raw.githubusercontent.com/FlyingT/mosaik/main/preview.png)

## Funktionen

- **Individueller Inhalt**: Erstellt QR-Codes aus URLs oder beliebigem Text.
- **Design-Anpassung**:
  - Farben für QR-Code und Hintergrund frei wählbar.
  - Optionaler Rahmen (Padding).
  - Textzeile unter dem QR-Code hinzufügbar.
- **Export**: Download als PNG, JPG oder SVG.


## Nutzung mit Docker

Erstelle eine `docker-compose.yml` mit folgendem Inhalt:

```yaml
services:
  qr-generator:
    build: .
    image: ghcr.io/flyingt/mosaik:latest
    ports:
      - "8080:80"
    restart: unless-stopped
```

Starte den Generator anschließend mit:

```bash
docker compose up -d
```

Der Generator ist dann unter `http://localhost:8080` erreichbar.



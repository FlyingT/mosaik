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
- **Design**: Modernes UI mit Tailwind CSS, passend zum Mosaik/Belegt Ökosystem.

## Nutzung mit Docker

Am einfachsten lässt sich der Generator via Docker starten:

```bash
docker compose up -d
```

Der Generator ist anschließend unter `http://localhost:8080` erreichbar.

## Entwicklung

Voraussetzung: [Node.js](https://nodejs.org/) (Version 20+)

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build
```

## CI/CD

Das Projekt enthält eine GitHub Action, die bei Pushes auf `main` oder `master` automatisch:
1. Den Docker-Container baut.
2. Das Image zu GitHub Container Registry (GHCR) pusht.

---
Erstellt von [FlyingT](https://github.com/FlyingT)

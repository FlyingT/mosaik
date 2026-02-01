# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei protokolliert.

## [1.4.1] - 2026-02-01

### Geändert
- **Logo & Favicon**: Icon verfeinert, um stärker an einen QR-Code zu erinnern (Rahmen hinzugefügt).

## [1.4.0] - 2026-01-31

### Hinzugefügt
- **Design-Sync**: Benutzeroberfläche an das "belegt" Design-System angepasst.
  - Sticky-Navbar mit Schatten implementiert.
  - Hintergrundfarben und Abstände harmonisiert.
  - Footer-Design vereinheitlicht (grauer Hintergrund, rechtsbündig).
  - Border-Radius und Schatten an den Standard angepasst.

## [1.3.0] - 2026-01-31

### Hinzugefügt
- **Dark Mode**: Unterstützung für dunkles Design hinzugefügt.
  - Automatisches Umschalten basierend auf OS-Einstellungen.
  - Manueller Toggle im Header zum Wechseln zwischen Light- und Dark-Mode.
  - Speicherung der Präferenz im Browser (LocalStorage).
- UI-Anpassungen für alle Komponenten zur Unterstützung des Dark Modes.

## [1.2.2] - 2026-01-30

### Behoben
- UI-Refinement: Die Option "Text Farbe" wurde in den Bereich "Farben & Design" verschoben, um thematisch besser zu passen.
- Label-Korrektur: "Textfarbe" in "Text Farbe" geändert.
- Favicon-Update: Das Browser-Tab Icon entspricht nun exakt dem Logo in der Kopfzeile (indigo-blauer Hintergrund mit weißen Quadraten).

## [1.2.1] - 2026-01-30

### Behoben
- Favicon hinzugefügt (Logo als Browser-Tab Icon).
- Browser-Tab Titel auf "Mosaik! - QR-Code" geändert.
- Platzhaltertext für QR-Inhalt auf "Link, Text, ..." aktualisiert.

## [1.2.0] - 2026-01-30

### Hinzugefügt
- Neue Funktion: Textfarbe für die Beschriftung nun frei wählbar.

### Behoben
- Export-Fix: Der Rahmen wird nun korrekt in heruntergeladenen Bildern (PNG/JPG) mit exportiert.
- UI-Optimierung: Die Kontrollkarten sind nun kompakter gestaltet, um unnötigen Leerraum zu vermeiden.
- Standardeinstellungen: Rahmendicke auf 10px und Rahmenfarbe auf Dunkelgrau (#374151) angepasst.

## [1.1.1] - 2026-01-30

### Behoben
- Standardfarbe für QR-Code und Rahmen auf Schwarz (#000000) gesetzt.
- Layout-Alignment: Kontrollelemente auf der linken Seite enden nun bündig mit der Vorschau.
- "VORSCHAU" zu "Vorschau" korrigiert.
- QR-Code Größe in der Vorschau für bessere Raumnutzung erhöht.
- Bereich für Rahmendicke auf 1px bis 50px angepasst.
- Labels und Platzhaltertexte für QR-Inhalt und Beschriftung optimiert.
- "laden" Text von den Download-Buttons entfernt.

## [1.1.0] - 2026-01-30

### Hinzugefügt
- Optionen für Rahmendicke und Rahmenfarbe hinzugefügt (wird eingeblendet, wenn Rahmen aktiviert ist).
- Link zur Changelog-Datei im UI hinzugefügt.

### Geändert
- Header-Logo angepasst (ein Quadrat entfernt für QR-Optik).
- Layout optimiert: Download-Buttons befinden sich nun direkt unter der Vorschau nebeneinander.
- "QR-Code Informationen" Bereich entfernt.
- Rahmen ist standardmäßig deaktiviert.

## [1.0.1] - 2026-01-30

### Behoben
- Unbenutztes Import-Statement in `App.tsx` entfernt (behebt Build-Fehler).
- Casing-Warnungen im Dockerfile behoben.

## [1.0.0] - 2026-01-30

### Hinzugefügt
- Initialer Release des QR-Code Generators.
- Anpassbare Farben für QR-Code und Hintergrund.
- Optionaler Rahmen und Text unter dem Code.
- Download-Optionen für PNG, JPG und SVG.
- Docker-Support und GitHub Action für GHCR.
- Docker Compose Konfiguration.

# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei protokolliert.

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

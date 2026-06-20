# Portal static app

Content-only HTML for the Athena back office. The Portal shell wraps this app in an iframe at `/apps/<app-key>`.

## Playbook

https://athena-care.github.io/portal-app-kit/PLAYBOOK.md

## Configuration

`athena-app.config.json` controls menu metadata and dev vs production assets. Your coding agent writes this file — you do not need to edit URLs in `index.html`.

## Local preview

`npx serve .` in this folder (or any static server).

## Platform integration

Hand off this folder to the platform team when ready. They set `environment` to `production` and integrate per Portal `docs/STATIC-APP-PORTAL-CODA.md`.

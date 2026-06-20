# Portal static app

Content for the Athena back office. The Portal shell wraps `main.html` in an iframe at `/apps/<app-key>`.

## Playbook

https://athena-care.github.io/portal-app-kit/PLAYBOOK.md

## Build

Edit `main.html` (inside `<main>`), `app.js`, and `app.css`. **Do not edit `index.html`** — it is the dev preview frame only.

## Local preview

`npx serve .` then open the preview in your browser (use the default page the server opens, or the folder root).

## Platform integration

Hand off this folder when ready. The platform team integrates per Portal `STATIC-APP-PORTAL-CODA.md`.

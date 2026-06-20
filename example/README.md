# Portal static app

Content-only HTML for the Athena back office. The Portal shell wraps this app in an iframe at `/apps/<app-key>`.

## Playbook

https://athena-care.github.io/portal-app-kit/PLAYBOOK.md

## Local preview

Use a static server (`npx serve .`) or open `index.html` in a browser. Dev assets load from the public Portal App Kit.

Before deploy: swap to `/design/athena-app.css` and `/static/athena-me.js` (see playbook).

## Platform integration

Hand off to the platform team when ready. Portal `docs/STATIC-APP-PORTAL-CODA.md`: iframe route, nginx alias, nav row, deploy.

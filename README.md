# Athena Care Portal App Kit

Public playbook and static assets for building **simple HTML/CSS/JS apps** that run inside the Athena back office Portal.

**Staff:** start at [backoffice.athenacare.health/apps/build-a-static-app](https://backoffice.athenacare.health/apps/build-a-static-app) for sample prompts.

## Quick links

| Resource | URL |
|----------|-----|
| **Playbook** (give this to your LLM) | [PLAYBOOK.md](https://athena-care.github.io/portal-app-kit/PLAYBOOK.md) |
| Brand CSS | [assets/athena-app.css](https://athena-care.github.io/portal-app-kit/assets/athena-app.css) |
| Identity helper (local dev) | [assets/athena-me-dev.js](https://athena-care.github.io/portal-app-kit/assets/athena-me-dev.js) |
| Example app | [example/](https://athena-care.github.io/portal-app-kit/example/) |

## Scaffold

```bash
curl -fsSL https://raw.githubusercontent.com/athena-care/portal-app-kit/main/scripts/scaffold-portal-app.sh | bash -s ./my-app
```

Or clone this repo and run `bash scripts/scaffold-portal-app.sh ./my-app`.

## Publishing

GitHub Pages deploys from `main` via `.github/workflows/publish.yml`.

Asset sync: `athena-app.css` from [design-system](https://github.com/athena-care/design-system), `athena-me.js` from Portal — run the sync workflow or copy manually when those change.

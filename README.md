# Portal App Kit

Public playbook and CDN assets for **Athena Care Portal static HTML apps** (iframe content only).

**Runtime CDN (Claude sandbox + apps):** `https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1.0.0`

**Docs (GitHub Pages):** https://athena-care.github.io/portal-app-kit/

| Resource | URL |
|----------|-----|
| Playbook | [PLAYBOOK.md](./PLAYBOOK.md) |
| Org skill | [SKILL.md](./SKILL.md) |
| Example app | [example/](./example/) |
| Bootstrap | `…/assets/athena-bootstrap.js` on jsDelivr |
| Web Awesome + Font Awesome | vendored under `assets/webawesome/`, `assets/fontawesome/` |

Staff guide: https://backoffice.athenacare.health/apps/build-a-static-app

## Publish (maintainers)

1. Bump `version` in `package.json` and `kit-urls.json`.
2. Push to `main` → GitHub Actions publishes to **npm** (jsDelivr mirrors automatically).
3. Requires `NPM_TOKEN` secret on this repo.

## Scaffold

```bash
bash scripts/scaffold-portal-app.sh ./my-app
```

Creates `main.html`, frozen `index.html`, `preview.html` pattern, `app.css`, `app.js`. Agents patch config after intake — authors do not edit URLs.

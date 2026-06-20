# Portal App Kit

Public playbook and dev assets for **Athena Care Portal static HTML apps** (iframe content only).

**Give your LLM this URL:**

https://athena-care.github.io/portal-app-kit/PLAYBOOK.md

**Agents:** run the intake interview first — [AGENT-INTAKE.md](./AGENT-INTAKE.md)

| Resource | URL |
|----------|-----|
| Playbook | [PLAYBOOK.md](./PLAYBOOK.md) |
| Agent intake | [AGENT-INTAKE.md](./AGENT-INTAKE.md) |
| Example app | [example/](./example/) |
| Bootstrap | [assets/athena-bootstrap.js](./assets/athena-bootstrap.js) |
| Design CSS (dev) | [assets/athena-app.css](./assets/athena-app.css) |
| AthenaMe | [assets/athena-me.js](./assets/athena-me.js) |

Staff guide: https://backoffice.athenacare.health/apps/build-a-static-app

## Scaffold

```bash
bash scripts/scaffold-portal-app.sh ./my-app
```

Creates `athena-app.config.json`, `index.html` (bootstrap loader), `app.css`, `app.js`. Agents patch config after intake — authors do not edit URLs.

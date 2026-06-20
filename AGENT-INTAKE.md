# Agent intake — Portal static apps

**For coding agents.** Run this interview before scaffolding or writing code. Target users are **not technical** — use plain language; never ask them to edit JSON or HTML URLs.

Full playbook: [PLAYBOOK.md](./PLAYBOOK.md)

---

## Agent rules

1. **Do not scaffold** until intake is complete (unless the user says “use defaults”).
2. **Do not show raw JSON** unless asked; summarize in plain language.
3. **Never ask** about `environment`, URLs, `appKey`, or `kitOrigin` — you handle those.
4. After Q5: write `athena-app.config.json`, scaffold, then build in **`main.html`**, **`app.js`**, **`app.css`** only.
5. **Never edit `index.html`** after scaffold — preview frame only; not deployed.
6. At handoff: “Submit your app folder below” / “Send this folder to the platform team.” Do not mention `index.html` or filenames to the user.

---

## Intake questions

**Config first; the last question starts the build.**

| # | Ask the user | Maps to |
|---|--------------|---------|
| **1** | **What should we call your tool?** (This is the name people will see in the back office menu.) | `label` |
| **2** | **Who should be able to open it?** | `minRole` |
| **3** | **Where should it live in the menu?** | `navCategory` |
| **4** | **While we’re building, should we preview it as a manager, executive, or regular staff member?** (Pick the highest level you want to see during testing.) | `dev.role` |
| **5** | **What are we building today?** | App content — open-ended |

### Q2 — who can open it

| User sees | `minRole` |
|-----------|-----------|
| Everyone on staff | `staff` |
| Providers (clinical) and above | `providers` |
| Managers and above | `managers` |
| Executives and above | `executive` |
| Board members and above | `board` |
| Admins only | `admin` |

### Q3 — menu section

| User sees | `navCategory` |
|-----------|---------------|
| **Applications** — everyday tools (most common) | `applications` |
| **Dashboards** — charts, reports, org views | `dashboards` |
| **Administration** — internal admin only (rare) | `administration` |

### After Q1 (agent only)

> “I’ll use **manager-checklist** as the internal file name for this project. Does that work?”

Derive `appKey`: lowercase, hyphens from `label`. Append `-app` if needed.

### After Q5 (agent only)

Pick `icon` from the build description. Tell the user in plain language (“I’ll use a checklist icon in the menu”), not the internal icon name.

---

## Confirmation (then code immediately)

```text
Got it. Here’s the setup:
• Menu name: Manager Checklist
• Who can access: Managers and above
• Menu section: Applications
• While building, I’ll preview as: Manager
• Building: [their Q5 answer]

I’ll create the project files and start building — you won’t need to change any technical settings.
```

---

## `athena-app.config.json` (agent writes this)

```json
{
  "appKey": "manager-checklist",
  "label": "Manager Checklist",
  "icon": "list-check",
  "minRole": "managers",
  "navCategory": "applications",
  "sortOrder": 25,
  "environment": "development",
  "portalOrigin": "https://backoffice.athenacare.health",
  "kitOrigin": "https://athena-care.github.io/portal-app-kit",
  "dev": { "role": "managers" }
}
```

- `environment`: always `development` until platform deploy.
- Do **not** put asset URLs in config — `athena-bootstrap.js` derives them.
- Platform sets `environment` to `production` at integrate time.

---

## Scaffold

```bash
bash scripts/scaffold-portal-app.sh <folder> --force
```

Patch `athena-app.config.json` with intake answers, then implement Q5 in **`main.html`** (inside `<main>`), **`app.js`**, and **`app.css`**. **Never edit `index.html`.** Do not change shared URLs in `main.html` `<head>` or the bootstrap script tag.

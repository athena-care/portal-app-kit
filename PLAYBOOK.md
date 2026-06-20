# Athena Care Portal — static app playbook

Build **static HTML/CSS/JS** that runs inside the Athena back office Portal at `/apps/<app-key>`. The Portal shell (sidebar, sign-out, global nav) already exists — your page is **iframe content only**.

## How to use this doc

1. Paste this entire file into your LLM chat as context, **or**
2. Give your LLM this URL: `https://athena-care.github.io/portal-app-kit/PLAYBOOK.md`
3. Say: *"Build a static HTML app following this playbook."*

Staff guide (sample prompts): `https://backoffice.athenacare.health/apps/build-a-static-app`

---

## For coding agents — read first

**[AGENT-INTAKE.md](./AGENT-INTAKE.md)** — mandatory plain-language interview before scaffolding.

1. Ask intake Q1–Q4 (menu setup), then **“What are we building today?”**
2. Write `athena-app.config.json` from answers (user never edits JSON)
3. Run `bash scripts/scaffold-portal-app.sh <folder>`
4. Build in **`main.html`** (inside `<main>`), **`app.js`**, and **`app.css`** — **never edit `index.html`** (dev preview frame only)

---

## Architecture

```text
Staff (signed in)
  /apps/<app-key>     → Portal shell (sidebar) → iframe → /<app-key>/main.html?embed=1

Local preview (dev only)
  index.html          → mock Portal chrome → iframe → main.html

Coda (public embed, no session)
  /<app-key>/embed/<secret-key>?embed=1  → main.html, anonymous
```

| Layer | Your responsibility |
|-------|----------------------|
| **Your folder** | `main.html`, `athena-app.config.json`, `app.css`, `app.js` (+ assets). `index.html` is scaffolded for local preview — **never edit**; stripped on platform submit. |
| **Portal platform** | iframe route → `main.html`, nginx, nav row, deploy (hand off when ready) |

Auth is on the **parent** Portal page only. Never put login or `auth_request` on the static HTML file the iframe loads.

Production host: `https://backoffice.athenacare.health`

---

## Critical: do not duplicate the shell

**Wrong:** full `wa-page.shell` with drawer, wordmark, sign-out in **`main.html`**.

**Right:** content in `<main>` only; optional app-local header inside the iframe.

| Do | Don't |
|----|-------|
| Build in `main.html` `<main>`, `app.js`, `app.css` | Edit **`index.html`** after scaffold (preview plumbing only) |
| Content in `<main>`; app-local header OK | Full Portal sidebar or login in `main.html` |
| One `athena-app.config.json` for menu + environment | Swap CSS/JS URLs in `main.html` at deploy |
| `AthenaMe.ready()` for role UX | Trust client role for security |
| Hide chrome when `?embed=1` | Copy `athena-app.css` into your app folder |

---

## `athena-app.config.json` — single source of truth

Agents write this file after intake. Platform may set `environment` to `production` at deploy.

```json
{
  "appKey": "manager-checklist",
  "label": "Manager Checklist",
  "icon": "list-check",
  "minRole": "managers",
  "navCategory": "applications",
  "environment": "development",
  "portalOrigin": "https://backoffice.athenacare.health",
  "kitOrigin": "https://athena-care.github.io/portal-app-kit",
  "dev": { "role": "managers" }
}
```

| Field | Purpose |
|-------|---------|
| `appKey`, `label`, `icon`, `minRole`, `navCategory` | Sidebar nav (platform handoff; alphabetical within category) |
| `environment` | `development` while building; `production` when live in Portal |
| `dev.role` | Role to simulate locally (via `GET /api/me/dev`) |

### Assets — automatic (do not duplicate)

`athena-bootstrap.js` loads shared CSS and `athena-me.js` from URLs derived from `environment`:

| Asset | `development` | `production` |
|-------|---------------|--------------|
| Design system CSS | `{kitOrigin}/assets/athena-app.css` | `/design/athena-app.css` |
| AthenaMe JS | `{kitOrigin}/assets/athena-me.js` | `/static/athena-me.js` |

`main.html` references only **`athena-bootstrap.js`** (fixed kit URL) plus your `app.css`. Same file in dev and prod.

---

## Files agents edit

| File | Edit? |
|------|-------|
| `main.html` | **Yes** — app surface inside `<main>`. Do not change `<head>` platform boilerplate or the bootstrap script tag. |
| `app.js` / `app.css` | **Yes** |
| `index.html` | **Never** — frozen preview frame (mock shell + iframe). Not deployed. |
| `athena-app.config.json` | Agent writes once at intake only |

---

## HTML head (`main.html` load order)

1. **FOUC script** (inline, first in `<head>`) — theme/brand/ui-size from `localStorage`
2. **Embed detection** (inline) — `?embed=1` or `/embed/` → `html.embedded`
3. Google Fonts: IBM Plex Serif / Sans / Mono + Playfair Display
4. Web Awesome 3.5.0 kit `f3ba44a03c114514`: `themes/default.css`, `native.css`, `utilities.css`
5. Your `app.css` only — **not** `athena-app.css` (bootstrap injects it)
6. `webawesome.loader.js` (`type="module"`)
7. Font Awesome kit `da6fb3d90e.js`
8. Alpine 3.x (`defer`) — only if needed; after WA loader

Body end: **only** `<script src="https://athena-care.github.io/portal-app-kit/assets/athena-bootstrap.js"></script>` — bootstrap loads AthenaMe + `app.js`.

### FOUC script (copy verbatim)

```html
<script>
(function () {
  try {
    var el = document.documentElement;
    var v = localStorage.getItem('athena-care-theme') || 'system';
    el.classList.remove('wa-dark');
    if (v === 'light') {
      el.setAttribute('data-theme', 'light');
    } else if (v === 'dark') {
      el.setAttribute('data-theme', 'dark');
      el.classList.add('wa-dark');
    } else {
      el.removeAttribute('data-theme');
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        el.classList.add('wa-dark');
      }
    }
    var b = localStorage.getItem('athena-care-brand') || 'royal';
    if (b === 'royal' || b === 'adobe' || b === 'cumberland') {
      el.setAttribute('data-ac-brand', b);
    }
    var s = localStorage.getItem('athena-care-ui-size') || 'medium';
    if (s === 'small' || s === 'large') {
      el.setAttribute('data-ui-size', s);
    } else {
      el.removeAttribute('data-ui-size');
    }
  } catch (e) {}
})();
</script>
```

### Embed detection

```html
<script>
(function () {
  var q = new URLSearchParams(location.search);
  if (q.get('embed') === '1' || /\/embed\//.test(location.pathname)) {
    document.documentElement.classList.add('embedded');
  }
})();
</script>
```

---

## Local development

```bash
npx serve .
```

Open the **preview in your browser** (the folder’s default page). You’ll see mock back office chrome with a **Preview as** role menu in the sidebar; your app loads inside the frame.

Tell non-technical users *“open the preview in your browser”* — **do not name `index.html`.**

In `development`, unsigned pages call `GET https://backoffice.athenacare.health/api/me/dev?role=…` for a synthetic viewer (`fixture: true`). The preview role menu reloads `main.html` with `?devRole=`. Inside the Portal iframe, real `GET /api/me` (cookie) wins automatically.

---

## Design system essentials

- **Utilities:** `ac-section`, `ac-row`, `wa-stack`, `wa-gap-m`, `wa-cluster`, `shell-subtle`, `shell-page-hero`
- **Web Awesome:** closing tags always — `<wa-input></wa-input>`, never self-closing
- **Icons:** `<wa-icon name="kebab-name" label="Description"></wa-icon>`
- **Typography:** `h1` display headline · `h2` Work Sans heading · `shell-subtle` for secondary text
- **Theme keys:** `athena-care-theme`, `athena-care-brand`, `athena-care-ui-size` in `localStorage`

---

## Identity — AthenaMe

```javascript
AthenaMe.ready().then(function (me) {
  if (!me) return;
  if (AthenaMe.hasMinRole(me, "managers")) { /* show manager UI */ }
});
```

Production: `GET /api/me` (cookie). Local dev: `GET /api/me/dev?role=…` (synthetic, `fixture: true`).

**Roles** (descending): `admin` > `board` > `executive` > `managers` > `providers` > `staff`.

Client-side role checks are **UX only**.

---

## Platform handoff

Hand off the app folder to the platform team:

- `athena-app.config.json` (they set `environment: production`)
- `main.html`, `app.css`, `app.js`, assets (`index.html` is not deployed)

Platform integrates per Portal `STATIC-APP-PORTAL-CODA` (iframe route, nginx, nav row). SQL helper:

```bash
node portal/scripts/static-app-config-to-sql.mjs path/to/athena-app.config.json
```

---

## Anti-patterns

- Editing **`index.html`** after scaffold
- Editing CSS/JS URLs in `main.html` per environment
- Vendoring `athena-app.css` in the app repo
- `auth_request` on static `main.html` → login inside iframe
- Duplicate Portal sidebar or sign-out in `main.html`
- Secret Coda embed URL in sidebar nav

---

## Scaffold

```bash
bash scripts/scaffold-portal-app.sh ./my-app
```

```bash
curl -fsSL https://raw.githubusercontent.com/athena-care/portal-app-kit/main/scripts/scaffold-portal-app.sh | bash -s ./my-app
```

Patch `athena-app.config.json` after intake, then build in `main.html` / `app.js` / `app.css`.

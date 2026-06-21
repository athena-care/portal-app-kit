---
name: portal-static-app
description: >-
  Build Athena Care back-office static HTML apps. ALWAYS run plain-language intake
  first, then scaffold by writing files from templates in this skill. Never edit
  index.html. Build in main.html, app.js, app.css only. Use when staff want a new
  internal tool, static app, or Build with AI submission.
---

# Portal static app (Athena Care)

**You cannot rely on fetching external docs or URLs.** Everything required to scaffold and build is in **this skill**. Do not tell the user to open playbook links or run `curl` to GitHub.

**Users are not technical** — plain language only; never ask them to edit JSON, HTML URLs, or filenames like `index.html`.

Production host: `https://backoffice.athenacare.health`

---

## Agent rules

1. **Do not scaffold** until intake is complete (unless the user says “use defaults”).
2. **Do not show raw JSON** unless asked; summarize in plain language.
3. **Never ask** about `environment`, `portalOrigin`, `kitOrigin`, or `appKey` — you derive and write them.
4. After Q5: write `athena-app.config.json`, scaffold files from templates below, then build in **`main.html`**, **`app.js`**, **`app.css`** only. **Regenerate** **`preview.html`** after each meaningful change (see below).
5. **Never edit `index.html`** after scaffold — optional local sidebar preview; stripped on platform submit.
6. **While building:** show progress only as a **Claude HTML artifact** (regenerated `preview.html`). Do **not** create zip archives, downloadable bundles, or “here’s your project folder” until the user confirms the app is **finished**.
7. **Preview roles:** tell the user they can change **Preview as** in the preview sidebar drawer to test other permission levels. Role-gated UI must use `AthenaMe.hasMinRole` — the preview reloads when the dropdown changes. If they ask to “see it as staff/manager/etc.”, point them to that control or regenerate the artifact after updating `dev.role`.
8. At handoff (app finished): tell the user to **submit their app folder or zip** on the Build with AI page (or send to platform team). Do not mention `index.html`, `preview.html`, or other plumbing filenames.

---

## Intake (mandatory before scaffold)

**Config first; Q5 starts the build.**

| # | Ask the user | Maps to |
|---|--------------|---------|
| **1** | **What should we call your tool?** (Name in the back office menu.) | `label` |
| **2** | **Who should be able to open it?** | `minRole` |
| **3** | **Where should it live in the menu?** | `navCategory` |
| **4** | **While we’re building, whose view should we test — manager, executive, or regular staff?** (Highest permission level you care about.) | `dev.role` |
| **5** | **What are we building today?** | App content |

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

Confirm: “I’ll use **manager-checklist** as the internal file name. Does that work?”

Derive `appKey`: lowercase, hyphens from `label`. Append `-app` if needed.

### After Q5 (agent only)

Pick `icon` from the build (Font Awesome **sharp solid** kebab-case, e.g. `list-check`, `excavator`). Tell the user in plain language (“I’ll use a checklist icon”), not the internal name.

### Confirmation (then scaffold immediately)

```text
Got it. Here’s the setup:
• Menu name: [label]
• Who can access: [plain language]
• Menu section: [Applications / Dashboards / Administration]
• While building, I’ll preview as: [role]
• Building: [Q5 answer]

I’ll create the project files and start building — you won’t need to change any technical settings.
```

---

## Architecture

```text
Staff (signed in)
  /apps/<app-key>  → Portal shell (sidebar) → iframe → main.html?embed=1

While building (browser chat)
  preview.html — one file, CDN assets + inlined config/CSS/JS → Claude artifact or open in browser
```

- Your app is **iframe content only** — never duplicate Portal sidebar, login, or sign-out in `main.html`.
- Auth is on the parent Portal page only.
- Build inside `<main>` in `main.html`; optional app-local header is OK.

---

## `athena-app.config.json` (you write once after intake)

```json
{
  "appKey": "manager-checklist",
  "label": "Manager Checklist",
  "icon": "list-check",
  "minRole": "managers",
  "navCategory": "applications",
  "environment": "development",
  "portalOrigin": "https://backoffice.athenacare.health",
  "kitOrigin": "https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1",
  "dev": { "role": "managers" }
}
```

| Field | Notes |
|-------|--------|
| `icon` | Font Awesome **sharp solid** kebab-case (menu + `wa-icon name`); must exist in kit (e.g. `list-check`, `excavator`) |
| `environment` | Always `development` while building; platform sets `production` at deploy (see below) |
| `dev.role` | Role for preview identity |
| `kitOrigin` | Always `https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1` — **major-floating** `@1` tracks latest kit on jsDelivr |

Do **not** put bootstrap or CSS URLs in config — `athena-bootstrap.js` loads assets from `environment` + origins.

### What changes at platform deploy (agent-only)

Authors keep `environment: "development"` until handoff. **Platform integration** is the only change: set `environment` to `"production"` in `athena-app.config.json`. Then bootstrap loads `/design/athena-app.css` and `/static/athena-me.js` from the live Back Office (same files as the kit). **`main.html` head and bootstrap URL never change.** Tell staff: *“Submit your folder — we flip one setting when it goes live.”*

---

## Files you may edit

| File | Edit? |
|------|-------|
| `main.html` | **Yes** — inside `<main>` only. Do not change `<head>` boilerplate or bootstrap script tag. |
| `app.js` / `app.css` | **Yes** |
| `preview.html` | **Yes** — **regenerate** from `main.html` / `app.js` / `app.css` after each change (inlined preview; not deployed). |
| `index.html` | **Never** — optional Cursor/local sidebar preview only. |
| `athena-app.config.json` | Once at intake |

---

## Scaffold (write files — do not download scripts)

Create folder `<appKey>/` and write these files. Substitute intake values in config; leave HTML templates unchanged except config-driven title text inside `<main>` when you start building.

### `athena-app.config.json`

Use the JSON template above with intake answers.

### `index.html` (copy verbatim — do not modify)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Serif:ital,wght@0,100..700;1,100..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/webawesome/dist-cdn/styles/themes/default.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/webawesome/dist-cdn/styles/native.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/webawesome/dist-cdn/styles/utilities.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/preview-shell.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/shell-base.css" />
  <script type="module" src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/webawesome/dist-cdn/webawesome.loader.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/fontawesome/css/custom-icons.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/fontawesome/js/fontawesome.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/fontawesome/js/sharp-solid.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/fontawesome/js/custom-icons.min.js"></script>
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/preview-shell.js"></script>
</body>
</html>
```

### `main.html` (copy boilerplate verbatim; edit only inside `<main>` when building)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
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
  <script>
(function () {
  var q = new URLSearchParams(location.search);
  if (q.get('embed') === '1' || /\/embed\//.test(location.pathname)) {
    document.documentElement.classList.add('embedded');
  }
})();
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Athena Care app</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Serif:ital,wght@0,100..700;1,100..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/webawesome/dist-cdn/styles/themes/default.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/webawesome/dist-cdn/styles/native.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/webawesome/dist-cdn/styles/utilities.css" />
  <link rel="stylesheet" href="app.css" />
  <script type="module" src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/webawesome/dist-cdn/webawesome.loader.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/fontawesome/css/custom-icons.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/fontawesome/js/fontawesome.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/fontawesome/js/sharp-solid.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/fontawesome/js/custom-icons.min.js"></script>
  <script>globalThis.__ATHENA_KIT_ORIGIN__ = "https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1";</script>
  <script type="module" src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/athena-icons.js"></script>
</head>
<body>
  <main class="ac-section portal-app">
    <div class="shell-page-hero portal-app__hero">
      <h1>Athena Care app</h1>
      <p class="shell-subtle shell-hero-tagline">Replace this with your app.</p>
    </div>
    <div class="portal-app__body wa-stack wa-gap-m">
      <p id="viewer-greeting" class="shell-subtle" hidden></p>
    </div>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/athena-bootstrap.js"></script>
</body>
</html>
```

### `app.css`

```css
html.embedded .portal-app__hero {
  display: none;
}

.portal-app {
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 1rem 2rem;
}
```

### `app.js` (starter — extend for the app)

```javascript
AthenaMe.ready().then(function (me) {
  if (!me) return;
  var el = document.getElementById("viewer-greeting");
  if (!el) return;
  var name = (me.firstName + " " + me.lastName).trim() || me.email;
  el.textContent = "Signed in as " + name + " (" + me.role + ").";
  el.hidden = false;
});
```

---

## Preview while building (`preview.html`)

**No terminal or local server.** One HTML file shows the app **inside the Back Office frame** (header, drawer, synthetic nav) via **`preview-embed.js`** — no iframe, no portal API, works in Claude artifacts.

After every meaningful change to `main.html`, `app.js`, or `app.css`:

1. **Regenerate** `preview.html` from the template below — inline current config, `<style>` from `app.css`, full `<main class="portal-app">` from `main.html`, and `window.__ATHENA_APP_RUN__` with the `app.js` body (not the file wrapper).
2. Deliver it as a **Claude HTML artifact** (preferred) or tell the user **“open the preview I just updated.”** Do **not** zip or bundle files during iteration.

Preview identity is synchronous (`__ATHENA_VIEWER__` via `preview-embed.js` + `athena-me.js`) — no `/api/me` calls in the sandbox.

### Preview role switcher (sidebar)

The preview drawer includes **Preview as** (staff → admin). Changing it **re-runs the app** with a new fixture identity — same as changing `devRole` in local iframe preview. Use this when testing role-gated UI:

- Implement gates with `AthenaMe.hasMinRole(me, "managers")` (etc.).
- Tell the user: *“Use **Preview as** in the sidebar to see how this looks for other roles.”*
- Do not hard-code a single role in `app.js` when the UI should respond to the viewer.

Do not mention filenames like `preview.html` to non-technical users unless they need to download the folder.

### `preview.html` (agent maintains — regenerate from sources)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <script>
(function () {
  try {
    var el = document.documentElement;
    var v = localStorage.getItem('athena-care-theme') || 'system';
    el.classList.remove('wa-dark');
    if (v === 'light') el.setAttribute('data-theme', 'light');
    else if (v === 'dark') { el.setAttribute('data-theme', 'dark'); el.classList.add('wa-dark'); }
    else {
      el.removeAttribute('data-theme');
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) el.classList.add('wa-dark');
    }
    var b = localStorage.getItem('athena-care-brand') || 'royal';
    if (b === 'royal' || b === 'adobe' || b === 'cumberland') el.setAttribute('data-ac-brand', b);
    var s = localStorage.getItem('athena-care-ui-size') || 'medium';
    if (s === 'small' || s === 'large') el.setAttribute('data-ui-size', s);
    else el.removeAttribute('data-ui-size');
  } catch (e) {}
})();
  </script>
  <script>
window.__ATHENA_APP_CONFIG__ = {
  "appKey": "manager-checklist",
  "label": "Manager Checklist",
  "icon": "list-check",
  "minRole": "managers",
  "navCategory": "applications",
  "environment": "development",
  "portalOrigin": "https://backoffice.athenacare.health",
  "kitOrigin": "https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1",
  "dev": { "role": "managers" }
};
globalThis.__ATHENA_KIT_ORIGIN__ = "https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1";
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Preview — Manager Checklist</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Serif:ital,wght@0,100..700;1,100..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/webawesome/dist-cdn/styles/themes/default.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/webawesome/dist-cdn/styles/native.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/webawesome/dist-cdn/styles/utilities.css" />
  <style>
/* Paste app.css here */
html.embedded .portal-app__hero { display: none; }
.portal-app { max-width: 48rem; margin: 0 auto; padding: 0 1rem 2rem; }
  </style>
  <script type="module" src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/webawesome/dist-cdn/webawesome.loader.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/fontawesome/css/custom-icons.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/fontawesome/js/fontawesome.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/fontawesome/js/sharp-solid.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/fontawesome/js/custom-icons.min.js"></script>
  <script>globalThis.__ATHENA_KIT_ORIGIN__ = "https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1";</script>
  <script type="module" src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/athena-icons.js"></script>
</head>
<body>
  <main class="ac-section portal-app">
    <!-- Paste full <main> from main.html (including class portal-app) -->
  </main>
  <script>
window.__ATHENA_APP_RUN__ = function () {
  /* Paste app.js body here (not the file wrapper) */
};
  </script>
  <script src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/athena-me.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1/assets/preview-embed.js"></script>
</body>
</html>
```

`preview-embed.js` loads shell chrome (`shell-base.css`, `preview-shell.css`, `athena-app.css`), wraps the inlined `<main>`, and runs `__ATHENA_APP_RUN__` directly (no `athena-bootstrap.js` in artifact preview). Load **`athena-me.js`** before it for `AthenaMe` / role checks. **`index.html`** (local only) still uses `preview-shell.js` + iframe when the author runs a static server.

Optional: `index.html` + `npx serve .` only if the author uses Cursor with a terminal and wants iframe-based local preview.

---

## Design system

- Utilities: `ac-section`, `ac-row`, `wa-stack`, `wa-gap-m`, `wa-cluster`, `shell-subtle`, `shell-page-hero`
- Web Awesome: **closing tags always** — `<wa-input></wa-input>`, never self-closing; button sizes `s` / `m` / `l` (not `small` / `medium` / `large`)
- Icons: `<wa-icon name="kebab-name" label="Description"></wa-icon>` — **`athena-icons.js`** registers sharp-solid SVGs as the default library (included in head templates)
- Hide hero when embedded: `html.embedded` class (`main.html` embed detection; `preview-embed.js` adds it in artifact preview)

---

## Identity — AthenaMe

```javascript
AthenaMe.ready().then(function (me) {
  if (!me) return;
  if (AthenaMe.hasMinRole(me, "managers")) { /* show manager UI */ }
});
```

Roles (descending): `admin` > `board` > `executive` > `managers` > `providers` > `staff`. Client-side checks are **UX only**.

---

## Handoff (app finished)

When the user approves the app:

1. Ensure `main.html`, `app.js`, `app.css`, and `athena-app.config.json` are complete.
2. Optionally provide a **zip** of the app folder **only now** — the Build with AI page accepts **folder or zip** upload.
3. Direct them to **Build with AI** on the back office to submit for review.

Until handoff, keep using **HTML artifacts** for preview — not zip downloads.

---

## Anti-patterns

- Editing `index.html` after scaffold
- Letting `preview.html` drift — **regenerate** it from `main.html` / `app.js` / `app.css` after each change
- **Zip archives or folder downloads while still building** — use artifacts until the user says the app is done
- Ignoring the preview **Preview as** dropdown — use it to verify role-gated UI
- Duplicating Portal sidebar or login in `main.html`
- Swapping bootstrap or design-system URLs in `main.html` per environment
- Vendoring `athena-app.css` into the app folder
- Asking the user to fetch or read external playbook URLs

---

## Skill version

`2026-06-22` — preview-embed 1.0.4: runs app directly, preserves sibling scripts; preview.html loads `athena-me.js` (not bootstrap).

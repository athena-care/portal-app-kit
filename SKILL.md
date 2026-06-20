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
4. After Q5: write `athena-app.config.json`, scaffold files from templates below, then build in **`main.html`**, **`app.js`**, **`app.css`** only. Keep **`preview.html`** in sync for live preview (see below).
5. **Never edit `index.html`** after scaffold — optional local sidebar preview; stripped on platform submit.
6. At handoff: tell the user to **submit their app folder** on the Build with AI page (or send to platform team). Do not mention `index.html`, `preview.html`, or other plumbing filenames.

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

Pick `icon` from the build (Font Awesome **solid** kebab-case, e.g. `list-check`, `excavator`). Tell the user in plain language (“I’ll use a checklist icon”), not the internal name.

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
  "kitOrigin": "https://athena-care.github.io/portal-app-kit",
  "dev": { "role": "managers" }
}
```

| Field | Notes |
|-------|--------|
| `icon` | Font Awesome **solid** kebab-case; must exist in Athena kit (e.g. `excavator`, `wand-magic-sparkles`) |
| `environment` | Always `development` until platform deploy |
| `dev.role` | Role for local preview |

Do **not** put bootstrap or CSS URLs in config — `athena-bootstrap.js` loads assets from `environment` + origins.

---

## Files you may edit

| File | Edit? |
|------|-------|
| `main.html` | **Yes** — inside `<main>` only. Do not change `<head>` boilerplate or bootstrap script tag. |
| `app.js` / `app.css` | **Yes** |
| `preview.html` | **Yes** — keep in sync with the three files above (inlined preview; not deployed). |
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
  <link rel="stylesheet" href="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/styles/themes/default.css" />
  <link rel="stylesheet" href="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/styles/native.css" />
  <link rel="stylesheet" href="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/styles/utilities.css" />
  <link rel="stylesheet" href="https://athena-care.github.io/portal-app-kit/assets/preview-shell.css" />
  <link rel="stylesheet" href="https://athena-care.github.io/portal-app-kit/assets/shell-base.css" />
  <script type="module" src="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/webawesome.loader.js"></script>
  <script src="https://kit.fontawesome.com/da6fb3d90e.js" crossorigin="anonymous"></script>
</head>
<body>
  <script src="https://athena-care.github.io/portal-app-kit/assets/preview-shell.js"></script>
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
  <link rel="stylesheet" href="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/styles/themes/default.css" />
  <link rel="stylesheet" href="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/styles/native.css" />
  <link rel="stylesheet" href="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/styles/utilities.css" />
  <link rel="stylesheet" href="app.css" />
  <script type="module" src="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/webawesome.loader.js"></script>
  <script src="https://kit.fontawesome.com/da6fb3d90e.js" crossorigin="anonymous"></script>
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
  <script src="https://athena-care.github.io/portal-app-kit/assets/athena-bootstrap.js"></script>
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

**No terminal or local server.** One HTML file loads Athena design system + AthenaMe from **HTTPS CDNs** only. Config, `app.css`, and `app.js` are **inlined** so it works in a Claude artifact / browser sandbox.

After every meaningful change to `main.html`, `app.js`, or `app.css`:

1. Update `preview.html` (template below) — inline current config, `<style>` from `app.css`, `<main>` from `main.html`, `window.__ATHENA_APP_RUN__` with `app.js` body.
2. Show it as a **Claude HTML artifact** or tell the user **“open the preview I just updated.”**

Do not mention filenames like `preview.html` to non-technical users unless they need to download the folder.

### `preview.html` (agent maintains — copy and patch)

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
  "kitOrigin": "https://athena-care.github.io/portal-app-kit",
  "dev": { "role": "managers" }
};
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Preview — Manager Checklist</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Serif:ital,wght@0,100..700;1,100..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/styles/themes/default.css" />
  <link rel="stylesheet" href="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/styles/native.css" />
  <link rel="stylesheet" href="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/styles/utilities.css" />
  <style>
/* Paste app.css here */
html.embedded .portal-app__hero { display: none; }
.portal-app { max-width: 48rem; margin: 0 auto; padding: 0 1rem 2rem; }
  </style>
  <script type="module" src="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/webawesome.loader.js"></script>
  <script src="https://kit.fontawesome.com/da6fb3d90e.js" crossorigin="anonymous"></script>
</head>
<body>
  <main class="ac-section portal-app">
    <!-- Paste <main> inner HTML from main.html -->
  </main>
  <script>
window.__ATHENA_APP_RUN__ = function () {
  /* Paste app.js body here (not the file wrapper) */
};
  </script>
  <script src="https://athena-care.github.io/portal-app-kit/assets/athena-bootstrap.js"></script>
</body>
</html>
```

`athena-app.css` styles app content; preview sidebar chrome (`.shell-sidebar-link`, wordmark, etc.) comes from **`shell-base.css`** — loaded by `preview-shell.js` and frozen `index.html`.

Optional: `index.html` + `npx serve .` only if the author uses Cursor with a terminal and wants the full sidebar preview frame.

---

## Design system

- Utilities: `ac-section`, `ac-row`, `wa-stack`, `wa-gap-m`, `wa-cluster`, `shell-subtle`, `shell-page-hero`
- Web Awesome: **closing tags always** — `<wa-input></wa-input>`, never self-closing
- Icons in app UI: `<wa-icon name="kebab-name" label="Description"></wa-icon>`
- Hide hero when embedded: `html.embedded` class (from embed detection in `main.html`)

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

## Anti-patterns

- Editing `index.html` after scaffold
- Letting `preview.html` drift out of sync with `main.html` / `app.js` / `app.css`
- Duplicating Portal sidebar or login in `main.html`
- Swapping bootstrap or design-system URLs in `main.html` per environment
- Vendoring `athena-app.css` into the app folder
- Asking the user to fetch or read external playbook URLs

---

## Skill version

`2026-06` — preview.html single-file sandbox preview; bootstrap inline config + `__ATHENA_APP_RUN__`.

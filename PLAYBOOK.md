# Athena Care Portal — static app playbook

Build **static HTML/CSS/JS** that runs inside the Athena back office Portal at `/apps/<app-key>`. The Portal shell (sidebar, sign-out, global nav) already exists — your page is **iframe content only**.

## How to use this doc

1. Paste this entire file into your LLM chat as context, **or**
2. Give your LLM this URL: `https://athena-care.github.io/portal-app-kit/PLAYBOOK.md`
3. Say: *"Build a static HTML app following this playbook."*

Staff guide (sample prompts): `https://backoffice.athenacare.health/apps/build-a-static-app`

---

## Architecture

```text
Staff (signed in)
  /apps/<app-key>     → Portal shell (sidebar) → iframe → /<app-key>/index.html?embed=1

Coda (public embed, no session)
  /<app-key>/embed/<secret-key>?embed=1  → same index.html, anonymous
```

| Layer | Your responsibility |
|-------|----------------------|
| **Your folder** | `index.html` + CSS/JS/assets |
| **Portal platform** | iframe route, nginx, nav row, deploy (hand off when ready) |

Auth is on the **parent** Portal page only. Never put login or `auth_request` on the static HTML file the iframe loads.

Production host: `https://backoffice.athenacare.health`

---

## Critical: do not duplicate the shell

**Wrong:** full `wa-page.shell` with drawer, wordmark, sign-out (design-system standalone scaffold).

**Right:** content in `<main>` only; optional app-local header inside the iframe.

| Do | Don't |
|----|-------|
| Content in `<main>`; app-local header OK | Full Portal sidebar or login in your HTML |
| FOUC script (theme keys below) | Separate theme system |
| `AthenaMe.ready()` for role UX | Trust client role for security |
| Hide chrome when `?embed=1` | `?embed=true` as security |

---

## Asset URLs: local dev vs production

Use **public kit URLs** while building on your computer. Swap to **backoffice paths** before shipping inside the Portal iframe.

| Asset | Local development | Production (backoffice iframe) |
|-------|-------------------|--------------------------------|
| Brand CSS | `https://athena-care.github.io/portal-app-kit/assets/athena-app.css` | `/design/athena-app.css` |
| Identity JS | `https://athena-care.github.io/portal-app-kit/assets/athena-me-dev.js` | `/static/athena-me.js` |
| Viewer API | Mock via dev helper (or real if testing on backoffice) | `GET /api/me` (cookie) |

Test locally with any static server (`npx serve .`, VS Code Live Server, etc.) or open `index.html` in the browser.

Override mock role during local dev: `localStorage.setItem('athena-me-dev-role', 'managers')` then reload.

---

## HTML head (load order)

1. **FOUC script** (inline, first in `<head>`) — theme/brand/ui-size from `localStorage`
2. **Embed detection** (inline) — `?embed=1` or `/embed/` → `html.embedded`
3. Google Fonts: IBM Plex Serif / Sans / Mono + Playfair Display
4. Web Awesome 3.5.0 kit `f3ba44a03c114514`: `themes/default.css`, `native.css`, `utilities.css`
5. **Brand CSS** (kit URL for dev, `/design/...` for prod)
6. Your `app.css`
7. `webawesome.loader.js` (`type="module"`)
8. Font Awesome kit `da6fb3d90e.js`
9. Alpine 3.x (`defer`) — only if needed; after WA loader

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

## Minimal index.html (local dev URLs)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <!-- FOUC + embed scripts here -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My app — Athena Care</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Serif:ital,wght@0,100..700;1,100..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/styles/themes/default.css" />
  <link rel="stylesheet" href="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/styles/native.css" />
  <link rel="stylesheet" href="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/styles/utilities.css" />
  <link rel="stylesheet" href="https://athena-care.github.io/portal-app-kit/assets/athena-app.css" />
  <link rel="stylesheet" href="app.css" />

  <script type="module" src="https://ka-p.webawesome.com/kit/f3ba44a03c114514/webawesome@3.5.0/webawesome.loader.js"></script>
  <script src="https://kit.fontawesome.com/da6fb3d90e.js" crossorigin="anonymous"></script>
</head>
<body>
  <main class="ac-section portal-app">
    <div class="shell-page-hero portal-app__hero">
      <h1>My app</h1>
      <p class="shell-subtle shell-hero-tagline">Short description.</p>
    </div>
    <div class="portal-app__body wa-stack wa-gap-m">
      <p id="viewer-greeting" class="shell-subtle" hidden></p>
    </div>
  </main>

  <script src="https://athena-care.github.io/portal-app-kit/assets/athena-me-dev.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

**app.css:**

```css
html.embedded .portal-app__hero { display: none; }
.portal-app { max-width: 48rem; margin: 0 auto; padding: 0 1rem 2rem; }
```

**app.js:**

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

Before deploy, change CSS to `/design/athena-app.css` and script to `/static/athena-me.js`.

---

## Design system essentials

- **Utilities:** `ac-section`, `ac-row`, `wa-stack`, `wa-gap-m`, `wa-cluster`, `shell-subtle`, `shell-page-hero`
- **Web Awesome:** closing tags always — `<wa-input></wa-input>`, never self-closing
- **Icons:** `<wa-icon name="kebab-name" label="Description"></wa-icon>`; empty `label=""` when adjacent text describes the control
- **Typography:** `h1` display headline · `h2` Work Sans heading · use `shell-subtle` for secondary text
- **Theme keys:** `athena-care-theme`, `athena-care-brand`, `athena-care-ui-size` in `localStorage` (synced with Portal shell)

---

## Identity — AthenaMe

```javascript
AthenaMe.ready().then(function (me) {
  if (!me) return; // unsigned or Coda embed
  if (AthenaMe.hasMinRole(me, "managers")) { /* show admin UI */ }
});
```

`GET /api/me` returns: `userId`, `email`, `firstName`, `lastName`, `role`, `status`, `roleRank`.

**Roles** (descending): `admin` > `board` > `executive` > `managers` > `providers` > `staff`.

Client-side role checks are **UX only**. Enforce sensitive actions on a server if needed.

---

## Platform handoff

When your app works locally, hand off to the platform team:

- App key: `my-app`
- Folder with `index.html` + assets
- Request integration per Portal `STATIC-APP-PORTAL-CODA` (iframe route, nginx alias, nav row, optional Coda embed)

You deliver HTML; platform wires deploy.

---

## Anti-patterns

- `auth_request` on static `index.html` → login inside iframe
- Duplicate Portal sidebar or sign-out in your HTML
- Secret Coda embed URL in sidebar nav
- Org Chart's legacy inline CSS as a template — use design-system tokens

---

## Scaffold

```bash
bash scripts/scaffold-portal-app.sh ./my-app
```

Or from this repo on GitHub:

```bash
curl -fsSL https://raw.githubusercontent.com/athena-care/portal-app-kit/main/scripts/scaffold-portal-app.sh | bash -s ./my-app
```

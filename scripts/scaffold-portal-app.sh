#!/usr/bin/env bash
# scaffold-portal-app.sh — Portal static app starter (main.html + frozen preview index.html).
#
# Usage: bash scaffold-portal-app.sh <target-dir> [--force]

set -euo pipefail

KIT_BASE="${ATHENA_PORTAL_APP_KIT_BASE:-https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1.0.0}"
WA_BASE="${KIT_BASE}/assets/webawesome/dist-cdn"
FA_BASE="${KIT_BASE}/assets/fontawesome"
PORTAL_ORIGIN="${ATHENA_PORTAL_ORIGIN:-https://backoffice.athenacare.health}"

if [ "${1:-}" = "" ] || [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ]; then
  cat <<USAGE
Usage: scaffold-portal-app.sh <target-dir> [--force]

Creates main.html (app), index.html (dev preview — do not edit), athena-app.config.json,
app.css, app.js, README.md.

Agents: run intake first, patch athena-app.config.json, build in main.html / app.js / app.css only.
Never edit index.html after scaffold.

Pass --force to overwrite existing files.
USAGE
  exit 0
fi

TARGET="$1"
FORCE=0
if [ "${2:-}" = "--force" ]; then FORCE=1; fi

mkdir -p "$TARGET"

write_if_safe() {
  local path="$1"
  if [ -e "$path" ] && [ "$FORCE" -ne 1 ]; then
    echo "skip (exists): $path"
    return
  fi
  cat > "$path"
  echo "wrote: $path"
}

# shellcheck disable=SC2094
write_if_safe "$TARGET/athena-app.config.json" <<JSON
{
  "appKey": "my-app",
  "label": "My App",
  "icon": "link",
  "minRole": "staff",
  "navCategory": "applications",
  "environment": "development",
  "portalOrigin": "${PORTAL_ORIGIN}",
  "kitOrigin": "${KIT_BASE}",
  "dev": {
    "role": "staff"
  }
}
JSON

# shellcheck disable=SC2094
write_if_safe "$TARGET/index.html" <<HTML
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

  <link rel="stylesheet" href="${WA_BASE}/styles/themes/default.css" />
  <link rel="stylesheet" href="${WA_BASE}/styles/native.css" />
  <link rel="stylesheet" href="${WA_BASE}/styles/utilities.css" />
  <link rel="stylesheet" href="${KIT_BASE}/assets/preview-shell.css" />
  <link rel="stylesheet" href="${KIT_BASE}/assets/shell-base.css" />
  <link rel="stylesheet" href="${FA_BASE}/css/custom-icons.min.css" />

  <script type="module" src="${WA_BASE}/webawesome.loader.js"></script>
  <script src="${FA_BASE}/js/fontawesome.min.js"></script>
  <script src="${FA_BASE}/js/sharp-solid.min.js"></script>
  <script src="${FA_BASE}/js/custom-icons.min.js"></script>
</head>
<body>
  <script src="${KIT_BASE}/assets/preview-shell.js"></script>
</body>
</html>
HTML

# shellcheck disable=SC2094
write_if_safe "$TARGET/main.html" <<HTML
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
  if (q.get('embed') === '1' || /\\/embed\\//.test(location.pathname)) {
    document.documentElement.classList.add('embedded');
  }
})();
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Athena Care app</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=IBM+Plex+Serif:ital,wght@0,100..700;1,100..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="${WA_BASE}/styles/themes/default.css" />
  <link rel="stylesheet" href="${WA_BASE}/styles/native.css" />
  <link rel="stylesheet" href="${WA_BASE}/styles/utilities.css" />
  <link rel="stylesheet" href="app.css" />
  <link rel="stylesheet" href="${FA_BASE}/css/custom-icons.min.css" />

  <script type="module" src="${WA_BASE}/webawesome.loader.js"></script>
  <script src="${FA_BASE}/js/fontawesome.min.js"></script>
  <script src="${FA_BASE}/js/sharp-solid.min.js"></script>
  <script src="${FA_BASE}/js/custom-icons.min.js"></script>
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

  <script src="${KIT_BASE}/assets/athena-bootstrap.js"></script>
</body>
</html>
HTML

# shellcheck disable=SC2094
write_if_safe "$TARGET/app.css" <<'CSS'
html.embedded .portal-app__hero {
  display: none;
}

.portal-app {
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 1rem 2rem;
}
CSS

# shellcheck disable=SC2094
write_if_safe "$TARGET/app.js" <<'JS'
AthenaMe.ready().then(function (me) {
  if (!me) return;
  var el = document.getElementById("viewer-greeting");
  if (!el) return;
  var name = (me.firstName + " " + me.lastName).trim() || me.email;
  el.textContent = "Signed in as " + name + " (" + me.role + ").";
  el.hidden = false;
});
JS

# shellcheck disable=SC2094
write_if_safe "$TARGET/README.md" <<MD
# Portal static app

Content for the Athena back office. The Portal shell wraps \`main.html\` in an iframe at \`/apps/<app-key>\`.

## Playbook

https://athena-care.github.io/portal-app-kit/PLAYBOOK.md

## Build

Edit \`main.html\` (inside \`<main>\`), \`app.js\`, and \`app.css\`. **Do not edit \`index.html\`** — it is the dev preview frame only.

## Local preview

\`npx serve .\` then open the preview in your browser (use the default page the server opens, or the folder root).

## Platform integration

Hand off this folder when ready. The platform team integrates per Portal \`STATIC-APP-PORTAL-CODA.md\`.
MD

SCRIPT_SELF="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"
chmod +x "$SCRIPT_SELF" 2>/dev/null || true

echo "Done. Run intake, patch athena-app.config.json, then build in main.html / app.js / app.css. See ${KIT_BASE}/PLAYBOOK.md"

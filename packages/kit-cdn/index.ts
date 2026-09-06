/** Public Portal App Kit — runtime assets on jsDelivr (Claude sandbox compatible). */

export const KIT_CDN_VERSION = "1";

export const KIT_CDN_PACKAGE = "athena-portal-app-kit";

export const KIT_CDN_BASE = `https://cdn.jsdelivr.net/npm/${KIT_CDN_PACKAGE}@${KIT_CDN_VERSION}`;

/** GitHub Pages — human docs only */
export const PORTAL_APP_KIT_DOCS_BASE = "https://athena-care.github.io/portal-app-kit";

export const PORTAL_APP_KIT_PLAYBOOK_URL = `${PORTAL_APP_KIT_DOCS_BASE}/PLAYBOOK.md`;

export const PORTAL_APP_KIT_INTAKE_URL = `${PORTAL_APP_KIT_DOCS_BASE}/AGENT-INTAKE.md`;

const WA = `${KIT_CDN_BASE}/assets/webawesome/dist-cdn`;

const FA = `${KIT_CDN_BASE}/assets/fontawesome`;

/** Self-hosted on backoffice.athenacare.health (synced from portal-app-kit). */
const BACKOFFICE_WA = "/webawesome/dist-cdn";

export const KIT_WEBAWESOME = {
  theme: `${WA}/styles/themes/default.css`,
  native: `${WA}/styles/native.css`,
  utilities: `${WA}/styles/utilities.css`,
  loader: `${WA}/webawesome.loader.js`,
} as const;

export const KIT_FONTAWESOME = {
  customIconsCss: `${FA}/css/custom-icons.min.css`,
  fontawesomeJs: `${FA}/js/fontawesome.min.js`,
  sharpSolidJs: `${FA}/js/sharp-solid.min.js`,
  customIconsJs: `${FA}/js/custom-icons.min.js`,
  svgCustomIcon: (icon: string) =>
    `${FA}/svgs/custom-icons/${encodeURIComponent(icon.trim() || "link")}.svg`,
  svgSharpSolid: (icon: string) =>
    `${FA}/svgs/sharp-solid/${encodeURIComponent(icon.trim() || "link")}.svg`,
} as const;

/** The one global brand/token/WA-remap stylesheet. Every consumer (backoffice apps,
 * the public site, anything else) loads this exact URL directly -- no per-app or
 * per-environment copies, no deploy-time syncing. Lives on media.athenacare.health
 * specifically because that domain is stable across any future site/host change. */
export const ATHENA_GLOBAL_STYLESHEET = "https://media.athenacare.health/styles.css";

/** Back Office — same-origin Web Awesome (portal-app-kit on the internal host). */
export const BACKOFFICE_WEBAWESOME = {
  base: BACKOFFICE_WA,
  theme: `${BACKOFFICE_WA}/styles/themes/default.css`,
  native: `${BACKOFFICE_WA}/styles/native.css`,
  utilities: `${BACKOFFICE_WA}/styles/utilities.css`,
  loader: `${BACKOFFICE_WA}/webawesome.loader.js`,
  dataGrid: `${BACKOFFICE_WA}/components/data-grid/data-grid.js`,
  combobox: `${BACKOFFICE_WA}/components/combobox/combobox.js`,
  details: `${BACKOFFICE_WA}/components/details/details.js`,
  tag: `${BACKOFFICE_WA}/components/tag/tag.js`,
  fileInput: `${BACKOFFICE_WA}/components/file-input/file-input.js`,
  copyButton: `${BACKOFFICE_WA}/components/copy-button/copy-button.js`,
} as const;

export const BACKOFFICE_FONTAWESOME = {
  customIconsCss: KIT_FONTAWESOME.customIconsCss,
  fontawesomeJs: KIT_FONTAWESOME.fontawesomeJs,
  sharpSolidJs: KIT_FONTAWESOME.sharpSolidJs,
  customIconsJs: KIT_FONTAWESOME.customIconsJs,
  svgCustomIcon: KIT_FONTAWESOME.svgCustomIcon,
  /** @deprecated use svgSharpSolid — alias for shell nav icons */
  svgSolid: KIT_FONTAWESOME.svgSharpSolid,
  svgSharpSolid: KIT_FONTAWESOME.svgSharpSolid,
} as const;

export const PORTAL_APP_KIT_ASSETS = {
  bootstrap: `${KIT_CDN_BASE}/assets/athena-bootstrap.js`,
  css: `${KIT_CDN_BASE}/assets/athena-app.css`,
  me: `${KIT_CDN_BASE}/assets/athena-me.js`,
  previewShell: `${KIT_CDN_BASE}/assets/preview-shell.js`,
  previewShellCss: `${KIT_CDN_BASE}/assets/preview-shell.css`,
  shellBaseCss: `${KIT_CDN_BASE}/assets/shell-base.css`,
  example: `${PORTAL_APP_KIT_DOCS_BASE}/example/`,
  kitOrigin: KIT_CDN_BASE,
} as const;

/** @deprecated use KIT_CDN_BASE */
export const PORTAL_APP_KIT_BASE = KIT_CDN_BASE;

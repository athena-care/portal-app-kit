/**
 * Point Web Awesome's default icon library at self-hosted Font Awesome Pro SVGs.
 *
 * Root cause: without setIconPath / kit code, wa-icon name= hits FA Free CDN.
 * Pro names (e.g. sun-bright) return 403 there; Free names (moon, gear) work.
 *
 * Athena ships Pro SVGs under kit .../fontawesome/svgs/{sharp-solid,...}/.
 * Default family must be "sharp" so name= resolves to sharp-solid (we do not
 * vendor classic solid/).
 *
 * Load as type="module" as early as possible (prefer <head>), before icons render.
 * Optional globals:
 *   __ATHENA_WA_LOADER__  — must match the WA loader URL already on the page
 *   __ATHENA_KIT_ORIGIN__ — portal-app-kit origin for SVG assets
 */
const DEFAULT_KIT = "https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1";
const kit = String(globalThis.__ATHENA_KIT_ORIGIN__ || DEFAULT_KIT).replace(
  /\/$/,
  "",
);

const waLoader = String(
  globalThis.__ATHENA_WA_LOADER__ ||
    kit + "/assets/webawesome/dist-cdn/webawesome.loader.js",
);

const { setIconPath, setDefaultIconFamily } = await import(waLoader);

setIconPath(kit + "/assets/fontawesome/svgs");
setDefaultIconFamily("sharp");

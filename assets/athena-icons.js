/**
 * Registers Web Awesome default icon library → kit sharp-solid SVGs.
 * Load as type="module" after webawesome.loader.js. Set window.__ATHENA_KIT_ORIGIN__
 * before this script (athena-bootstrap and preview templates do).
 */
const DEFAULT_KIT = "https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1";
const kit = String(globalThis.__ATHENA_KIT_ORIGIN__ || DEFAULT_KIT).replace(
  /\/$/,
  "",
);

const { registerIconLibrary } = await import(
  kit + "/assets/webawesome/dist-cdn/webawesome.loader.js"
);

registerIconLibrary("default", {
  resolver: (name) =>
    kit +
    "/assets/fontawesome/svgs/sharp-solid/" +
    encodeURIComponent(String(name || "link").trim() || "link") +
    ".svg",
  mutator: (svg) => {
    svg.setAttribute("fill", "currentColor");
  },
});

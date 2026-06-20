/**
 * Dev-only back office preview frame — loaded by frozen index.html only.
 * Builds a static mock Portal shell and iframes main.html.
 */
(function () {
  "use strict";

  var DEFAULT_KIT = "https://athena-care.github.io/portal-app-kit";
  var ROLES = [
    "staff",
    "providers",
    "managers",
    "executive",
    "board",
    "admin",
  ];

  function el(tag, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  function injectStylesheet(href) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function defaultRole(config) {
    return (
      (config.dev && config.dev.role) ||
      config.minRole ||
      "staff"
    );
  }

  function mainFrameSrc(role) {
    return "./main.html?devRole=" + encodeURIComponent(role);
  }

  function buildPreviewShell(config, role) {
    var waPage = document.createElement("wa-page");
    waPage.className = "shell athena-preview-shell";
    waPage.setAttribute("mobile-breakpoint", "48rem");

    var headerSlot = el("div", "shell-header-bar wa-cluster wa-gap-m");
    headerSlot.setAttribute("slot", "header");

    var menuBtn = document.createElement("wa-button");
    menuBtn.setAttribute("type", "button");
    menuBtn.setAttribute("appearance", "outlined");
    menuBtn.setAttribute("variant", "neutral");
    menuBtn.setAttribute("size", "small");
    menuBtn.setAttribute("aria-label", "Open sidebar");
    menuBtn.setAttribute("data-drawer", "open nav-drawer");

    var markIcon = document.createElement("i");
    markIcon.className = "fa-kit fa-athenacare-mark";
    markIcon.setAttribute("aria-hidden", "true");
    menuBtn.appendChild(markIcon);
    headerSlot.appendChild(menuBtn);

    var spacer = el("span", "shell-header-spacer");
    spacer.setAttribute("aria-hidden", "true");
    headerSlot.appendChild(spacer);

    var drawer = document.createElement("wa-drawer");
    drawer.id = "nav-drawer";
    drawer.setAttribute("without-header", "");
    drawer.setAttribute("aria-label", "Athena Care");
    drawer.setAttribute("placement", "start");
    drawer.setAttribute("light-dismiss", "");

    var wordmarkLink = el("a", "shell-drawer-wordmark");
    wordmarkLink.href = "#";
    wordmarkLink.setAttribute("aria-label", "Athena Care");
    var wordmarkIcon = document.createElement("i");
    wordmarkIcon.className = "fa-kit fa-athenacare-wordmark";
    wordmarkIcon.setAttribute("aria-hidden", "true");
    wordmarkLink.appendChild(wordmarkIcon);
    drawer.appendChild(wordmarkLink);

    var nav = el("nav", "wa-stack wa-gap-m");
    nav.setAttribute("aria-label", "Preview controls");

    var hPreview = el("div", "shell-nav-heading");
    hPreview.textContent = "Preview";
    nav.appendChild(hPreview);

    var appLink = el("div", "athena-preview-app-link");
    var appIcon = document.createElement("i");
    appIcon.className = "fa-solid fa-" + (config.icon || "link");
    appIcon.setAttribute("aria-hidden", "true");
    appLink.appendChild(appIcon);
    appLink.appendChild(document.createTextNode(config.label || "Your app"));
    nav.appendChild(appLink);

    var roleField = el("div", "athena-preview-role-field");
    var roleLabel = document.createElement("label");
    roleLabel.setAttribute("for", "athena-preview-role");
    roleLabel.textContent = "Preview as";
    roleField.appendChild(roleLabel);

    var roleSelect = document.createElement("select");
    roleSelect.id = "athena-preview-role";
    roleSelect.setAttribute("aria-label", "Preview as role");
    ROLES.forEach(function (r) {
      var opt = document.createElement("option");
      opt.value = r;
      opt.textContent = r.charAt(0).toUpperCase() + r.slice(1);
      if (r === role) opt.selected = true;
      roleSelect.appendChild(opt);
    });
    roleField.appendChild(roleSelect);
    nav.appendChild(roleField);

    drawer.appendChild(nav);

    var main = el("main", "shell-main");
    var appWrap = el("div", "athena-preview-app");
    var iframe = document.createElement("iframe");
    iframe.className = "athena-preview-frame";
    iframe.title = config.label || "App preview";
    iframe.src = mainFrameSrc(role);
    appWrap.appendChild(iframe);
    main.appendChild(appWrap);

    roleSelect.addEventListener("change", function () {
      iframe.src = mainFrameSrc(roleSelect.value);
    });

    waPage.appendChild(headerSlot);
    waPage.appendChild(drawer);
    waPage.appendChild(main);

    return waPage;
  }

  function showError(message) {
    var p = el("p", "shell-subtle");
    p.style.padding = "1rem";
    p.textContent = message;
    document.body.appendChild(p);
  }

  function bootstrap() {
    fetch("./athena-app.config.json")
      .then(function (res) {
        if (!res.ok) throw new Error("Missing athena-app.config.json");
        return res.json();
      })
      .then(function (config) {
        var kit = (config.kitOrigin || DEFAULT_KIT).replace(/\/$/, "");
        injectStylesheet(kit + "/assets/athena-app.css");
        document.title = (config.label || "App") + " — preview";

        var role = defaultRole(config);
        document.body.replaceChildren(
          buildPreviewShell(config, role),
        );
      })
      .catch(function (err) {
        console.error("[preview-shell]", err);
        showError(
          "Could not load preview. Ensure athena-app.config.json exists.",
        );
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();

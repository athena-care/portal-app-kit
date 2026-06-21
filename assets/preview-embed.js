/**
 * Single-file Back Office preview — Claude artifact / preview.html only.
 * Renders wa-page + drawer around an existing <main class="portal-app">.
 * No iframe, no sibling files, no portal API calls.
 */
(function () {
  "use strict";

  var DEFAULT_KIT = "https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1";
  var ROLES = [
    "staff",
    "providers",
    "managers",
    "executive",
    "board",
    "admin",
  ];
  var ROLE_RANK = {
    admin: 5,
    board: 4,
    executive: 3,
    managers: 2,
    providers: 1,
    staff: 0,
  };

  var activeKit = DEFAULT_KIT;

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

  function faKitSolidIconSrc(icon) {
    var name = (icon || "link").trim() || "link";
    return (
      activeKit +
      "/assets/fontawesome/svgs/sharp-solid/" +
      encodeURIComponent(name) +
      ".svg"
    );
  }

  function defaultRole(config) {
    return (
      (config.dev && config.dev.role) ||
      config.minRole ||
      "staff"
    );
  }

  function buildViewer(role) {
    if (ROLE_RANK[role] === undefined) role = "staff";
    return {
      userId: "00000000-0000-0000-0000-000000000001",
      email: "preview@local.test",
      firstName: "Preview",
      lastName: "User",
      role: role,
      status: "active",
      roleRank: ROLE_RANK[role] ?? 0,
      fixture: true,
    };
  }

  function setPreviewViewer(role) {
    globalThis.__ATHENA_VIEWER__ = buildViewer(role);
    if (globalThis.AthenaMe && typeof globalThis.AthenaMe.refresh === "function") {
      globalThis.AthenaMe.refresh();
    }
  }

  function syntheticNav(config) {
    var href = config.appKey ? "/apps/" + config.appKey : "#";
    var category = config.navCategory || "applications";
    if (
      category !== "applications" &&
      category !== "dashboards" &&
      category !== "administration"
    ) {
      category = "applications";
    }
    var entry = {
      key: config.appKey || "preview-app",
      href: href,
      label: config.label || config.appKey || "Your app",
      icon: config.icon || "link",
    };
    var sections = {
      applications: [],
      dashboards: [],
      administration: [],
    };
    sections[category] = [entry];
    return sections;
  }

  function sortLinks(links) {
    return links.slice().sort(function (a, b) {
      return String(a.label).localeCompare(String(b.label));
    });
  }

  function navIcon(entry) {
    var wa = document.createElement("wa-icon");
    wa.setAttribute("src", faKitSolidIconSrc(entry.icon || "link"));
    wa.setAttribute("label", "");
    return wa;
  }

  function sidebarLink(entry, activeHref) {
    var a = el("a", "shell-sidebar-link");
    a.href = entry.href;
    a.setAttribute("data-shell-link", entry.key);
    if (activeHref && entry.href === activeHref) {
      a.setAttribute("aria-current", "page");
    }
    a.addEventListener("click", function (e) {
      e.preventDefault();
    });
    a.appendChild(navIcon(entry));
    a.appendChild(document.createTextNode(entry.label));
    return a;
  }

  function fillNavGroup(container, links, activeHref) {
    if (!container) return;
    container.replaceChildren();
    sortLinks(links).forEach(function (link) {
      container.appendChild(sidebarLink(link, activeHref));
    });
  }

  function buildEmbedShell(config, role, sections, onRoleChange) {
    var activeHref = config.appKey ? "/apps/" + config.appKey : "";
    var waPage = document.createElement("wa-page");
    waPage.className = "shell athena-preview-shell";
    waPage.setAttribute("mobile-breakpoint", "48rem");

    var headerSlot = el("div", "shell-header-bar wa-cluster wa-gap-m");
    headerSlot.setAttribute("slot", "header");

    var menuBtn = document.createElement("wa-button");
    menuBtn.setAttribute("type", "button");
    menuBtn.setAttribute("appearance", "outlined");
    menuBtn.setAttribute("variant", "neutral");
    menuBtn.setAttribute("size", "s");
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

    var wordmarkOuter = el("div", "shell-drawer-wordmark");
    var wordmarkLink = el(
      "a",
      "shell-drawer-wordmark-link shell-drawer-wordmark-brand",
    );
    wordmarkLink.href = "#";
    wordmarkLink.setAttribute("aria-label", "Athena Care home");
    wordmarkLink.addEventListener("click", function (e) {
      e.preventDefault();
    });
    var wmMark = document.createElement("i");
    wmMark.className = "fa-kit fa-athenacare-mark";
    wmMark.setAttribute("aria-hidden", "true");
    var wmText = el("span", "shell-drawer-wordmark-text");
    wmText.textContent = "Athena Care";
    wordmarkLink.appendChild(wmMark);
    wordmarkLink.appendChild(wmText);
    wordmarkOuter.appendChild(wordmarkLink);
    drawer.appendChild(wordmarkOuter);

    var nav = el("nav", "wa-stack wa-gap-m");
    nav.setAttribute("aria-label", "Sidebar navigation");

    var hApps = el("div", "shell-nav-heading");
    hApps.textContent = "Applications";
    nav.appendChild(hApps);
    var appsEl = el("div", "wa-stack wa-gap-s shell-nav-applications");
    fillNavGroup(appsEl, sections.applications, activeHref);
    nav.appendChild(appsEl);

    var dashRegion = el("div", "shell-nav-admin-region");
    dashRegion.setAttribute("data-shell-dashboards-region", "");
    if (sections.dashboards.length === 0) dashRegion.hidden = true;
    var hDash = el("div", "shell-nav-heading shell-nav-heading--group");
    hDash.textContent = "DASHBOARDS";
    var dashEl = el("div", "wa-stack wa-gap-s shell-nav-dashboards");
    fillNavGroup(dashEl, sections.dashboards, activeHref);
    dashRegion.appendChild(hDash);
    dashRegion.appendChild(dashEl);
    nav.appendChild(dashRegion);

    var adminRegion = el("div", "shell-nav-admin-region");
    adminRegion.setAttribute("data-shell-admin-region", "");
    if (sections.administration.length === 0) adminRegion.hidden = true;
    var hAdmin = el("div", "shell-nav-heading shell-nav-heading--group");
    hAdmin.textContent = "ADMINISTRATION";
    var adminEl = el("div", "wa-stack wa-gap-s shell-nav-administration");
    fillNavGroup(adminEl, sections.administration, activeHref);
    adminRegion.appendChild(hAdmin);
    adminRegion.appendChild(adminEl);
    nav.appendChild(adminRegion);

    var hAcct = el("div", "shell-nav-heading shell-nav-heading--group");
    hAcct.textContent = "Preview";
    nav.appendChild(hAcct);

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
    var appWrap = el("div", "athena-preview-embed-app");
    main.appendChild(appWrap);

    roleSelect.addEventListener("change", function () {
      if (typeof onRoleChange === "function") onRoleChange(roleSelect.value);
    });

    waPage.appendChild(headerSlot);
    waPage.appendChild(drawer);
    waPage.appendChild(main);

    return { shell: waPage, appSlot: appWrap };
  }

  function showError(message) {
    var p = el("p", "shell-subtle");
    p.style.padding = "1rem";
    p.textContent = message;
    document.body.appendChild(p);
  }

  function mount() {
    var config = globalThis.__ATHENA_APP_CONFIG__;
    if (!config || typeof config !== "object") {
      showError("Missing preview config.");
      return;
    }

    var appMain = document.querySelector("main.portal-app");
    if (!appMain) {
      showError('Missing <main class="portal-app"> for preview.');
      return;
    }

    // Clean snapshot of the app markup, taken before the app's first run mutates it.
    var pristineApp = appMain.cloneNode(true);

    var kit = (config.kitOrigin || DEFAULT_KIT).replace(/\/$/, "");
    activeKit = kit;
    globalThis.__ATHENA_KIT_ORIGIN__ = kit;

    injectStylesheet(kit + "/assets/athena-app.css");
    injectStylesheet(kit + "/assets/shell-base.css");
    injectStylesheet(kit + "/assets/preview-shell.css");

    document.documentElement.classList.add("embedded");
    document.title = (config.label || "App") + " — preview";

    var role = defaultRole(config);
    setPreviewViewer(role);

    var appSlotRef = null;

    function runApp() {
      if (typeof globalThis.__ATHENA_APP_RUN__ === "function") {
        globalThis.__ATHENA_APP_RUN__();
      }
    }

    // Mirror production's "reload iframe at new devRole": swap in a fresh copy of
    // the app and re-run it so role-gated UI re-evaluates. The fresh clone drops
    // the prior run's listeners, so re-running is safe.
    function onRoleChange(nextRole) {
      setPreviewViewer(nextRole);
      if (!appSlotRef) return;
      appSlotRef.replaceChildren(pristineApp.cloneNode(true));
      runApp();
    }

    var sections = syntheticNav(config);
    var built = buildEmbedShell(config, role, sections, onRoleChange);
    appSlotRef = built.appSlot;
    built.appSlot.appendChild(appMain);
    document.body.appendChild(built.shell); // append (don't replaceChildren) so sibling scripts survive
    runApp(); // run the app directly — the preview no longer depends on athena-bootstrap.js
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();

/**
 * Dev-only back office preview frame — loaded by frozen index.html only.
 * Uses real sidebar nav from GET /api/shell/nav/dev and iframes main.html.
 */
(function () {
  "use strict";

  var DEFAULT_KIT = "https://athena-care.github.io/portal-app-kit";
  var DEFAULT_PORTAL = "https://backoffice.athenacare.health";
  var ROLES = [
    "staff",
    "providers",
    "managers",
    "executive",
    "board",
    "admin",
  ];
  var FA_KIT_TOKEN = "da6fb3d90e";
  var FA_RELEASE = "7.2.0";

  function faKitSolidIconSrc(icon) {
    var name = (icon || "link").trim() || "link";
    return (
      "https://ka-p.fontawesome.com/releases/v" +
      FA_RELEASE +
      "/svgs/solid/" +
      name +
      ".svg?token=" +
      encodeURIComponent(FA_KIT_TOKEN)
    );
  }

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

  function sortLinks(links) {
    return links.slice().sort(function (a, b) {
      return String(a.label).localeCompare(String(b.label));
    });
  }

  function parseNavSections(payload) {
    var empty = { applications: [], dashboards: [], administration: [] };
    if (!payload || typeof payload !== "object") return empty;
    function parseList(raw) {
      if (!Array.isArray(raw)) return [];
      var out = [];
      raw.forEach(function (item) {
        if (!item || typeof item !== "object") return;
        var key = typeof item.key === "string" ? item.key : "";
        var href = typeof item.href === "string" ? item.href : "";
        var label = typeof item.label === "string" ? item.label : "";
        if (!key || !href || !label) return;
        out.push({
          key: key,
          href: href,
          label: label,
          icon: typeof item.icon === "string" ? item.icon : "link",
          openInNewTab: item.openInNewTab === true,
        });
      });
      return sortLinks(out);
    }
    return {
      applications: parseList(payload.applications),
      dashboards: parseList(payload.dashboards),
      administration: parseList(payload.administration),
    };
  }

  function ensureAppInNav(sections, config) {
    if (!config.appKey) return sections;
    var href = "/apps/" + config.appKey;
    var category = config.navCategory || "applications";
    if (
      category !== "applications" &&
      category !== "dashboards" &&
      category !== "administration"
    ) {
      category = "applications";
    }
    var lists = [
      sections.applications,
      sections.dashboards,
      sections.administration,
    ];
    var found = lists.some(function (list) {
      return list.some(function (link) {
        return link.key === config.appKey || link.href === href;
      });
    });
    if (!found) {
      sections[category].push({
        key: config.appKey,
        href: href,
        label: config.label || config.appKey,
        icon: config.icon || "link",
      });
      sections[category] = sortLinks(sections[category]);
    }
    return sections;
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
    if (entry.openInNewTab) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    if (activeHref && entry.href === activeHref) {
      a.setAttribute("aria-current", "page");
    }
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

  function fetchNav(portalOrigin, role) {
    var base = (portalOrigin || DEFAULT_PORTAL).replace(/\/$/, "");
    return fetch(
      base + "/api/shell/nav/dev?role=" + encodeURIComponent(role),
      { cache: "no-store" },
    ).then(function (res) {
      if (!res.ok) throw new Error("nav dev fetch failed");
      return res.json();
    });
  }

  function buildPreviewShell(config, role, sections) {
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

    var wordmarkOuter = el("div", "shell-drawer-wordmark");
    var wordmarkLink = el("a", "shell-drawer-wordmark-link shell-drawer-wordmark-brand");
    wordmarkLink.href = "#";
    wordmarkLink.setAttribute("aria-label", "Athena Care home");
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
    var appWrap = el("div", "athena-preview-app");
    var iframe = document.createElement("iframe");
    iframe.className = "athena-preview-frame";
    iframe.title = config.label || "App preview";
    iframe.src = mainFrameSrc(role);
    appWrap.appendChild(iframe);
    main.appendChild(appWrap);

    function reloadForRole(nextRole) {
      var portal = (config.portalOrigin || DEFAULT_PORTAL).replace(/\/$/, "");
      fetchNav(portal, nextRole)
        .then(function (payload) {
          var nextSections = ensureAppInNav(parseNavSections(payload), config);
          fillNavGroup(appsEl, nextSections.applications, activeHref);
          fillNavGroup(dashEl, nextSections.dashboards, activeHref);
          fillNavGroup(adminEl, nextSections.administration, activeHref);
          dashRegion.hidden = nextSections.dashboards.length === 0;
          adminRegion.hidden = nextSections.administration.length === 0;
          iframe.src = mainFrameSrc(nextRole);
        })
        .catch(function (err) {
          console.error("[preview-shell]", err);
          iframe.src = mainFrameSrc(nextRole);
        });
    }

    roleSelect.addEventListener("change", function () {
      reloadForRole(roleSelect.value);
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
        var portal = (config.portalOrigin || DEFAULT_PORTAL).replace(/\/$/, "");
        injectStylesheet(kit + "/assets/athena-app.css");
        injectStylesheet(kit + "/assets/shell-base.css");
        document.title = (config.label || "App") + " — preview";

        var role = defaultRole(config);
        return fetchNav(portal, role).then(function (payload) {
          var sections = ensureAppInNav(parseNavSections(payload), config);
          document.body.replaceChildren(
            buildPreviewShell(config, role, sections),
          );
        });
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

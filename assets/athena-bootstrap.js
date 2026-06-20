/**
 * Athena Portal static app bootstrap — loads config, design-system CSS, AthenaMe, app.js.
 * main.html references only this script (+ app.css). Do not edit asset URLs per environment.
 */
(function (global) {
  "use strict";

  var CONFIG_PATH = "./athena-app.config.json";
  var DEFAULT_KIT = "https://cdn.jsdelivr.net/npm/athena-portal-app-kit@1";
  var DEFAULT_PORTAL = "https://backoffice.athenacare.health";

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = function () {
        reject(new Error("Failed to load " + src));
      };
      document.body.appendChild(s);
    });
  }

  function injectStylesheet(href) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function deriveAssetUrls(config) {
    var kit = (config.kitOrigin || DEFAULT_KIT).replace(/\/$/, "");
    var env = config.environment === "production" ? "production" : "development";
    var assets = config.assets || {};
    if (env === "production") {
      return {
        css: assets.css || "/design/athena-app.css",
        me: assets.me || "/static/athena-me.js",
      };
    }
    return {
      css: assets.css || kit + "/assets/athena-app.css",
      me: assets.me || kit + "/assets/athena-me.js",
    };
  }

  function showBootstrapError(message) {
    var main = document.querySelector("main") || document.body;
    var el = document.createElement("p");
    el.className = "shell-subtle";
    el.style.padding = "1rem";
    el.textContent = message;
    main.appendChild(el);
  }

  function readConfig() {
    if (global.__ATHENA_APP_CONFIG__) {
      return Promise.resolve(global.__ATHENA_APP_CONFIG__);
    }
    return fetch(CONFIG_PATH).then(function (res) {
      if (!res.ok) throw new Error("Missing athena-app.config.json");
      return res.json();
    });
  }

  function runAppJs() {
    if (typeof global.__ATHENA_APP_RUN__ === "function") {
      global.__ATHENA_APP_RUN__();
      return Promise.resolve();
    }
    return loadScript("app.js");
  }

  function bootstrap() {
    readConfig()
      .then(function (config) {
        if (!config.portalOrigin) config.portalOrigin = DEFAULT_PORTAL;
        if (!config.kitOrigin) config.kitOrigin = DEFAULT_KIT;
        globalThis.__ATHENA_KIT_ORIGIN__ = (config.kitOrigin || DEFAULT_KIT).replace(
          /\/$/,
          "",
        );
        global.__ATHENA_APP_CONFIG__ = config;

        var urls = deriveAssetUrls(config);
        injectStylesheet(urls.css);

        return loadScript(urls.me).then(runAppJs);
      })
      .catch(function (err) {
        console.error("[athena-bootstrap]", err);
        showBootstrapError(
          "Could not load app configuration. Ensure athena-app.config.json exists.",
        );
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})(typeof window !== "undefined" ? window : globalThis);

/**
 * Athena Portal — viewer helper for static HTML apps.
 * Loaded by athena-bootstrap.js. Reads athena-app.config.json via __ATHENA_APP_CONFIG__.
 */
(function (global) {
  "use strict";

  var API_PATH = "/api/me";
  var ROLE_RANK = {
    admin: 5,
    board: 4,
    executive: 3,
    managers: 2,
    providers: 1,
    staff: 0,
  };

  var cached = null;
  var inflight = null;

  function getConfig() {
    return global.__ATHENA_APP_CONFIG__ || null;
  }

  function mockViewer(role) {
    role = role || "staff";
    if (ROLE_RANK[role] === undefined) role = "staff";
    return {
      userId: "00000000-0000-0000-0000-000000000001",
      email: "dev@local.test",
      firstName: "Dev",
      lastName: "User",
      role: role,
      status: "active",
      roleRank: ROLE_RANK[role] ?? 0,
      fixture: true,
    };
  }

  function fetchSessionMe() {
    return fetch(API_PATH, { credentials: "include" })
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .catch(function () {
        return null;
      });
  }

  function fetchDevFixture(config) {
    var portal = (config.portalOrigin || "").replace(/\/$/, "");
    var role =
      (config.dev && config.dev.role) ||
      config.minRole ||
      "staff";
    if (!portal) return Promise.resolve(null);
    var url =
      portal + "/api/me/dev?role=" + encodeURIComponent(role);
    return fetch(url)
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .catch(function () {
        return null;
      });
  }

  function fetchMe() {
    if (inflight) return inflight;
    var config = getConfig();

    inflight = fetchSessionMe()
      .then(function (me) {
        if (me) return me;
        if (!config) return null;
        if (config.environment === "development") {
          return fetchDevFixture(config).then(function (fixture) {
            if (fixture) return fixture;
            var role =
              (config.dev && config.dev.role) ||
              config.minRole ||
              "staff";
            return mockViewer(role);
          });
        }
        return null;
      })
      .catch(function () {
        if (config && config.environment === "development") {
          var role =
            (config.dev && config.dev.role) ||
            config.minRole ||
            "staff";
          return mockViewer(role);
        }
        return null;
      })
      .finally(function () {
        inflight = null;
      });

    return inflight;
  }

  global.AthenaMe = {
    ready: function () {
      if (cached !== null) return Promise.resolve(cached);
      return fetchMe().then(function (me) {
        cached = me;
        return me;
      });
    },
    refresh: function () {
      cached = null;
      return this.ready();
    },
    hasMinRole: function (me, minRole) {
      if (!me || !minRole) return false;
      var rank =
        typeof me.roleRank === "number"
          ? me.roleRank
          : ROLE_RANK[me.role] ?? 0;
      return rank >= (ROLE_RANK[minRole] ?? 0);
    },
  };
})(typeof window !== "undefined" ? window : globalThis);

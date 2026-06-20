/**
 * Athena Portal — viewer helper for LOCAL development.
 * Tries GET /api/me; falls back to a mock user when off backoffice.
 *
 * Override mock role: localStorage.setItem('athena-me-dev-role', 'managers')
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

  function mockViewer() {
    var role = "staff";
    try {
      var override = localStorage.getItem("athena-me-dev-role");
      if (override && ROLE_RANK[override] !== undefined) role = override;
    } catch (e) {}
    return {
      userId: "00000000-0000-0000-0000-000000000001",
      email: "dev@local.test",
      firstName: "Dev",
      lastName: "User",
      role: role,
      status: "active",
      roleRank: ROLE_RANK[role] ?? 0,
    };
  }

  function fetchMe() {
    if (inflight) return inflight;
    inflight = fetch(API_PATH, { credentials: "include" })
      .then(function (res) {
        if (res.ok) return res.json();
        return mockViewer();
      })
      .catch(function () {
        return mockViewer();
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

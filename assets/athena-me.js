/**
 * Athena back office — signed-in viewer for static HTML apps.
 * Usage:
 *   <script src="/static/athena-me.js"></script>
 *   AthenaMe.ready().then(function (me) { if (me) { ... } });
 */
(function (global) {
  "use strict";

  var API_PATH = "/api/me";

  /** Descending privilege — UX gating only; match portal/src/lib/roles.ts */
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

  function fetchMe() {
    if (inflight) return inflight;
    inflight = fetch(API_PATH, { credentials: "include" })
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .catch(function () {
        return null;
      })
      .finally(function () {
        inflight = null;
      });
    return inflight;
  }

  global.AthenaMe = {
    /** @returns {Promise<object|null>} Viewer or null when unsigned / embed */
    ready: function () {
      if (cached !== null) return Promise.resolve(cached);
      return fetchMe().then(function (me) {
        cached = me;
        return me;
      });
    },

    /** Re-fetch after role changes (e.g. admin updated your account). */
    refresh: function () {
      cached = null;
      return this.ready();
    },

    /** @param {object|null} me @param {string} minRole */
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

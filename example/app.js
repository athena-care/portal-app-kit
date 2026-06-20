AthenaMe.ready().then(function (me) {
  if (!me) return;
  var el = document.getElementById("viewer-greeting");
  if (!el) return;
  var name = (me.firstName + " " + me.lastName).trim() || me.email;
  el.textContent = "Signed in as " + name + " (" + me.role + ").";
  el.hidden = false;
});

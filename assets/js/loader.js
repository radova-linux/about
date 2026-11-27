(function () {
  "use strict";
  var base = document.currentScript.src;
  var loaded = false;
  var ready = false;
  var pending = null;

  function onClick(e) {
    var t = e.target.closest && e.target.closest("#theme-toggle, #lang-toggle, .nav-toggle, #about-menu-btn, .d-content-back, .team-prev, .team-next");
    if (t && !ready) {
      pending = t;
      load();
    }
  }

  function load() {
    if (loaded) return;
    loaded = true;
    var el = document.createElement("script");
    el.src = new URL("about.bundle.js?v=6", base).href;
    el.onload = function () {
      ready = true;
      document.removeEventListener("click", onClick, true);
      if (pending) { var p = pending; pending = null; p.click(); }
    };
    document.body.appendChild(el);
  }

  document.addEventListener("click", onClick, true);
  ["pointerdown", "keydown", "touchstart", "scroll"].forEach(function (type) {
    addEventListener(type, load, { once: true, passive: true });
  });
})();

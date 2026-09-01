(function () {
  "use strict";

  document.addEventListener("dragstart", function (event) {
    if (event.target instanceof Element && event.target.matches("[data-protected-media]")) {
      event.preventDefault();
    }
  });

  document.addEventListener("contextmenu", function (event) {
    if (event.target instanceof Element && event.target.matches("[data-protected-media]")) {
      event.preventDefault();
    }
  });
}());

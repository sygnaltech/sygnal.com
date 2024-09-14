"use strict";
(() => {
  // src/lesson.ts
  var initLesson = () => {
    window["sa5"] = window["sa5"] || [];
    window["sa5"].push([
      "hotkeys",
      (hotkeyHandler) => {
        hotkeyHandler.register("ctrl+shift+e", () => {
          location.href = "?edit";
        });
      }
    ]);
    const daysRecent = 60;
    const elements = document.querySelectorAll(`script[type='course-info']`);
    elements.forEach((element) => {
      var data = JSON.parse(element.innerHTML);
      const lesson = element.closest(".course-item");
      if (lesson == null)
        return;
      console.log(`status ${data.status}`);
      if (data.status === "work-in-progress") {
        lesson.classList.add("syg-u-work-in-progress");
        const label = lesson.querySelector(".course-item-label-text");
        if (label != null) {
          label.innerHTML = "WIP";
          label.classList.remove("w-dyn-bind-empty");
        }
      } else if (data.dateUpdated) {
        const dt = new Date(data.dateUpdated);
        const time = new Date().getTime() - dt.getTime();
        const days = time / (1e3 * 3600 * 24);
        if (days <= daysRecent) {
          lesson.classList.add("syg-u-new");
          const label = lesson.querySelector(".course-item-label-text");
          if (label != null) {
            label.innerHTML = "REV";
            label.classList.remove("w-dyn-bind-empty");
          }
        }
      } else if (data.dateCreated) {
        const dt = new Date(data.dateCreated);
        const time = new Date().getTime() - dt.getTime();
        const days = time / (1e3 * 3600 * 24);
        if (days <= daysRecent) {
          lesson.classList.add("syg-u-new");
          const label = lesson.querySelector(".course-item-label-text");
          if (label != null) {
            label.innerHTML = "NEW";
            label.classList.remove("w-dyn-bind-empty");
          }
        }
      }
    });
  };
  document.addEventListener("DOMContentLoaded", initLesson);
})();
//# sourceMappingURL=lesson.js.map

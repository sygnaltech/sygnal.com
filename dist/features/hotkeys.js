"use strict";
(() => {
  // src/features/hotkeys.ts
  var Hotkeys = class {
    constructor() {
    }
    setup() {
    }
    exec() {
      window["sa5"].push([
        "hotkeys",
        (hotkeyHandler) => {
          hotkeyHandler.register("f1", () => {
            window.location.href = `/about`;
          });
          hotkeyHandler.register("f2", () => {
            window.location.href = `/u/home`;
          });
          hotkeyHandler.register("ctrl+p", () => {
            window.location.href = `/search`;
          });
          hotkeyHandler.register("ctrl+alt+shift+m", () => {
            console.log("test");
            const docsUrl = `https://www.mindomo.com/mindmap/15e2b12a299a4a929225effc1292a1dd`;
            if (docsUrl)
              window.open(docsUrl, "_blank");
          });
          hotkeyHandler.register("ctrl+alt+m", () => {
            var _a;
            let docsUrl = ((_a = document.querySelector("meta[name='page:notes:mindmap']")) == null ? void 0 : _a.getAttribute("content")) || null;
            console.log("ctrl+alt+m");
            if (docsUrl) {
              window.open(docsUrl, "_blank");
            }
          });
          hotkeyHandler.register("ctrl+alt+f", () => {
            var _a;
            console.log("ctrl+alt+f");
            var docsUrl = (_a = document.querySelector("meta[name='page:notes:folder']")) == null ? void 0 : _a.getAttribute("content");
            console.log(`docsUrl = ${docsUrl}`);
            if (docsUrl)
              window.open(docsUrl, "_blank");
          });
          hotkeyHandler.register("ctrl+alt+n", () => {
            var _a;
            console.log("ctrl+alt+n");
            var docsUrl = (_a = document.querySelector("meta[name='page:notes:mindmap']")) == null ? void 0 : _a.getAttribute("content");
            console.log(`docsUrl = ${docsUrl}`);
            if (docsUrl)
              window.open(docsUrl, "_blank");
          });
          hotkeyHandler.register("ctrl+f, shift+ctrl+f", () => {
            const dropdownToggle = document.querySelector("#menu-search .w-dropdown-toggle");
            dropdownToggle.dispatchEvent(new Event("mousedown"));
            dropdownToggle.dispatchEvent(new Event("mouseup"));
            const search = document.querySelector("#search-input");
            search.focus();
            search.click();
          });
        }
      ]);
    }
  };
})();
//# sourceMappingURL=hotkeys.js.map

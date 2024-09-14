"use strict";
(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/features/gista/gista.ts
  function initGistaAsync() {
    return __async(this, null, function* () {
      let parser = new DOMParser();
      let svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.146 82.146">
            <circle cx="31.073" cy="58.368" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="51.073" cy="58.368" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="61.073" cy="41.047" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="51.073" cy="23.727" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="31.073" cy="23.728" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="21.073" cy="41.047" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
        </svg>`;
      let svgNode = parser.parseFromString(svgString, "image/svg+xml").documentElement;
      function handleNewElement(element) {
        element.classList.add("gista-button");
        element.style.cssText = "";
        let imgChild = element.querySelector("img");
        if (imgChild) {
          imgChild.src = "https://uploads-ssl.webflow.com/59b8d49f7fdf9700017d780f/64e2bfafeccea9001016cfbe_dp_icon_white_trans.svg";
        }
        const mutationCallback = (mutationsList, observer2) => {
          for (let mutation of mutationsList) {
            if (mutation.type === "attributes") {
              if (mutation.target instanceof HTMLElement) {
                if (mutation.target.tagName == "DIV" && mutation.target.innerText == "\u2715") {
                  continue;
                }
                mutationObserver.disconnect();
                let display = mutation.target.style.display;
                mutation.target.style.cssText = "";
                mutation.target.style.display = display;
                mutationObserver.observe(element, { attributes: true, childList: true, subtree: true });
              }
            }
          }
        };
        const mutationObserver = new MutationObserver(mutationCallback);
        mutationObserver.observe(element, { attributes: true, childList: true, subtree: true });
      }
      const observer = new MutationObserver((mutationsList, observer2) => {
        for (let mutation of mutationsList) {
          if (mutation.type === "childList") {
            const addedNodes = Array.from(mutation.addedNodes);
            const targetElement = addedNodes.find((node) => "id" in node && node.id === "gista-embed-button");
            if (targetElement) {
              handleNewElement(targetElement);
              observer2.disconnect();
            }
          }
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
})();
//# sourceMappingURL=gista.js.map

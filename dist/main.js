(()=>{var n=()=>{console.log("1.2.1"),window.sa5=window.sa5||[],window.sa5.push(["hotkeys",t=>{t.register("f1",()=>{window.location.href="/about"}),t.register("f2",()=>{window.location.href="/u/home"}),t.register("ctrl+p",()=>{window.location.href="/search"}),t.register("ctrl+alt+shift+m",()=>{console.log("test");let e="https://www.mindomo.com/mindmap/15e2b12a299a4a929225effc1292a1dd";e&&window.open(e,"_blank")}),t.register("ctrl+alt+m",()=>{let e=document.querySelector("meta[name='page:notes:mindmap']")?.getAttribute("content")||null;console.log("ctrl+alt+m"),e&&window.open(e,"_blank")}),t.register("ctrl+alt+f",()=>{console.log("ctrl+alt+f");var e=document.querySelector("meta[name='page:notes:folder']")?.getAttribute("content");console.log(`docsUrl = ${e}`),e&&window.open(e,"_blank")}),t.register("ctrl+alt+n",()=>{console.log("ctrl+alt+n");var e=document.querySelector("meta[name='page:notes:mindmap']")?.getAttribute("content");console.log(`docsUrl = ${e}`),e&&window.open(e,"_blank")}),t.register("ctrl+f, shift+ctrl+f",()=>{let e=document.querySelector("#menu-search .w-dropdown-toggle");e.dispatchEvent(new Event("mousedown")),e.dispatchEvent(new Event("mouseup"));let o=document.querySelector("#search-input");o.focus(),o.click()})}])};document.addEventListener("DOMContentLoaded",n);})();
//# sourceMappingURL=main.js.map

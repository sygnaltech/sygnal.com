(()=>{var o=()=>{console.log("init main V21[] push"),window.sa5=window.sa5||[],window.sa5.push(["hotkeys",t=>{t.register("f2",()=>{window.location.href="/u/home"}),t.register("ctrl+p",()=>{window.location.href="/search"})}]),window.sa5.push(["hotkeys",t=>{t.register("ctrl+shift+e",()=>{location.href="?edit"}),t.register("ctrl+alt+shift+n",()=>{let e=document.querySelector("meta[name='sygnal:docs:fallback']")?.getAttribute("content")||null;e&&window.open(e,"_blank")}),t.register("shift+ctrl+f",()=>{window.scrollTo({top:0,behavior:"smooth"});let e=document.getElementById("menu-search");e&&e.click()}),t.register("ctrl+alt+n",()=>{var e=document.querySelector("meta[name='sygnal:docs']")?.getAttribute("content");console.log(`docsUrl = ${e}`),e?window.open(e,"_blank"):alert("No Notes Doc defined.")})}])};document.addEventListener("DOMContentLoaded",o);})();
//# sourceMappingURL=main.js.map

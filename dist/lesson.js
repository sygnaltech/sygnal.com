(()=>{var i=()=>{window.sa5=window.sa5||[],window.sa5.push(["hotkeys",o=>{o.register("ctrl+shift+e",()=>{location.href="?edit"}),o.register("ctrl+alt+shift+n",()=>{let e=document.querySelector("meta[name='sygnal:docs:fallback']")?.getAttribute("content")||null;e&&window.open(e,"_blank")}),o.register("ctrl+alt+n",()=>{var e=document.querySelector("meta[name='sygnal:docs']")?.getAttribute("content");console.log(`docsUrl = ${e}`),e?window.open(e,"_blank"):alert("No Notes Doc defined.")})}]);let l=60;document.querySelectorAll("script[type='course-info']").forEach(o=>{var e=JSON.parse(o.innerHTML);let t=o.closest(".course-item");if(t!=null){if(console.log(`status ${e.status}`),e.status==="work-in-progress"){t.classList.add("syg-u-work-in-progress");let s=t.querySelector(".course-item-label-text");s!=null&&(s.innerHTML="WIP",s.classList.remove("w-dyn-bind-empty"))}else if(e.dateUpdated){let s=new Date(e.dateUpdated);if((new Date().getTime()-s.getTime())/(1e3*3600*24)<=l){t.classList.add("syg-u-new");let n=t.querySelector(".course-item-label-text");n!=null&&(n.innerHTML="REV",n.classList.remove("w-dyn-bind-empty"))}}else if(e.dateCreated){let s=new Date(e.dateCreated);if((new Date().getTime()-s.getTime())/(1e3*3600*24)<=l){t.classList.add("syg-u-new");let n=t.querySelector(".course-item-label-text");n!=null&&(n.innerHTML="NEW",n.classList.remove("w-dyn-bind-empty"))}}}})};document.addEventListener("DOMContentLoaded",i);})();
//# sourceMappingURL=lesson.js.map

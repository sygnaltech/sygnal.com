(()=>{async function f(){let c=new DOMParser,l=`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.146 82.146">
            <circle cx="31.073" cy="58.368" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="51.073" cy="58.368" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="61.073" cy="41.047" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="51.073" cy="23.727" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="31.073" cy="23.728" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="21.073" cy="41.047" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
        </svg>`,u=c.parseFromString(l,"image/svg+xml").documentElement;function a(t){t.classList.add("gista-button"),t.style.cssText="";let r=t.querySelector("img");r&&(r.src="https://uploads-ssl.webflow.com/59b8d49f7fdf9700017d780f/64e2bfafeccea9001016cfbe_dp_icon_white_trans.svg");let o=(s,n)=>{for(let e of s)if(e.type==="attributes"&&e.target instanceof HTMLElement){if(console.log(e.target),e.target.tagName=="DIV"&&e.target.innerText=="\u2715")continue;i.disconnect();let d=e.target.style.display;e.target.style.cssText="",e.target.style.display=d,i.observe(t,{attributes:!0,childList:!0,subtree:!0})}},i=new MutationObserver(o);i.observe(t,{attributes:!0,childList:!0,subtree:!0})}new MutationObserver((t,r)=>{for(let o of t)if(o.type==="childList"){let s=Array.from(o.addedNodes).find(n=>"id"in n&&n.id==="gista-embed-button");s&&(a(s),r.disconnect())}}).observe(document.body,{childList:!0,subtree:!0})}})();
//# sourceMappingURL=gista.js.map

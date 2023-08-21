(()=>{async function g(){let c=new DOMParser,l=`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.146 82.146">
            <circle cx="31.073" cy="58.368" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="51.073" cy="58.368" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="61.073" cy="41.047" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="51.073" cy="23.727" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="31.073" cy="23.728" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="21.073" cy="41.047" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
        </svg>`,u=c.parseFromString(l,"image/svg+xml").documentElement;function a(e){e.classList.add("gista-button"),e.style.cssText="";let r=e.querySelector("img");r&&(r.src="https://uploads-ssl.webflow.com/59b8d49f7fdf9700017d780f/64e2bfafeccea9001016cfbe_dp_icon_white_trans.svg");let i=(s,n)=>{for(let t of s)if(t.type==="attributes"&&t.target instanceof HTMLElement){if(t.target.tagName=="DIV"&&t.target.innerText=="\u2715")continue;o.disconnect();let d=t.target.style.display;t.target.style.cssText="",t.target.style.display=d,o.observe(e,{attributes:!0,childList:!0,subtree:!0})}},o=new MutationObserver(i);o.observe(e,{attributes:!0,childList:!0,subtree:!0})}new MutationObserver((e,r)=>{for(let i of e)if(i.type==="childList"){let s=Array.from(i.addedNodes).find(n=>"id"in n&&n.id==="gista-embed-button");s&&(a(s),r.disconnect())}}).observe(document.body,{childList:!0,subtree:!0})}})();
//# sourceMappingURL=gista.js.map

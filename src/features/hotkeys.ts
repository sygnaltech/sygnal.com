




/*
 * Site
 */

import { IModule, Page } from "@sygnal/sse";

// import gsap from 'gsap'; 
 

export class Hotkeys implements IModule {

  constructor() {
  }

  /**
   * Setup code runs synchronously, inline, at the end of the </head>. 
   * It's used for special init tasks that must be performed early, and which do not require
   * the DOM to be loaded. 
   */
  setup() {

  }

  exec() { 

    // Global hotkeys
    window['sa5'].push(['hotkeys', 
    (hotkeyHandler: any) => {

        // Help - F1
        hotkeyHandler.register("f1", () => {
            window.location.href = `/about`;
        });

        // User home - F2
        hotkeyHandler.register("f2", () => {
            window.location.href = `/u/home`;
        });

        // Search Page - CTRL+P ctrl+f, 
        hotkeyHandler.register("ctrl+p", () => {
            window.location.href = `/search`;
        });

        // Search Page - CTRL+SHIFT+3 
        hotkeyHandler.register("ctrl+alt+shift+m", () => {
            console.log("test");

            const docsUrl = `https://www.mindomo.com/mindmap/15e2b12a299a4a929225effc1292a1dd`;

            if (docsUrl)
                window.open(docsUrl, "_blank");
            // else
            //     alert("No Notes Doc defined.");    

        });

        // Fallback Docs - CTRL+ALT+SHIFT+N
        hotkeyHandler.register("ctrl+alt+m", () => { // ,  ctrl+shift+2 

            // TypeScript
            let docsUrl: string | null = document.querySelector("meta[name='page:notes:mindmap']")?.getAttribute("content") || null;

            console.log("ctrl+alt+m"); 

            if (docsUrl) {
                window.open(docsUrl, "_blank");
            }

        });

        // CTRL+ALT+N
        hotkeyHandler.register("ctrl+alt+f", () => { // , ctrl+shift+1
            
            console.log("ctrl+alt+f"); 

            // JavaScript
            var docsUrl = document.querySelector("meta[name='page:notes:folder']")?.getAttribute("content");

        //        var docsUrl =
        //    $("meta[name='sygnal:docs']").attr("content"); 
        //       || $("meta[name='sygnal:docs:fallback']").attr("content"); 

            console.log(`docsUrl = ${docsUrl}`); 
        
            if (docsUrl)
                window.open(docsUrl, "_blank");
            // else
            //     alert("No Notes Doc defined.");           
//            window.location.href = `/search`;
        }); 

        // CTRL+ALT+N
        hotkeyHandler.register("ctrl+alt+n", () => { // , ctrl+shift+1
            
            console.log("ctrl+alt+n"); 

            // JavaScript
            var docsUrl = document.querySelector("meta[name='page:notes:mindmap']")?.getAttribute("content");

        //        var docsUrl =
        //    $("meta[name='sygnal:docs']").attr("content"); 
        //       || $("meta[name='sygnal:docs:fallback']").attr("content"); 

            console.log(`docsUrl = ${docsUrl}`); 
        
            if (docsUrl)
                window.open(docsUrl, "_blank");
            // else
            //     alert("No Notes Doc defined.");           
//            window.location.href = `/search`;
        }); 

        // Find - CTRL+F
        hotkeyHandler.register("ctrl+f, shift+ctrl+f", () => {

// console.log("ctrl+f a pressed"); 

            // $('html').animate({scrollTop: 0}, 500);
            // $("#menu-search").click(); 

            // Smooth scroll to top
//            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Toggle the dropdown
            const dropdownToggle = document.querySelector('#menu-search .w-dropdown-toggle') as HTMLElement; 
            dropdownToggle.dispatchEvent(new Event('mousedown'));
            dropdownToggle.dispatchEvent(new Event('mouseup'));

            // Give input to the search input
            const search = document.querySelector("#search-input") as HTMLElement;
            search.focus();
            search.click();

// let event = new Event('click', { bubbles: true, cancelable: true });
// let element = document.querySelector('#menu-search > .navigation-link.flex.tight > img') as Element;
// console.log("event", event);
// console.log("element", element); 
// element.dispatchEvent(event);
// element = document.querySelector('#menu-search > .navigation-link > img') as Element;
// element.dispatchEvent(event);
// element = document.querySelector('#menu-search img') as Element;
// element.dispatchEvent(event);
// element = document.querySelector('#menu-search') as Element;
// element.dispatchEvent(event);


// let event = new PointerEvent('pointerdown', {
//     bubbles: true,
//     cancelable: true,
//     pointerId: 1
// });
// let element = document.querySelector('#menu-search > .navigation-link.flex.tight > img') as Element;
// element.dispatchEvent(event);

// console.log("pointerDown");

//  element = document.querySelector('div#menu-search.dropdown.w-dropdown') as Element;
//  element.dispatchEvent(event);


// let event = new PointerEvent('click', { // 'pointerdown', {
//     bubbles: true,
//     cancelable: true,
//     pointerId: 1
// });
// let element = document.querySelector('#w-dropdown-toggle-3 div') as Element;
// element.dispatchEvent(event);

// console.log(element);
// console.log(event); 

//             // Simulate click on menu-search
//             let menuSearch = document.getElementById("menu-search");
//             if (menuSearch) {
//                 menuSearch.click();
// console.log("searching;");
//             }

    //        window.location.href = `/search`;
        });

    }]); 

  }

}


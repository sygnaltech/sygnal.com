
// ORIGIN 
// https://codepen.io/memetican/pen/yLEvrpx/cc50a552fdadbde41e0a8eeba9e95101

const init = () => {

    console.log('init main')

// Can install script if we want to
// <!-- Sygnal Attributes 5 | Hotkeys -->
// <script defer
// src="https://cdn.jsdelivr.net/gh/sygnaltech/webflow-util@5.2/dist/nocode/webflow-hotkeys.min.js"
// ></script> 


// Some site-wide

// Some page-specific
// ctrl+f
// esc
// f1
// f2

//ctrl+o open
//ctrl+n new

    window['sa5'] = window['sa5'] || {};
    window['sa5'].hotkeys = (hotkeyHandler) => {

        // User home - F2
        hotkeyHandler.register("f2", () => {
            window.location.href = `/u/home`;
        });

        // Edit - CTRL+SHIFT+E
        hotkeyHandler.register("ctrl+shift+e", () => {
            location.href = '?edit';
        });

        // Fallback Docs - CTRL+ALT+SHIFT+N
        hotkeyHandler.register("ctrl+alt+shift+n", () => {

            // TypeScript
            let docsUrl: string | null = document.querySelector("meta[name='sygnal:docs:fallback']")?.getAttribute("content") || null;

            if (docsUrl) {
                window.open(docsUrl, "_blank");
            }

        });

        // Search Page - CTRL+P
        hotkeyHandler.register("ctrl+p", () => {
            window.location.href = `/search`;
        });

        // Find - CTRL+F
        hotkeyHandler.register("shift+ctrl+f", () => {

            // $('html').animate({scrollTop: 0}, 500);
            // $("#menu-search").click(); 

            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Simulate click on menu-search
            let menuSearch = document.getElementById("menu-search");
            if (menuSearch) 
                menuSearch.click();

    //        window.location.href = `/search`;
        });

        // CTRL+ALT+N
        hotkeyHandler.register("ctrl+alt+n", () => {
            // JavaScript
            var docsUrl = document.querySelector("meta[name='sygnal:docs']")?.getAttribute("content");

        //        var docsUrl =
        //    $("meta[name='sygnal:docs']").attr("content"); 
        //       || $("meta[name='sygnal:docs:fallback']").attr("content"); 

            console.log(`docsUrl = ${docsUrl}`); 
        
            if (docsUrl)
                window.open(docsUrl, "_blank");
            else
                alert("No Notes Doc defined.");           
//            window.location.href = `/search`;
        });

    }

}

document.addEventListener("DOMContentLoaded", init)


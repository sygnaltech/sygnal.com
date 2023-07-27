
// ORIGIN 
// https://codepen.io/memetican/pen/yLEvrpx/cc50a552fdadbde41e0a8eeba9e95101

const initLesson = () => {


    // Article hotkeys
    window['sa5'] = window['sa5'] || [];
    window['sa5'].push(['hotkeys', 
    (hotkeyHandler) => {

        // Edit - CTRL+SHIFT+E
        hotkeyHandler.register("ctrl+shift+e", () => {
            location.href = '?edit';
        });

//         // Fallback Docs - CTRL+ALT+SHIFT+N
//         hotkeyHandler.register("ctrl+alt+m", () => { // ,  ctrl+shift+2 

//             // TypeScript
//             let docsUrl: string | null = document.querySelector("meta[name='page:notes:mindmap']")?.getAttribute("content") || null;

//             console.log("ctrl+alt+m"); 

//             if (docsUrl) {
//                 window.open(docsUrl, "_blank");
//             }

//         });

//         // CTRL+ALT+N
//         hotkeyHandler.register("ctrl+alt+f", () => { // , ctrl+shift+1
            
//             console.log("ctrl+alt+f"); 

//             // JavaScript
//             var docsUrl = document.querySelector("meta[name='page:notes:folder']")?.getAttribute("content");

//         //        var docsUrl =
//         //    $("meta[name='sygnal:docs']").attr("content"); 
//         //       || $("meta[name='sygnal:docs:fallback']").attr("content"); 

//             console.log(`docsUrl = ${docsUrl}`); 
        
//             if (docsUrl)
//                 window.open(docsUrl, "_blank");
//             else
//                 alert("No Notes Doc defined.");           
// //            window.location.href = `/search`;
//         }); 

//         // CTRL+ALT+N
//         hotkeyHandler.register("ctrl+alt+n", () => { // , ctrl+shift+1
            
//             console.log("ctrl+alt+n"); 

//             // JavaScript
//             var docsUrl = document.querySelector("meta[name='page:notes:mindmap']")?.getAttribute("content");

//         //        var docsUrl =
//         //    $("meta[name='sygnal:docs']").attr("content"); 
//         //       || $("meta[name='sygnal:docs:fallback']").attr("content"); 

//             console.log(`docsUrl = ${docsUrl}`); 
        
//             if (docsUrl)
//                 window.open(docsUrl, "_blank");
//             else
//                 alert("No Notes Doc defined.");           
// //            window.location.href = `/search`;
//         });

    }]);




// CTRL key change CSS flag? 
// if depressed for 250ms? 


    const daysRecent: number = 60; 

    // Find poster video overrides and apply them
    const elements = document.querySelectorAll(`script[type='course-info']`);
    elements.forEach((element) => {

        var data = JSON.parse(element.innerHTML);
      
        const lesson = element.closest(".course-item");
        if (lesson == null)
            return; // continue 

        console.log(`status ${data.status}`); 
        
        if(data.status === "work-in-progress") {
          
            lesson.classList.add("syg-u-work-in-progress");

            const label = lesson.querySelector(".course-item-label-text");
            if (label != null) {
                label.innerHTML = "WIP";
                label.classList.remove("w-dyn-bind-empty");
            }

        } else if(data.dateUpdated) {

            const dt: Date = new Date(data.dateUpdated);
            const time: number = new Date().getTime() - dt.getTime();
            const days: number = time / (1000 * 3600 * 24); 
//            console.log (`days since created ${days}`);
                        
            if (days <= daysRecent) {

                lesson.classList.add("syg-u-new"); // syg-u-updated

                const label = lesson.querySelector(".course-item-label-text");
                if (label != null) {
                    label.innerHTML = "REV";
                    label.classList.remove("w-dyn-bind-empty");
                }

            }
          
        } else if(data.dateCreated) {

            const dt: Date = new Date(data.dateCreated);
            const time: number = new Date().getTime() - dt.getTime();
            const days: number = time / (1000 * 3600 * 24); 
//            console.log (`days since created ${days}`);
            
            if (days <= daysRecent) {

                lesson.classList.add("syg-u-new"); // syg-u-updated

                const label = lesson.querySelector(".course-item-label-text");
                if (label != null) {
                    label.innerHTML = "NEW";
                    label.classList.remove("w-dyn-bind-empty");
                }

            }
          
        }

    }); 

}

document.addEventListener("DOMContentLoaded", initLesson)


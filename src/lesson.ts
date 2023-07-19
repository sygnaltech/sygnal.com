
// ORIGIN 
// https://codepen.io/memetican/pen/yLEvrpx/cc50a552fdadbde41e0a8eeba9e95101

const init2 = () => {

//    console.log('loaded')


// window['sa5'] = window['sa5'] || {};
// window['sa5'].hotkeys = (hotkeyHandler) => {
//   hotkeyHandler.register("f3", () => {
//     console.log("f3 pressed YAY!!!");
//   });
// }








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

document.addEventListener("DOMContentLoaded", init2)


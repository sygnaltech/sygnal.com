
// ORIGIN 
// https://codepen.io/memetican/pen/XWoWxNG/5f4ec4166cb4df430a34dd7b91fff206?editors=0010

export async function initGistaAsync() {

    // Create a new DOM parser to parse the SVG string
    let parser: DOMParser = new DOMParser();
    let svgString: string = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.146 82.146">
            <circle cx="31.073" cy="58.368" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="51.073" cy="58.368" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="61.073" cy="41.047" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="51.073" cy="23.727" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="31.073" cy="23.728" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
            <circle cx="21.073" cy="41.047" r="17.288" stroke-width="6" fill="none" stroke="currentColor"></circle>
        </svg>`;

    // Convert the SVG string into a DOM node
    let svgNode: Element = parser.parseFromString(svgString, 'image/svg+xml').documentElement;

    // Get the #gista-embed-button element and its img child
    // let buttonElement = document.querySelector('#gista-embed-button');

    // Define the callback function that will be called when the element is added
    function handleNewElement(element: HTMLElement): void {
        // Modify the element here
    //    console.log("New element added:", element); 
        
        element.classList.add('gista-button');
            // Remove the inline styles for width and height
        
        element.style.cssText = '';
        //    element.style.height = '';
        //    element.style.bottom = '';
        //    element.style.right = ''; 

        // Replace the img child with the new SVG node 
        // element.replaceChild(svgNode, imgChild);
        let imgChild: HTMLImageElement | null = element.querySelector('img');
        if (imgChild) {
            imgChild.src = 'https://uploads-ssl.webflow.com/59b8d49f7fdf9700017d780f/64e2bfafeccea9001016cfbe_dp_icon_white_trans.svg';
        }
                
    // <img src="https://public.gista.co/images/logo/dp_icon_white.png" alt="Button Image" style="width: 100%; height: 100%; border-radius: 9999px;">
            
        //    Webflow.require('ix2').init(); 
            
        // Set up the MutationObserver to watch the element
        const mutationCallback: MutationCallback = (mutationsList: MutationRecord[], observer: MutationObserver) => {
            for(let mutation of mutationsList) {
                // Handle different types of mutations. 
                // For this example, let's focus on attribute changes
                if (mutation.type === 'attributes') {
                    // console.log(`Attribute ${mutation.attributeName} was modified.`);
                    if (mutation.target instanceof HTMLElement) {

                        console.log(mutation.target); 

                        // Ignore X
                        if (mutation.target.tagName == "DIV" && mutation.target.innerText == '✕') {
                            continue;
                        }

                        mutationObserver.disconnect();

                        let display = mutation.target.style.display; 
                        mutation.target.style.cssText = '';
                        mutation.target.style.display = display;

                        mutationObserver.observe(element, { attributes: true, childList: true, subtree: true }); 

                    }
                }
            }
        };

        const mutationObserver: MutationObserver = new MutationObserver(mutationCallback);

        // Assuming 'element' is defined and is of type HTMLElement or Element
        // Start observing the element for attribute changes
        mutationObserver.observe(element, { attributes: true, childList: true, subtree: true });

    }

    /*
    // Create a new MutationObserver and provide the callback
    const observer = new MutationObserver((mutationsList, observer) => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const addedNodes = Array.from(mutation.addedNodes);
                const targetElement = addedNodes.find(node => node.id === 'gista-embed-button');
                if (targetElement) {
                    handleNewElement(targetElement);
                    observer.disconnect();  // Disconnect the observer if you only want to detect the element once
                }
            }
        }
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
*/ 

    // Define the type of the target element
    type TargetElement = HTMLElement & { id?: string };

    // Create a new MutationObserver and provide the callback
    const observer = new MutationObserver((mutationsList: MutationRecord[], observer: MutationObserver) => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const addedNodes: Node[] = Array.from(mutation.addedNodes);
                const targetElement: TargetElement | undefined = addedNodes.find(node => 'id' in node && node.id === 'gista-embed-button') as TargetElement;
                if (targetElement) {
                    handleNewElement(targetElement);
                    observer.disconnect();  // Disconnect the observer if you only want to detect the element once
                }
            }
        }
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });

}



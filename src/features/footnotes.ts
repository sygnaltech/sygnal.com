




/*
 * Site
 */

import { IModule, Page } from "@sygnal/sse";

// import gsap from 'gsap'; 
 

export class Footnotes implements IModule {

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

    console.log("F")

    // Counter for footnote numbers
    let footnoteCounter: number = 1;
  
    // Select all elements with the custom attribute `syg-footnotes`
    const footnoteContainers: NodeListOf<HTMLElement> = document.querySelectorAll('[syg-footnotes]');
  
    // Loop through each container
    footnoteContainers.forEach((container: HTMLElement) => {
      // Find all links within the container
      const links: NodeListOf<HTMLAnchorElement> = container.querySelectorAll('a');
  
      links.forEach((link: HTMLAnchorElement) => {
        if (link.textContent?.trim().startsWith('#')) {
          // Assign the custom class
          link.classList.add('syg-footnote');
          
          // Replace the "##" with the current counter value
          link.textContent = footnoteCounter.toString();
  
        link.setAttribute("target", "_blank"); 

          // Increment the footnote counter
          footnoteCounter++;
        }
      });
    });

  }

}


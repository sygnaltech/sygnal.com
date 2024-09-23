
/*
 * Site
 */

import { IModule, Page } from "@sygnal/sse";
import posthog from 'posthog-js'

// import gsap from 'gsap'; 
 

export class ServicesPage implements IModule {


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
    // Get the form by its ID
    const form = document.getElementById('email-form') as HTMLFormElement;

    if (form) {
        // Attach the submit event handler
        form.addEventListener('submit', (event: Event) => {
            // Locate the email input using the data-name attribute
            const emailInput = form.querySelector('[data-name="Email"]') as HTMLInputElement;

            if (emailInput) {
                // Capture the email value
                const email = emailInput.value;
                
                // Perform the logging action (e.g., using PostHog)
                posthog.identify(email); 

                // Allow the form to submit normally by NOT calling event.preventDefault()
            }
        });
    }
  }

}


/*
 * Site
 */

import { IModule, Page } from "@sygnal/sse";
import posthog from 'posthog-js'
import { Hotkeys } from "./features/hotkeys";

// import gsap from 'gsap'; 
 

export class Site implements IModule {

  featureHotkeys: Hotkeys;

  constructor() {

    this.featureHotkeys = new Hotkeys();

  }

  /**
   * Setup code runs synchronously, inline, at the end of the </head>. 
   * It's used for special init tasks that must be performed early, and which do not require
   * the DOM to be loaded. 
   */
  setup() {

    Page.loadEngineCSS("site.css"); 

    // Posthog 
    // https://us.posthog.com/project/90945/onboarding/feature_flags?step=install
    posthog.init('phc_se1bfwKVlMOkf6sVnUKlHaxEoyCuE4nUt07fyHM6yWN',
        {
            api_host: 'https://us.i.posthog.com',
            person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
        }
    )

    this.featureHotkeys.setup(); 

  }

  exec() {

    this.featureHotkeys.exec(); 


    // Put your site-level custom code here
    // it will have full access to the DOM 

    posthog.onFeatureFlags(function() {

      // feature flags should be available at this point
      if (posthog.isFeatureEnabled('alerts') ) {

          // Make alerts bar visible 
          const alertElements = document.querySelectorAll<HTMLElement>('[sse-component="alerts"]');
          alertElements.forEach((element) => {
            // Cast the Element to an HTMLElement
            element.style.display = 'block';

            console.log("color:", posthog.getFeatureFlag('alerts-color')); 

            // Style 
            // https://us.posthog.com/project/90945/experiments/51006 
            if (posthog.getFeatureFlag('alerts-color') === 'red') {
              // Do something differently for this user
              element.querySelectorAll<HTMLElement>('.alert-banner_link').forEach((e) => {
                e.style.backgroundColor = 'var(--sygnal-red-2)';
              });
            } else {
                // It's a good idea to let control variant always be the default behaviour,
                // so if something goes wrong with flag evaluation, you don't break your app.
            }

          });

      }

// alerts-style


    })

  }

}

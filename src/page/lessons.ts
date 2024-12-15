
/*
 * Site
 */

import { IModule, Page } from "@sygnal/sse";
import posthog from 'posthog-js'

// import gsap from 'gsap'; 
 

export class LessonsPage implements IModule {


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

console.log("LESSONS page.")

  }

}

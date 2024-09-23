/*
 * SITE
 * Main entry point
 * 
 * https://engine.sygnal.com/
 * 
 * ENGINE MODE
 * ?engine.mode=dev
 * ?engine.mode=prod
 * 
 */

//import { HomePage } from "./page/home";
import { RouteDispatcher } from "@sygnal/sse";
import { Site } from "./site";
import { ServicesPage } from "./page/services";

export const routeDispatcher = (): RouteDispatcher => {
    
    var routeDispatcher = new RouteDispatcher(Site);
    routeDispatcher.routes = {

        // Site pages
//        '/': HomePage,
        '/services/*': ServicesPage, 
        
        // TEST Pages

    };

    return routeDispatcher;
}


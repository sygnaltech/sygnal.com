const endpoint = {
  
    webflowAuthorize: `https://webflow.com/oauth/authorize?client_id=9434ab646a433437cef0f70dba6a15ea7071c8e88bb9c3b4b834d64eccd8f8e1&response_type=code`,

    addAccountKey: "https://eol14so2nvvpr3e.m.pipedream.net", 
    getAccount: "https://eoulx2y119m77lz.m.pipedream.net", // ?account_id

    listSites: "https://eo56mvz3ecrucu.m.pipedream.net", 

}

const sygnalAppPage = "/u/app"; 

// Initiate OAuth request to Webflow
// Sets up button

document.addEventListener("DOMContentLoaded", () => {
    // const user = getUserInfo();
    // const oAuthRedirectUrl = `https://eol14so2nvvpr3e.m.pipedream.net?account_id=${user.account_id}`;
    // console.log(oAuthRedirectUrl);

    const oAuthUrl = endpoint.webflowAuthorize;  // Assuming endpoint is globally available
    console.log(oAuthUrl);

    const installAppElement = document.getElementById("install-app") as HTMLAnchorElement;
    if (installAppElement) {
        installAppElement.href = oAuthUrl;
    }
});
  

  // OAuth Redirect
  // https://www.sygnal.com/u/app 
  
document.addEventListener("DOMContentLoaded", () => {
    console.log(window.location.pathname);
    
    // Assuming sygnalAppPage is globally available
    if (window.location.pathname === sygnalAppPage) {  
        const searchParams = new URLSearchParams(window.location.search);

        if (searchParams.has("code")) {
            completeOAuth();  // Assuming completeOAuth is globally available
        } else {
            loadAppSettings();  // Assuming loadAppSettings is globally available
        }
    }
});


// Need to translate 





//   function resetSelect($sel) {
  
//     $sel
//       .find('option')
//       .remove()
//       .end()
//       .append('<option value="">( select one )</option>')
//       .val('');
    
//   }
  

  function resetSelect(sel: HTMLSelectElement): void {
    // Remove all options
    while (sel.firstChild) {
        sel.removeChild(sel.firstChild);
    }

    // Append the default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "( select one )";
    sel.appendChild(defaultOption);

    // Set the value to an empty string
    sel.value = '';
}



function getUserInfo(): any {
    return null;
}

/*

  function loadAppSettings() {
  
    const user = getUserInfo(); 
  
    resetSelect($("#config-key")); 
    resetSelect($("#config-site"));
    
    resetSelect($("#config-app")); 
    $("#config-app").append(`<option value="counter">Counter</option>`);
  
    
    $.getJSON(`${endpoint.getAccount}/?account_id=${user.account_id}`, function(account) {
      
      console.log(account);
      
      $("[data-bind='account.name']").text(account.name); 
  
      // List of connections
  
      // config-key 
      account.keys.forEach(key => {
        $("#config-key").append(`<option value="${key}">${key}</option>`); 
      });
  
      $("#config-key").change(function() {
        
        resetSelect($("#config-site")); 
        
        const key = $(this).val();
    
        $.getJSON(`${endpoint.listSites}/?key=${key}`, function(sites) { 
  
          sites.forEach(site => { 
            $("#config-site").append(`<option value="${site._id}">${site.name}</option>`); 
          }); 
  
        });
        
  //      if (key)
        
      });
      
      // config-site 
  //    $("#config-site").append(`<option value="counter">BROJO</option>`);
      
      // config-app
  //    $("#config-app").append(`<option value="counter">Counter</option>`);
  //    $("#config-app").append(`<option value="${optionValue}">${optionText}</option>`);
      
      // generate-code
      $("#generate-code").click(function() {
      
        // code
        $("#code").html("TEST"); 
        
      });
      
    }); 
    
  }
  */
  function loadAppSettings(): void {
    const user = getUserInfo();  // Assuming getUserInfo is globally available

    // Reset the select elements
    const configKey = document.getElementById("config-key") as HTMLSelectElement;
    const configSite = document.getElementById("config-site") as HTMLSelectElement;
    const configApp = document.getElementById("config-app") as HTMLSelectElement;
    resetSelect(configKey);
    resetSelect(configSite);
    resetSelect(configApp);

    // Append option to config-app
    const option = document.createElement("option");
    option.value = "counter";
    option.textContent = "Counter";
    configApp.appendChild(option);

    fetch(`${endpoint.getAccount}/?account_id=${user.account_id}`)
        .then(response => response.json())
        .then(account => {
            console.log(account);

            // Assuming [data-bind='account.name'] is unique
            const accountNameElement = document.querySelector("[data-bind='account.name']");
            if (accountNameElement) {
                accountNameElement.textContent = account.name;
            }

            // Populate config-key
            account.keys.forEach(key => {
                const option = document.createElement("option");
                option.value = key;
                option.textContent = key;
                configKey.appendChild(option);
            });

            configKey.addEventListener("change", function() {
                const selectedKey = this.value;
                resetSelect(configSite);

                fetch(`${endpoint.listSites}/?key=${selectedKey}`)
                    .then(response => response.json())
                    .then(sites => {
                        sites.forEach(site => {
                            const option = document.createElement("option");
                            option.value = site._id;
                            option.textContent = site.name;
                            configSite.appendChild(option);
                        });
                    });
            });

            const generateCodeBtn = document.getElementById("generate-code");
            if (generateCodeBtn) {
                generateCodeBtn.addEventListener("click", function() {
                    const codeElement = document.getElementById("code");
                    if (codeElement) {
                        codeElement.innerHTML = "TEST";
                    }
                });
            }
        });
}

// Note: The resetSelect function from the previous answer will be used here.


//   function completeOAuth() {
        
//       console.group("OAuth redirect.");
      
//       const user = getUserInfo(); 
  
//     // Get querystring [code]
//       const searchParams = new URLSearchParams(window.location.search);
      
//       var conn = {
//         account_id: user.account_id,
//         code: searchParams.get('code')
//       }
  
//   //     console.log(JSON.stringify(conn,null,2)); 
      
//       // JSON package, including user data
  
//       // ONE key or many?  
//       var jqxhr = $.post( endpoint.addAccountKey, JSON.stringify(conn,null,2))
//         .done(function() {
//   //        alert( "success" );
          
//           // Remove oauth querystring key
//           window.location.replace(sygnalAppPage); // "/u/app");
          
//         })
//         .fail(function() {
//           alert( "Unable to complete setup, please message web@sygnal.com" );
//         });
  
//       console.groupEnd();
  
//   } 

function completeOAuth(): void {
    console.group("OAuth redirect.");

    const user = getUserInfo();  // Assuming getUserInfo is globally available

    // Get 'code' from the query string
    const searchParams = new URLSearchParams(window.location.search);
    const conn = {
        account_id: user.account_id,
        code: searchParams.get('code')
    };

    // Uncomment the line below if you want to log the conn object
    // console.log(JSON.stringify(conn, null, 2));

    // Make a POST request to addAccountKey endpoint
    fetch(endpoint.addAccountKey, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(conn, null, 2)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Redirect to sygnalAppPage
        window.location.replace(sygnalAppPage);  // Assuming sygnalAppPage is globally available
    })
    .catch(error => {
        alert("Unable to complete setup, please message web@sygnal.com");
        console.error('There was a problem with the fetch operation:', error.message);
    });

    console.groupEnd();
}


/*
  */


//import { WfuUserInfo, WfuUser } from 'https://localhost/src/modules/webflow-membership.js'; 

// import { WfuUserInfo, WfuUser } from 'https://cdn.jsdelivr.net/gh/sygnaltech/webflow-util@4.2/src/modules/webflow-membership.js'; 



/* OAUTH SUPPORT 

// Capture login event
$(function() {

  var membership = new WfuUserInfo({
    loadUserInfoCallback: loadUserInfoCallback,
    userInfoUpdatedCallback: userInfoUpdatedCallback,
    userLogoutPurge: userLogoutPurge
  }).init(); 
  
});  
  
// Populate with additional data 
async function loadUserInfoCallback(user) {

    const url = `https://eoszvncep8g121v.m.pipedream.net/user?email=${user.email}`;
    //        console.debug(url); 

    await $.getJSON( url, function( data ) {

//      console.debug(data); 
//      console.debug(user); 
      
      // Guaranteed (?)
      user.user_id = data.user_id;
      user.name = data.name;
      user.email = data.email;
      user.accept_communications = data.accept_communications; 
      
      // Optional (Meta)
//      user.meta.account_id = data.account_id; 
      user.meta.set("account_id", data.account_id); 

//      console.debug(user); 
      
//      user.account_id = 
//        localStorage.setItem('user', JSON.stringify(data)); 

        // https://stackoverflow.com/questions/5671451/creating-a-javascript-cookie-on-a-domain-and-reading-it-across-sub-domains

      // Save User Data as domain cookie
      // to be accessible to companion oauth function 
      const cookieName = "wfuUser";
      const cookieValue = data.user_id; // JSON.stringify(data); 
      const myDate = (new Date()).addDays(7);
      document.cookie = cookieName +"=" + cookieValue + "; expires=" + myDate 
          + "; domain=.sygnal.com; path=/";
      
    }); 
  
//  alert("load"); 
//  console.log("LOADING USER");
}

  
// Populate with additional data 
async function userInfoUpdatedCallback(user) {

  var name = user.email;
  if (user.name)
    name = user.name;
  
  $("[wfu-bind='$user.name']").text(name); 
  
} 

async function userLogoutPurge() {
  
  // Delete User Data cookie
  document.cookie = `wfuUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.sygnal.com; path=/;`;

}


*/




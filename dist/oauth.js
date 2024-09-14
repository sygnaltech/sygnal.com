"use strict";
(() => {
  // src/oauth.ts
  var endpoint = {
    webflowAuthorize: `https://webflow.com/oauth/authorize?client_id=9434ab646a433437cef0f70dba6a15ea7071c8e88bb9c3b4b834d64eccd8f8e1&response_type=code`,
    addAccountKey: "https://eol14so2nvvpr3e.m.pipedream.net",
    getAccount: "https://eoulx2y119m77lz.m.pipedream.net",
    listSites: "https://eo56mvz3ecrucu.m.pipedream.net"
  };
  var sygnalAppPage = "/u/app";
  document.addEventListener("DOMContentLoaded", () => {
    const oAuthUrl = endpoint.webflowAuthorize;
    console.log(oAuthUrl);
    const installAppElement = document.getElementById("install-app");
    if (installAppElement) {
      installAppElement.href = oAuthUrl;
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    console.log(window.location.pathname);
    if (window.location.pathname === sygnalAppPage) {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has("code")) {
        completeOAuth();
      } else {
        loadAppSettings();
      }
    }
  });
  function resetSelect(sel) {
    while (sel.firstChild) {
      sel.removeChild(sel.firstChild);
    }
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "( select one )";
    sel.appendChild(defaultOption);
    sel.value = "";
  }
  function getUserInfo() {
    return null;
  }
  function loadAppSettings() {
    const user = getUserInfo();
    const configKey = document.getElementById("config-key");
    const configSite = document.getElementById("config-site");
    const configApp = document.getElementById("config-app");
    resetSelect(configKey);
    resetSelect(configSite);
    resetSelect(configApp);
    const option = document.createElement("option");
    option.value = "counter";
    option.textContent = "Counter";
    configApp.appendChild(option);
    fetch(`${endpoint.getAccount}/?account_id=${user.account_id}`).then((response) => response.json()).then((account) => {
      console.log(account);
      const accountNameElement = document.querySelector("[data-bind='account.name']");
      if (accountNameElement) {
        accountNameElement.textContent = account.name;
      }
      account.keys.forEach((key) => {
        const option2 = document.createElement("option");
        option2.value = key;
        option2.textContent = key;
        configKey.appendChild(option2);
      });
      configKey.addEventListener("change", function() {
        const selectedKey = this.value;
        resetSelect(configSite);
        fetch(`${endpoint.listSites}/?key=${selectedKey}`).then((response) => response.json()).then((sites) => {
          sites.forEach((site) => {
            const option2 = document.createElement("option");
            option2.value = site._id;
            option2.textContent = site.name;
            configSite.appendChild(option2);
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
  function completeOAuth() {
    console.group("OAuth redirect.");
    const user = getUserInfo();
    const searchParams = new URLSearchParams(window.location.search);
    const conn = {
      account_id: user.account_id,
      code: searchParams.get("code")
    };
    fetch(endpoint.addAccountKey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(conn, null, 2)
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.replace(sygnalAppPage);
    }).catch((error) => {
      alert("Unable to complete setup, please message web@sygnal.com");
      console.error("There was a problem with the fetch operation:", error.message);
    });
    console.groupEnd();
  }
})();
//# sourceMappingURL=oauth.js.map

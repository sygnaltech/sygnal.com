"use strict";
(() => {
  // src/tools/code-formatter.ts
  var init_code_formatter = () => {
    var inputElem = document.getElementById("input");
    var outputElem = document.getElementById("output");
    var convertButtonElem = document.getElementById("convert-button");
    var copyButtonElem = document.getElementById("copy-button");
    convertButtonElem.addEventListener("click", convert);
    function convert2() {
      var input = inputElem.value;
      var output = input.replace(/</g, "&lt;");
      output = `<pre><code>${output}</code></pre>`;
      outputElem.value = output;
    }
    function convert() {
      var input = inputElem.value;
      var output = input.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      output = `<pre><code>${output}</code></pre>`;
      outputElem.value = output;
    }
    copyButtonElem.addEventListener("click", copyToClipboard);
    function copyToClipboard() {
      var output = outputElem.value;
      navigator.clipboard.writeText(output);
    }
  };
  document.addEventListener("DOMContentLoaded", init_code_formatter);
})();
//# sourceMappingURL=code-formatter.js.map

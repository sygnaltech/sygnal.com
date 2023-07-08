
// ORIGIN 
// https://codepen.io/memetican/pen/KKrXeEL/9e82942bc281b72f0c4f12cc07e730b5



const init_code_formatter = () => {



    var inputElem = document.getElementById('input') as HTMLTextAreaElement;
    var outputElem = document.getElementById('output') as HTMLTextAreaElement;
    var convertButtonElem = document.getElementById('convert-button') as HTMLButtonElement;
    var copyButtonElem = document.getElementById('copy-button') as HTMLButtonElement;

    convertButtonElem.addEventListener("click", convert);


    function convert2() {

        var input = inputElem.value;
        var output = input.replace(/</g, '&lt;');
        output = `<pre><code>${output}</code></pre>`;
        outputElem.value = output;
      //  document.getElementById('result').innerHTML = output;
    }
    
    function convert() {
        var input = inputElem.value;
        var output = input.replace(/&/g, '&amp;').replace(/</g, '&lt;');
        output = `<pre><code>${output}</code></pre>`;
        outputElem.value = output;
//        document.getElementById('result').innerHTML = output;
    }
    
    
    copyButtonElem.addEventListener("click", copyToClipboard);
    
    function copyToClipboard() {
        var output = outputElem.value;
        navigator.clipboard.writeText(output);
    }

}

document.addEventListener("DOMContentLoaded", init_code_formatter)


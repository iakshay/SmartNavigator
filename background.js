'use strict';
console.log('Hello World');
/*window.onkeydown = function(e){
    console.log('Key Press');
};

window.addEventListener("keypress", callback, false);

var callback = function(event) {
             //alert("This works")
             if (event.keyCode == 13) {
                 // This doesn't work
                 alert("This doesn't work");
             }
};*/


chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

    var options = JSON.parse(localStorage.options);
    request.value = request.value.toLowerCase();
    var splitTag = request.value.split(' ')[0];
    var splitRemainder = request.value.substring(splitTag.length+1);
    var tabs = options[splitTag];
    if(tabs !== undefined){
        tabs.forEach(function(e, i){
          if(e.indexOf('{query}') >= 0){
            e = e.split('{query}');
            e = e[0] + splitRemainder + e[1];
          }
          chrome.tabs.create({url: e});
        });
    }else{
        console.log('foo');
        chrome.tabs.create({url: 'http://google.com/search?q='+request.value});
    }
      sendResponse({farewell: "goodbye"});
 });
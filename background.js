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
var options = {
    'social' : ['http://facebook.com', 'http://google.com/plus', 'http://twitter.com/'],
    'shopping': ['http://www.amazon.com/s/?field-keywords={query}', 'http://www.ebay.in/sch/i.html?_trksid=p3907.m570.l1313&_nkw={query}&_sacat=0&_from=R40']
  };

  if (typeof localStorage.options == 'undefined'){
    localStorage.options = JSON.stringify(options);
  }else{
    options = JSON.parse(localStorage.options);
  }

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

    var options = JSON.parse(localStorage['options']);
    request.value = request.value.toLowerCase();

    var splitTag = request.value.split(' ')[0];
    var splitRemainder = request.value.substring(splitTag.length+1);

    if(!options.hasOwnProperty(splitTag)){
        console.log('foo');
        chrome.tabs.create({url: 'http://google.com/search?q='+request.value});
    }else{
        var tabs = options[splitTag];
        tabs.forEach(function(e){
            if(e.indexOf('{query}') >= 0){
                e = e.split('{query}');
                e = e[0] + splitRemainder + e[1];
            }
            chrome.tabs.create({url: e});
        });
    }
      sendResponse({farewell: "goodbye"});
 });
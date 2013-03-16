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
/*chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});*/
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.tab){
      chrome.tabs.create({url: request.tab});
      sendResponse('Success');
  	}
  });

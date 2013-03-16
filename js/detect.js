console.log('Hello from Content');
var showing = 0;
var box = document.createElement('div');
box.style.background = '#eaeaea';
box.style.border = '10px solid rgba(0,0,0, 0.4)';
box.style.borderRadius = '10px';
box.style.position = 'fixed';
box.style.width = '500px';
box.style.height = '100px';
box.style.padding = '10px';
box.style.zIndex = '1000';
box.style.display = 'block';
box.style.opacity = '0';
box.style.transition = '1.2s';
box.style.top = '30%';
box.style.left = '30%';

var form = '<form id="saythat7"><input style="line-height:75px;font:30px Arial;box-sizing:border-box;width:100%;border:0;background:#d1d1d1;padding:10px;height:75px;color:#222;" type="text" /><input type="submit" style="display:none;"/></form>';
box.innerHTML = form;
document.body.appendChild(box);

var input = document.querySelector('#saythat7 input');
window.onkeydown = function(event) {
             //alert("This works")
             console.log('got event');
             console.log(event.shiftKey, event.metaKey, event.keyCode);
             if (event.shiftKey && event.metaKey && event.keyCode === 83 && !showing) {
                 // This doesn't work
                 box.style.display = 'block';
                 showing = 1;
                 box.style.opacity = '1';
                 input.focus();
             }

             if(event.keyCode === 27 && showing){
             	box.style.opacity = '0';
             	input.value = '';
             	showing = 0;
             }

             if(event.keyCode === 13 && showing){
             	chrome.extension.sendMessage({tab: "http://iakshay.net"}, function(response) {
			  		console.log(response);
				});
             	return false;
             }
};


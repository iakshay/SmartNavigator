console.log('Hello from Content');
var showing = 0;
var box = document.createElement('div');
box.style.background = '#eaeaea';
box.style.border = '10px solid rgba(0,0,0, 0.4)';
box.style.borderRadius = '10px';
box.style.position = 'fixed';
box.style.width = '500px';
box.style.height = '66px';
box.style.padding = '10px';
box.style.zIndex = '1000';
box.style.display = 'none';
box.style.opacity = '0';
box.style.transition = '1.2s';
box.style.top = '30%';
box.style.left = '30%';
box.style.boxShadow = '2px 2px 15px 0 rgba(51, 51, 51, 0.53)';

var form = '<style>input:focus{border:0;outline:0;form{background:none !important;padding:0 !important; margin:0 !important;}</style><form id="saythat7"><input style="line-height:75px;font:30px Arial;box-sizing:border-box;width:100%;border:0;background:#d1d1d1;padding:10px;height:65px;color:#222;" type="text" x-webkit-speech /><input type="submit" style="display:none;"/></form>';
box.innerHTML = form;
document.body.appendChild(box);

var input = document.querySelector('#saythat7 input');

function fadeOut(){
	box.style.opacity = '0';
 	setTimeout(function(){
     	input.value = '';
     	showing = 0;
 	}, 1200);
}
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
         	fadeOut();
         }

         if(event.keyCode === 13 && showing){
         	chrome.extension.sendMessage({value: input.value}, function(response) {
		  		console.log(response);
			});
			box.style.display = 'none';
			box.style.opacity = '0';
         	fadeOut();
         	return false;
         }
};


//alert('proxy');
//document.getElementsByTagName('body')[0].style.opacity ='0';
var inc = document.getElementById('include');
function css_add_inline( css_code ) {
  var div = document.createElement( "div" );
  div.innerHTML = "<p>x</p><style>" + css_code + "</style>";
  document.body.appendChild(div.childNodes[1]);
}
inc.parentNode.removeChild(inc);
ad = document.querySelector('body center');
ad.parentNode.removeChild(ad);
var msg = document.querySelectorAll('body style')[1].innerHTML.substring(0,5);
css_add_inline('#'+msg+'{opacity:0 !important;display:none;}');
var flag =1;
setInterval(function(){
if(document.querySelector(msg) && document.querySelector(msg).innerHTML.length && flag){
  flag = 0;
  var m = document.querySelector(msg);
  m.parentNode.removeChild(m);
}
}, 10);

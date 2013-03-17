/* globals $ */
$(function(){
	'use strict';
	var options = {
		'social' : ['http://facebook.com', 'http://google.com/plus', 'http://twitter.com/'],
		'shopping': ['http://www.amazon.com/s/?field-keywords={query}', 'http://www.ebay.in/sch/i.html?_trksid=p3907.m570.l1313&_nkw={query}&_sacat=0&_from=R40']
	};

	if (typeof localStorage.options == 'undefined'){
		localStorage.options = JSON.stringify(options);
	}else{
		options = JSON.parse(localStorage.options);
	}


	var template = '<section class="item"><div class="col-1"><h3>Item Name</h3></div><div class="col-2"><ul></ul></div></section>';
	var t, i =1;
	$.each(options,function(key,values){
		t = template;
		$('#tags').append(t);
    	$('#tags section:nth-child('+ i +')').find('h3').html(key);
    	values.forEach(function(e, j){
    		$('#tags section:nth-child('+ i +')').find('ul').append('<li>' + e + '</li>');
    	});
    		i++;
	});		

	$('#add').click(function(){
		var count = $('#websites input').length + 1;
		$('#websites').append('<input type="text" id="w' + count + '"  placeholder="http://example.com" />')
		return false;
	});

	$('#submit').click(function(){
		var tagname = $('#newtag #tag').val();
		var websites = [];

		$('#websites input').each(function(i, e){
			if($(this).val().length)
				websites.push($(this).val());
		});
		console.log(tagname, websites);
		options[tagname] = websites;
		console.log(options);
		localStorage.options = JSON.stringify(options);
		//return false;
	});
});
/*
* Copyright (c) 2016 Yoshihiro Furudate
* Released under the MIT license
* http://opensource.org/licenses/mit-license.php 
*/

window.onload = function(){

/*
* VARIABLE DEFINITION
*/ 
        var now = new Date;
	var time = String(("0"+now.getHours()).slice(-2)) + String(("0"+now.getMinutes()).slice(-2))
	var canvas = document.getElementById("canvas");
	// var thisfile = document.getElementsByClassName("thisfile");
	var folders = document.getElementsByClassName('folder');
	var downloads = document.getElementsByClassName('downloads');
	var scroll = document.getElementById('scroll');
	var wrap = document.getElementById('wrap');
	var pre = document.getElementById('pre');
	var slideout = new Slideout({ // slideout.js
        	'panel': document.getElementById('panel'),
        	'menu': document.getElementById('menu'), 
        	'padding': 256,
        	'tolerance':70
        });
	
/*
* MAIN PROCESS
*/ 

	draw(); // canvas drawing line

        slideout.on('beforeopen', function() { // before opening sidemenu 
                document.querySelector('.fixed').classList.add('fixed-open');
                document.querySelector('.transition').classList.add('transafter');
                document.querySelector('.fixed').style.position = "fixed";
		document.getElementById('menu').style.display = "block";
		setTimeout(function(){document.getElementById('menu').style.opacity = 1;},10);
        });

        slideout.on('open', function() { // when opening sidemenu
                document.getElementById('menu').style.zIndex = 2;
        });

        slideout.on('beforeclose', function() { // before closing sidemenu
                document.querySelector('.fixed').classList.remove('fixed-open');
                document.querySelector('.transition').classList.remove('transafter');
                document.getElementById('menu').style.zIndex = 0;
		fadeOut(document.getElementById('menu'), 100);
		setTimeout(function(){document.getElementById('menu').scrollTop = 0;},100);
        });

        slideout.on('close', function() { // when closing sidemenu
                document.querySelector('.fixed').style.position = "static";
        });

        document.querySelector('.toggle-button').addEventListener('click', function() {
                slideout.toggle();
        });
        document.querySelector('.fixed').addEventListener('click', function() {
                slideout.close();
        });	

        scroll.addEventListener('click', function() {
        		scroll.style.color = "white";
        		wrap.style.color = "rgb(125,125,125)";
			pre.style.whiteSpace = "pre";
			pre.style.overflow = "scroll";
        });

        wrap.addEventListener('click', function() {
        		wrap.style.color = "white";
        		scroll.style.color = "rgb(125,125,125)";
			pre.style.whiteSpace = "pre-wrap";
			pre.style.overflow = "auto";
        });
	
	// blocksizeset
	document.getElementById('left_block').style.minHeight =  window.innerHeight - 125 + "px";
	document.getElementById('right_block').style.minHeight =  window.innerHeight - 125 + "px";

	menuOpenClose(folders);
	fadeIn(document.body, 1000); // fadein after runnning all func
	
	for(i=0; i<2; i++){
		var fina = document.getElementById("fina").textContent;
		fina = fina.slice(0,fina.indexOf("wrap")-1);
		try{
			downloads[i].addEventListener('click', function(){downloadFile(fina);});
		} catch(e){}
	}

	window.onbeforeunload = function(event){ // fadeout before jumping
  		fadeOut(document.body, 1000);
	};
	
/*
* FUNCTION DEFINITION
*/		
	// menu list open/close
	function menuOpenClose(folders){
		for(i=0; i<folders.length; i++){
                	folders[i].lastChild.addEventListener('click', function(event) {
                	        var parbox, box, boxH, copyBox, copyBoxH;
                        	parbox = event.target.parentNode;
                        	box = parbox.nextElementSibling;
                        	boxH = box.offsetHeight;
                        	copyBox = box.cloneNode(true);
                        	box.parentNode.appendChild(copyBox);
                        	copyBox.style.cssText = "display:block; height:auto; visibility:hidden; " ;
                        	copyBoxH = copyBox.offsetHeight;
                        	box.parentNode.removeChild(copyBox);
                        	if(boxH < 1){
                                	box.style.display = "block";
                                	slideDown(box,boxH,copyBoxH);
                        	} else {
                               		slideUp(box,boxH,copyBoxH);
                        	}
				return box,boxH,copyBoxH
       			});
			
            	}
	}

       	// animation of slidedown 
        function slideDown(box,boxH,copyBoxH){
		var slideDown_timer;
                if (boxH < copyBoxH) {
                	boxH = boxH + 20;
                        box.style.height = boxH + "px";
                        slideDown_timer = setTimeout(function(){slideDown(box,boxH,copyBoxH)}, 2.5);
                } else {
                        clearTimeout(slideDown_timer);
                        box.style.minheight = copyBoxH;
			box.style.height = "auto";
                }
        }

	// animation of slideup
        function slideUp(box,boxH,copyBoxH){
		var slideUp_timer;
                if (boxH >= 1) {
                  	boxH = boxH - 20;
                        box.style.height = boxH + "px";
                        slideUp_timer = setTimeout(function(){slideUp(box,boxH,copyBoxH)}, 2.5);
                } else {
                        clearTimeout(slideUp_timer);
                        box.style.height = 0;
                        box.style.display = "none";
                }
        }
	
	// fadein
	function fadeIn(element, time, callback) {
		var fadeTime = (time) ? time : 400;
        	var keyFrame = 30;
        	var stepTime = fadeTime / keyFrame;
        	var maxOpacity = 1;
        	var stepOpacity = maxOpacity / keyFrame;
        	var opacityValue = 0;
        	var sId = '';

    		if (!element){ return; }
		if (element.getAttribute('data-fade-stock-display') !== undefined && element.getAttribute('data-fade-stock-display') !== null) {
       			 	element.style.display = element.getAttribute('data-fade-stock-display');
    		}
 
    		var setOpacity = function(setNumber) {
        		if ('opacity' in element.style) {
            			element.style.opacity = setNumber;
        		} else {
            			element.style.filter = 'alpha(opacity=' + (setNumber * 100) + ')';
 				if (navigator.userAgent.toLowerCase().match(/msie/) && !window.opera && !element.currentStyle.hasLayout) {
                			element.style.zoom = 1;
            			}
        		}
    		};
 
    		if (!callback || typeof callback !== 'function') {
        		callback = function() {};
    		}
 
    		setOpacity(0);
 
   		sId = setInterval(function() {
        		opacityValue = Number((opacityValue + stepOpacity).toFixed(12));
        		if (opacityValue > maxOpacity) {
            			opacityValue = maxOpacity;
            			clearInterval(sId);
        		}
        		setOpacity(opacityValue);
       			if (opacityValue === maxOpacity) {
            			callback();
        		}
    		}, stepTime);
 		return element;
	}

	// fadeout
	function fadeOut(element, time, callback) {
    		var fadeTime = (time) ? time : 400;
        	var keyFrame = 30;
        	var stepTime = fadeTime / keyFrame;
        	var minOpacity = 0;
        	var stepOpacity  = 1 / keyFrame;
        	var opacityValue = 1;
        	var sId = '';
 
    		if (!element){ return;}
    		element.setAttribute('data-fade-stock-display', element.style.display.replace('none', ''));
 
    		var setOpacity = function(setNumber) {
        		if ('opacity' in element.style) {
            			element.style.opacity = setNumber;
        		} else {
            			element.style.filter = 'alpha(opacity=' + (setNumber * 100) + ')'; 
            			if (navigator.userAgent.toLowerCase().match(/msie/) && !window.opera && !element.currentStyle.hasLayout) {
                			element.style.zoom = 1;
            			}
        		}
    		};
 
    		if (!callback || typeof callback !== 'function') {
        		callback = function() {};
    		}
		
    		setOpacity(1);
    		sId = setInterval(function() {
        		opacityValue = Number((opacityValue - stepOpacity).toFixed(12));
        		if (opacityValue < minOpacity) {
            			opacityValue = minOpacity;
           			element.style.display = 'none';
            			clearInterval(sId);
       			}
 			setOpacity(opacityValue);
        		if (opacityValue === minOpacity) {
            			callback();
        		}
    		}, stepTime);
 
    		return element;
	}

	// download func
	function downloadFile(filename){
                if (window.confirm('本当にこのソースコードファイルをダウンロードしますか？\nAre you really download this source code file?')) {
                	var codetext = document.getElementsByClassName("codetext");
                        var content = "";
                        for(i=0; i<codetext.length; i++){
                                content += (codetext[i].textContent + "\n")
                        }
                        var blob = new Blob([ content ], { "type" : "text/plain" });
                        if (window.navigator.msSaveBlob) { // IEとEdge
                                window.navigator.msSaveBlob(blob, filename);
                        } else {
                                var objectURL = window.URL.createObjectURL(blob);
                                var link = document.createElement("a");
                                document.body.appendChild(link);
                                link.href = objectURL; link.download = filename; link.click();
                                document.body.removeChild(link);
                                setTimeout(function(){window.URL.revokeObjectURL(objectURL)}, 50000);
                        }
                }
                return false;
        }

}

/*
* ** RESIZING ACTION
*/

var time = false;
var ua = navigator.userAgent.toUpperCase();
var situation = ua.indexOf('IPHONE') != -1 || (ua.indexOf('ANDROID') != -1 && ua.indexOf('MOBILE') != -1);

if(!situation){ // if no MOBILE
	window.addEventListener('resize', function (event) {
		if (time !== false) {
        		clearTimeout(time);
    		}
		time = setTimeout(draw, 1000 );
	});
}

/*
* ** GLOBAL FUNCTION
*/
// drawing canvas	
function draw(){
        var canvas = document.getElementById('canvas');
        var canvasWidth = Math.ceil(window.outerWidth/100)*100;
        var canvasHeight = Math.ceil(window.outerHeight/100)*100;
        canvas.width  = canvasWidth;
        canvas.height = canvasHeight;
        if (canvas.getContext){
		var ctx = canvas.getContext('2d');
                var cty = canvas.getContext('2d');
                for(i = 0; i < Math.round(canvasWidth/80); i++){ // you can change the drawing line times 
                	ctx.beginPath();
                        var ctxwidth = Math.floor(Math.random()*(6-2)+2);
                        var ctxpoint = Math.random()*canvasWidth;
                        var gradx = ctx.createLinearGradient(ctxpoint-ctxwidth/2, 0, ctxpoint+ctxwidth/2, 0);
                        gradx.addColorStop(0, "#00ACC0");
                        gradx.addColorStop(0.3, "#00E5FF");
                        gradx.addColorStop(0.5, "#64F2FF");
                        gradx.addColorStop(0.7, "#00E5FF");
                        gradx.addColorStop(1, "#00ACC0");
                        ctx.strokeStyle = gradx;
                        ctx.lineWidth = ctxwidth;
                        ctx.moveTo(ctxpoint, 0);
                        ctx.lineTo(ctxpoint, canvasHeight);
                        ctx.stroke();
                }
                for(i = 0; i < Math.round(canvasHeight/80); i++){ // you can change the drawing line times 
                	cty.beginPath();
                        var ctywidth = Math.floor(Math.random()*(6-2)+2);
                        var ctypoint = Math.random()*canvasHeight;
                        var grady = cty.createLinearGradient(0, ctypoint-ctywidth/2, 0, ctypoint+ctywidth/2);
                        grady.addColorStop(0, "#00ACC0");
                        grady.addColorStop(0.3, "#00E5FF");
                        grady.addColorStop(0.5, "#64F2FF");
                        grady.addColorStop(0.7, "#00E5FF");
                        grady.addColorStop(1, "#00ACC0");
                        cty.strokeStyle = grady;
                        cty.lineWidth = ctywidth;
                        cty.moveTo(0, ctypoint);
                        cty.lineTo(canvasWidth, ctypoint);
                        cty.stroke();
        	}
	}
}

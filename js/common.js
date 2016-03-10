
function toggleHamburgerMenu(){
  var navbar = document.querySelector('.navbar')
  navbar.classList.toggle('mobile-nav');
}

// easing function http://goo.gl/5HLl8
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) {
		return c/2*t*t + b
	}
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

window.onload = function() {

	var frontpageButton = document.querySelector("#front-down-page-arrow")
		closebutton = document.getElementById("popup-close-link");


	if(frontpageButton) {
		frontpageButton.addEventListener("click",function () {
			var pageHeight 	= window.innerHeight;
			var newPos 		= document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
			var startPos 	= newPos;

			var step 		= 0;
	    	var start    	= startPos;
	    	var change		= pageHeight - newPos;
	    	var duration 	= 180;

			var timeout;
			var amount;
			
			animate();

			function animate(){
	            if (step >= duration)
	            	return;

	            setTimeout(function(){

			    	amount = Math.easeInOutQuad(step, start, change, duration);

			    	document.documentElement.scrollTop = amount;
				    document.body.parentNode.scrollTop = amount;
				    document.body.scrollTop = amount;

	            	animate();

	            }, 1);

				step++;
			}
		},false);
	}

	// document.getElementById('campaign-popup').onclick = function(e) {
	//     if(e.target != document.getElementById('content-area')) {
	//         document.getElementById('content-area').innerHTML = 'You clicked outside.';          
	//     } else {
	//         document.getElementById('content-area').innerHTML = 'Display Contents';   
	//     }
	// }

	if(closebutton) {
		closebutton.addEventListener("click",function(e){
		    closebutton.parentElement.parentElement.parentElement.parentElement.style.display = 'none'; 
		},false);
	}
}
"use strict";

// when first adding "use strict" the console threw the error: "Uncaught ReferenceError: i is not defined"
// this was fixed by declaring i as a variable like so: var i = 0

function createBubble() {
  const bubble = document.createElement("div");
  bubble.setAttribute("class", "bubble");

  const size = Math.round(Math.random() * 100 + 1);

  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.top = (window.innerHeight - size) + "px";
  bubble.style.left = (Math.round(Math.random() * (window.innerWidth + size) + 1)) + "px";

  document.body.appendChild(bubble);

  const speed = Math.round(Math.random() * 10 - 15);
  const direction = Math.round(Math.random() * 20 - 10);

  const moveInterval = setInterval(function() {
  	var newTop = parseInt(bubble.style.top) + speed;
  	var newLeft = parseInt(bubble.style.left) + direction;
  	bubble.style.top = newTop + "px";
  	bubble.style.left = newLeft + "px";

  	if (newTop < -100  ||
  		newLeft < -100 ||
  		newLeft > window.innerWidth) {
  		window.clearInterval(moveInterval);
  	}
  });
}

function showText() {
	var text = document.getElementsByTagName('p')[0];
	var studentName = "Gunnar";
	text.innerHTML += ", " + studentName + "!";
	text.style.opacity = 1;
}

window.onload = function() {
	const button = document.querySelector("#btn");

	button.addEventListener("click", function() {
		button.style.display = "none";
		for (var i = 0; i < 100; i++) {
			createBubble();
		}

		showText();
	});
};





















// Researching in JS ANSWERS



// 1) Shuffle
		
//		Code: 

		//var str = "word";
		//var shuffled = str.split('').sort(function(){return 0.5-Math.random()}).join('');

//		Link: http://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript



// 2) Common Test

//		Name: FizzBuzz Test

//		Code: understandable version 
		
		//for (var i = 1; i <= 100; i++) {
			//var isDividibleByThree = i % 3 === 0;
			//var isDivisibleByFive = i % 5 === 0;

			//if (isDividibleByThree && isDivisibleByFive) {
				//console.log('FizzBuzz');
			//}
			//else if (isDividibleByThree) {
				//console.log('Fizz');
			//}
			//else if (isDivisibleByFive) {
				//console.log('Buzz');
			//}
			//else {
				//console.log(i);
			//}
		//}

//		Link: http://wiki.c2.com/?FizzBuzzTest

//		Code: Paul Irish version 
		
		//for (var i = 1; i <= 100; i++) {
		  //var f = i % 3 == 0, b = i % 5 == 0;
		  //console.log(f ? b ? "FizzBuzz" : "Fizz" : b ? "Buzz" : i);
		//}

//		Link: https://gist.github.com/jaysonrowe/1592432



// 3) Email Validation --NOTE: (I decided to find a method that did NOT use a regex)

//     Code:

		// function validateEmail() {
		// 	var addressIsLegal = true;
		// 	var eEntered = document.getElementById("address").value;
		// 	// test if the index of the illegal space character is anything other than -1, 
		// 	// if so it means it is in there somewhere and is not valid
		// 	if (eEntered.indexOf(" ") !== -1) {
		// 		addressIsLegal = false;
		// 	} 
		// 	// test wether "@" is at the beginning of the address, if so illegal
		// 	// test whether there are fewer than 4 characters following the character,
		// 	// since there must be at least 1 character for the domain name plus a dot,
		// 	// plus at least 2 characters for the extension, fewer than 4 characters 
		// 	// following the "@" would be illegal
		// 	if (eEntered.indexOf("@") < 1 || eEntered.indexOf("@") > eEntered.length - 5) {
		// 		addressIsLegal = false; 
		// 	}
		// 	// test whether there is at least 1 character between the dot and the "@"
		// 	// test whether there are at least 2 characters following the dot 
		// 	if (eEntered.indexOf(".") - eEntered.indexOf("@") < 2 || eEntered.indexOf(".") > eEntered.length - 3) {
		// 		addressIsLegal = false;
		// 	}
		// 	if (addressIsLegal === false) {
		// 		alert("Please correct email address");
		// 		return false;
		// 	}
		// }

//     Link: (BOOK) A Smarter Way to Learn JavaScript, chapter 86, page 281



// 4) Window Outer Width 

//     Info: Browser Compatibility 

	// Chrome: 1, 	
	// Firefox (Gecko): 1.0 (1.7 or earlier),
	// Internet Explorer: 9,
	// Opera: 9,
	// Safari: 3

//     Link: https://developer.mozilla.org/en-US/docs/Web/API/Window/outerWidth


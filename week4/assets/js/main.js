console.log("main.js");

// scope and parameters
// parameters and global variables can have the same name w/o overwriting each other, since parameters are local to their functions  
// however, if they DO have the same name, you wont 

// function listStudents(studentArray) {
// 	studentArray.pop();
// 	console.log("parameter version");
// 	console.log(studentArray);

// 	for (var i = studentArray.length - 1; i >= 0; i--) {
// 		console.log(studentArray[i]);
// 	}
// }

// var studentArray = [
// 	"Kelsey",
// 	"Atiya",
// 	"Gunnar",
// 	"Doug"
// ];

// console.log("Global");
// console.log(studentArray);
// listStudents(studentArray);









// when JS reads a file, it reads it twice 
// the first time, it grabs all var names and certain types of functions, and brings them to the top of the file (or theri parent function)
// it does this, so it wont throw an error if you call something before its declared 
// but it will still throw it as undefined



// console.log(puppies);

// var puppies = [
// 	"Lassie",
// 	"Air Bud",
// 	"Rin Tin Tin",
// 	"Balto"
// ];




// hoisting and functions 

// fucntions are complicated
// there are 2 diff ways of declaring a function 

	// function ETPhoneHome() {
	// 	console.log("home");
	// }

	// var ETPhoneCali = function() {
	// 	console.log("cali");
	// }

// the first way stays the same 
// the second way the var is hoisted to the top first

// best practice is to pick one way to write functions and stick with it












// Closures
// closures are just a function inside a function
// closures have 
// closures have access to a reference to the parent functions vars, not hte actual vars themselves

// function createButtons(text) {
// 	var markAll = document.createElement("button");
// 	markAll.innerHTML = text;
// 	document.body.appendChild(markAll);

// 	markAll.addEventListener("click", function() {
// 		var successText = "Success!";
// 		markAllComplete(successText);
// 	});
	
// 	return true;

// 	// returning will stop the parent function but still allow the children functions to run 

// 	function markAllComplete(passedText) {
// 		console.log("all is complete");
// 		console.log(successText);
// 	}
// }

// console.log(createButtons("mark all complete"));




// modular pattern
// a way of using closures to hide vars and functions that are irrelevant to the rest of your code 
// it can be called outside of itself, or be setup to call itself, just like any other function
// this pattern is the basis for the idea of inheritance 

var beer = (function() {

	var publicBeer = {};

	function makeBeer(ingredients) {
		ingredients = ingredients || {
			hops: [],
			malts: [],
			waterSource: []
		};
		console.log("Beer Malts: " + ingredients.malts);
	}

	function brewLager() {
		makeBeer({
			hops: ["Czech Saaz"],
			malts: [
				"great Western",
				"pilsner malt"
			],
			yeast: ["pilsner lager"],
			waterSource: ["tap"]
		})
	}

	publicBeer.makeBeer = makeBeer;


	return publicBeer;
})();


var kentIngredients = {
	hops: [
		"Kent Golding hops"
	],
	malts: [
		"pale malt",
		"roasted barley",
		"dark crystal malt",
		"chocolate malt",
		"light crystal malt"
	],
	yeast: [
		"Wyeast 1318"
	],
	waterSource: [
		"spring"
	]
}

beer.makeBeer(kentIngredients);





















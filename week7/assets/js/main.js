console.log("week7");

// ES6

// let
// traditional Lexical scope

// function myFunction() {
// 	var myName = "Gunnar";
// }
// will throw an error
// console.log(myName);

// var person = true;
// if (person === true) {
// 	var newName = "Bryan";
// }
// console.log(newName);



// //for loops and let 
// //with var 
// for (var i = 0; i < 10; i++) {
// 	console.log(i);
// }

// console.log('outside loop', i);

// for (let j = 0; j < 10; j++) {
// 	console.log(j);
// }

// console.log('outside loop', j);


// const 
// this keyword is similar to var, as well
// const lets us make a variables value "read only"

const API_KEY = "kldgjaoisgh0283r23";

console.log(API_KEY);

// API_KEY = "new stuff";

console.log(API_KEY);









// template strings and template literals
// old way of concatenating strings and vars
// var fName = "Gunnar";
// var lName = "Normand";
// var age = 25;
// var info = "Student's name is " + fName + " " + lName + ", and they are " + age + " years old.";

// console.log(info);

//new way with template literals
// surround strings in backticks instead of quotes

// const multiLineString = `Gunnar
// 			this is a new line	`;

// console.log(multiLineString);

//  // allows us to do cool small things like multi line strings
// // also allows for much easier string concatenation

// const fName = "Gunnar";
// const  lName = "Normand";
// const age = 25;
// const info = `Student's name is ${fName} ${lName}, and they are ${age} years old.`;

// console.log(info);



// Shortened methods and in objects
// there is a new shorter way of writing methods (functions) 
// inside of objects

// old way
var croft = {
	firstName: "Lara",
	lastName: "Croft",
	sayName: function() {
		console.log(`Hi I'm ${this.firstName} ${this.lastName}.`);
	}
}
croft.sayName();

//new way
var drake = {
	firstName: "Nathaniel",
	lastName: "Drake",
	sayName() {
		console.log(`Hi I'm ${this.firstName} ${this.lastName}.`);
	}
}

drake.sayName();











// arrow functions 
// new way to write functions, with a bit of diff functionality and scope

//example of a very basic arrow fuction
var add = (a, b) => {
	return a + b;
}


//can be simplified more:
// bc this function only returns somthing,
// we can remove the word return - this is called an "implicit return"
// can also get rid of the brackets {}

var add = (a, b) => a + b;


// quick side note for ternary statements
// ternary statement is a shorter version of an if statement

if (croft.firstName === "Lara") {
	console.log("Tomb Raider");
} else {
	console.log("Imposter");
}
console.log(croft.firstName === "Lara" ? "Tomb Raider" : "Imposter");



// !!! drawbacks of arrow functions

// they dont bind their own version of the 'this' keyword
// old way
var person = {
	name: "Gunnar",
	sayName: function() {
		console.log("Hi, I'm " + this.name);
	}
}

person.sayName();

// es6 way 
// arrow functions keep the same scope as their surrounding code, rather than changing their scope 
// like a traditional function would
// these dont have the same flexible version of scope, they always use the scope of their parent code.

var person2 = {
	name: "Amanda",
	sayName: () => {
		// console.log(`Hi, I'm ${this.name}`);
		console.log(this);
	}
}
person2.sayName();

//in order to access 'this' as our object, and thus to have 
// access to the properties inside of the object (ex. this.name), we need a traditional 
// function so we have a traditional scope

var person3 = {
	name: "Gunnar",
	sayName() {
		console.log(`Hi, I'm ${this.name}.`);
	}
}

person3.sayName();

//downfalls of arrow functions (cont) 
// arrow functions are always anonymous, so you
// cant name them unless you make them a method or the
// definition of a variable
// theyre really useful for non-method functions (for things like forEach)
// they give us better control over some functions than traditional function would




var person = {
	name: "Amanda",
	hobbies: ["computers", "knitting", "singing"],
	showHobbies: function() {
		var name = this.name;
		this.hobbies.forEach(function(hobby){
			console.log(name + ' likes ' + hobby);
		});
	}
}

person.showHobbies();


var person2 = {
	name: "Kenneth",
	hobbies: ["whatever", "you know", "that's good"],
	showHobbies: function() {
		this.hobbies.forEach( hobby => {
			console.log(`${this.name} likes ${hobby}`);
		});
	}
}

person2.showHobbies();






// rest parameters
// we can view things like the parameters passed into a function, in es5 with a keyword 'arguments'
// old way 

var sum = function() {
	console.log(arguments)
}

sum(2, 3, 4, 5);

// above is written as a traditional function for a reason 
// arrow functions dont have a sense of their own parameters


// var sum = function() {
// 	var result;
// 	return arguments.map(function(num) {
// 		result = result + num;
// 	});
// }
// console.log(sum());

//throws error bc arguments is not an Actual array
// to make this work, we have quite a few changes to make


var sum = function() {
	return Array.prototype.map.call(arguments, 
		num => {
		return num + 2;
	});
}
console.log(sum(1, 2, 3, 4, 5));








// there is an easier way with Rest Parameters

var sum = function(...args) {
	return args;
}

console.log(sum(1,2,3,4,5));







var sum = function(...args) {
	return args.map(num => {
		return num + 2;
	});
}

console.log( sum(1,2,3,4,5) );



var multiply = function(mul, ...numbers) {
	return numbers.map(num => {
		return mul * num;
	});
}

console.log(multiply(2,12,11,100,50));











//Spread operators 
// the opposite of Rest Parameters, but uses same syntax
// allows you to say that an array shoulld be split into individual parameters

// var max = Math.max(2, 5, 8, 3);

// console.log(max);

var numbers = [2, 3, 8, 5];
var max = Math.max(numbers);
console.log(max);

//wont work bc math.max wont work on an array

// old way - 'apply' expects arguments will be coming through as an array

max = Math.max.apply(null, numbers);
console.log(max);


//new es6 way using spread operators

max = Math.max(...numbers);

console.log(max);

console.clear();


// can be used to concatenate arrays as well

var moreNumbers = [12, 10, 45, 6];

// old way
var concatArray = moreNumbers.concat(numbers);
console.log(concatArray);


//new es6 way

var moreNumber = [12, 10, 45, 6, ...numbers];
console.log(moreNumber);

var letterArray = ['A', 'B', 'C'];
var newLetters = ['D', 'E', 'F', ...letterArray, ...numbers, 'G', 'H'];
console.log(newLetters);








































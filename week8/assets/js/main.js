console.log("week 8 notes");

var person = {
	name: "Kelsey",
	age: 23,
	hobbies: ["photography", "hiking", "exploring"]
}

// old way to access keys inside objects
// person.name
// person["age"]


// Destructuring
// A new way for us to extract data from arrays and objects, 
// and to pick and choose the values that we want. 

var {age: personAge} = person;
// make a variable called personAge that is the value of "age" in the object person

console.log(personAge);

// there are shorthand ways to write this

// 1. use the key without setting a new var 
// - you're actually making a var in this scope that uses the same name as the key

var {age} = person;
console.log(age);

// 2. use to grab multiple keys at once and rename them if u so choose

var {age, hobbies: studentHobbies} = person;
console.log(age);
console.log(studentHobbies);

// 3. Bracket Notation
// lets us use vars to gran values of keys inside an object
// however we MUST give it a new variable name for the value
var studentAge = "age";

var {[studentAge]: currentStudentAge} = person;
console.log(currentStudentAge);

// Destructuring with an array 

var crew = ["Luke", "Leia", "Han", "Chewie", "R2D2", "C3PO"];

// Old way of grabbing items from an array

// var firstMember = crew[0];
// var secondMember = crew[1];

// new way of grabbing items from an array using destructuring 
// NOTE use square brackets for arrays 
// var [firstMember, secondMember] = crew;

// bc this is all we sent thru JS assumes we are starting at index 0, 
// and grabbing index 0 and index 1 and  name them accordingly 
// console.log(firstMember, secondMember);

// we want to grab luke, leia, and chewie, but not han, add commas for skipped items in array
var [firstMember, secondMember,,fourthMember] = crew;
console.log(fourthMember);

// using rest parameters in a destructuring expression

var [firstMember, secondMember, ...theRest] = crew;

console.log(theRest);


// adding keys to objects with destructuring 

// old way
function createSword() {
	var length = Math.floor(Math.random() * 3 + 1);
	var minDamage = Math.ceil(Math.random() * (25 * length-1));
	var maxDamage = Math.ceil(Math.random() * (25 * length));
	var damage = Math.floor(Math.random() * (maxDamage - minDamage + 1) + minDamage);

	var sword = {
		length: length,
		damage: damage
	}

	return sword;
}

//new way ES6 with 
function createSword() {
	var length = Math.floor(Math.random() * 3 + 1);
	var minDamage = Math.ceil(Math.random() * (25 * length-1));
	var maxDamage = Math.ceil(Math.random() * (25 * length));
	var damage = Math.floor(Math.random() * (maxDamage - minDamage + 1) + minDamage);

	var sword = {
		length,
		damage,
		name: "Excalibur"
	}

	return sword;
}

console.log(createSword());





console.clear();


// FINAL PROJECT





// parent class example
var DefaultForm = {
	name: "Other",
	fields: [
		name: {
			label: "Name:",
			type: "text",
		},
		rating: {
			label: "Rating",
			type: "Select",
			options: [
				"1: Hated it",
				"2: It was ok",
				"etc..."
			]
		},
		again: {
			label: "Would experience again?",
			type: "radio",
			options: [
				"yes",
				"no"
			]
		}
	]
}

//child class example
var CocktailForm = Object.create(DefaultForm);
CocktailForm.fields.alcohol = {
	label: "Alcohol",
	type: "select",
	options: [
		"Gin",
		"Vodka",
		"Rum"
	]
};
CocktailForm.fields.again.label = "Would drink again?";

// loop through the fields to create form inputs using an if statement 

var input; 
 if (type = 'text') {
 	input = document.createElement("input");
 	input.setAttribute('type', 'text');
 } else if (type = "select") {
 	input = document.createElement("select");
 	for (let i = 0; i < selectOptions.length; i++) {
 		var option = document.createElement("option");
 		option.innerHTML = selectOptions[i];
 		input.appendChild(option);
 	}
 }










































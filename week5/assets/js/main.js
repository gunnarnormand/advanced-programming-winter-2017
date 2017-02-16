console.log("week5");

// inheritance

// classes capitalize the first Letter

// basic inheritance example 

// var ParentClass = function(name) {
// 	this.parentVar = "Hello";
// 	this.parentFunction = function() {
// 		return this.parentVar + ', ' + name + '.';
// 	}
// }

// var parentInstance = new ParentClass('Gunnar');

// console.log(parentInstance);
// console.log(parentInstance.parentFunction());





// var ParentClass = function() {
// 	this.parentVar = 'Hello';
// 	this.parentFunction = function(name) {
// 		return this.parentVar + ', ' + name + '.';
// 	}
// }


// var ChildClass = function() {
// 	this.childVar = 'Goodbye';
// 	this.childFunction = function(name) {
// 		return this.childVar + ', ' + name + '.';
// 	}
// }



// ChildClass.prototype = new ParentClass();
// console.dir(ChildClass);

// var childInstance = new ChildClass();

// console.log(childInstance.childVar);

// console.log(childInstance.parentFunction('Gunnar'));
// console.log(childInstance.childFunction('Gunnar'));





// 3 types of Inheritance:
// 1. Functional - function based
// 2. Prototypal - object based
// 3. Pseudo-Classical - prototype chain based (like first ex.)










// 1. Functional Inheritance
// main differences are that you dont use the 'new' keyword
// and you use an object to return public data (instead of 'this')

// var Vamp = function(options) {
// 	var publicVar = options || {};

// 	publicVar.getName = function() {
// 		return options.name + ' The Great';
// 	}

// 	publicVar.getAge = function() {
// 		return options.age;
// 	}

// 	publicVar.getVampInfo = function() {
// 		return 'Vamp Name: ' + publicVar.getName() + ', ' + 'Vamp Age: ' + publicVar.getAge();
// 	}

// 	return publicVar;
// }

// var angel = Vamp({
// 	name: "Angel",
// 	age: 350
// });

// console.log(angel.getVampInfo());


// var BabyVamp = function(options) {
// 	var publicVar = Vamp(options);

// 	publicVar.getBabyVampInfo = function() {

// 		return publicVar.getVampInfo() + ', ' + 'Fave Blood Type: ' + options.faveBloodType + ', ' + 'Super Powers: ' + options.powers;
// 	}

// 	publicVar.getName = function() {
// 		return options.name + ' The Feared';
// 	}

// 	return publicVar;
// }

// var spike = BabyVamp({
// 	name: 'Spike',
// 	age: 130,
// 	faveBloodType: 'AB+',
// 	powers: ['Super Strength']
// });

// console.log(spike.getName());
// console.log(spike.getBabyVampInfo());














// 2. Prototypal Inheritance
// main difference is instead of using functions, you use objects, and instead of using 'new' you
// use Object.create();


// var Edward = {
// 	name: "Edward",
// 	age: 110,
// 	getName: function() {
// 		return this.name;
// 	},
// 	getVampInfo: function() {
// 		return "Vamp name: " + this.getName() + ", age: " + this.age;
// 	}
// }

// console.log(Edward.getVampInfo());



// var Bella = Object.create(Edward);
// // console.log(Bella.name); this would return Edward not Bella


// Bella.name = "Bella";
// Bella.age = 18;
// Bella.faveBloodType = "O-";
// Bella.getBabyVampInfo = function() {
// 	return Bella.getVampInfo() + ", Fave Blood Type: " + Bella.faveBloodType;
// }

// console.log(Bella.getBabyVampInfo());















// 3. Pseudo-Classical Inheritance
// main differences are that it uses the "new" keyword and uses
// the .prototype property to link the classes, and it assigns  
// properties to 'this' instead of a returned variable
// dont call the parent each time, write so parameters are available 
// to our methods 


var Vamp = function(options) {
	this.name = options.name;
	this.age = options.age;
	this.getName = function() {
		return this.name;
	}

	this.getVampInfo = function() {
		return "Vamp Name: " + this.getName() + ", age: " + this.age;
	}
}


var bill = new Vamp({
	name: "Bill",
	age: 150
});


console.log(bill.getVampInfo());



var BabyVamp = function(options) {
	this.name = options.name;
	this.age = options.age;
	this.faveBloodType = options.faveBloodType;
	this.getBabyVampInfo = function() {
		return this.getVampInfo() + ", Fave Blood Type: " + this.faveBloodType;
	}
}
BabyVamp.prototype = new Vamp({});

var jessica = new BabyVamp({
	name: "Jessica",
	age: 21,
	faveBloodType: "A+"
});

console.log(jessica.getVampInfo());
console.log(jessica.getBabyVampInfo());


 



















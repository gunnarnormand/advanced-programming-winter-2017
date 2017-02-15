console.log('prototypal.js:');
// Gunnar Normand 
// Week 5 Homework 



// 2. Prototypal Inheritance 

var Vehicle = {
	name: "Car", 
	getName: function() {
		return this.name;
	},
	getWheelCount: function() {
		return this.wheelCount;
	},
	checkForEngine: function() {
		return this.hasEngine;
	},
	displayVehicleInfo: function() {
		console.log('The vehicle name is ' + this.getName() + '.' + ' The vehicle has an engine: ' + this.checkForEngine() + '.' + ' The vehicle has ' + this.getWheelCount() + ' wheels.' );
	}
};


var Car = Object.create(Vehicle);
Car.name = "Car";
Car.wheelCount = "4";
Car.hasEngine = true;
Car.doorCount = "4";
Car.isConvertible = "not";

Car.displayVehicleInfo();

Car.getDoorCount = function() {
	return this.doorCount;
}

Car.checkForConvertible = function() {
	return this.isConvertible;
}

Car.displayCarInfo = function() {
	console.log('This car has ' + this.getDoorCount() + ' doors, and is ' + this.checkForConvertible() + ' a convertible.' );
}

Car.displayCarInfo();
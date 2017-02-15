console.log('pseudoclassical.js:');
// Gunnar Normand 
// Week 5 Homework 



// 3. Pseudo-Classical Inheritance

var Vehicle = function(options) {
	this.name = options ? options.name : "";
	this.getName = function() {
		return this.name;
	}
	this.wheelCount = options ? options.wheelCount : "";
	this.getWheelCount = function() {
		return this.wheelCount;
	}
	this.hasEngine = options ? options.hasEngine : "";
	this.checkForEngine = function() {
		return this.hasEngine;
	}
	this.displayVehicleInfo = function() {
		console.log('The vehicle name is ' + this.getName() + '.' + ' The vehicle has an engine: ' + this.checkForEngine() + '.' + ' The vehicle has ' + this.getWheelCount() + ' wheels.');
	}
};

var GoCart = new Vehicle({
	name: "A Go-Cart",
	wheelCount: "4",
	hasEngine: true
});

GoCart.displayVehicleInfo();

var Car = function(options) {
	Vehicle.call(this, options);

	this.doorCount = options.doorCount;
	this.getDoorCount = function() {
		return this.doorCount;
	}
	this.isConvertible = options.isConvertible;
	this.checkForConvertible = function() {
		return this.isConvertible;
	}
	this.displayCarInfo = function() {
		console.log('This car has ' + this.getDoorCount() + ' doors, and is ' + this.checkForConvertible() + ' a convertible.' );
	}
};

Car.prototype = new Vehicle();

var bike = new Car({
	name: "bike",
	doorCount: "0",
	isConvertible: "not",
});

bike.displayCarInfo();
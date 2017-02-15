console.log('functional.js:');
// Gunnar Normand 
// Week 5 Homework 



// 1. Functional Inheritance

var Vehicle = function(options) {

	var public = options || {};

	public.getName = function() {
		
		return public.name;
	};

	public.getWheelCount = function() {
		
		return public.wheelCount; 
	};

	public.checkForEngine = function() {

		return public.hasEngine;
	};

	public.displayVehicleInfo = function() {

		console.log('The vehicle name is ' + public.getName() + '.' + ' The vehicle has an engine: ' + public.checkForEngine() + '.' + ' The vehicle has ' + public.getWheelCount() + ' wheels.' );
	};

	return public;
}

var Car = function(options) {
	
	var public = Vehicle(options);

	public.getDoorCount = function() {
		
		return public.doorCount;
	}

	public.checkForConvertible = function() {
		
		return public.isConvertible;
	}

	public.displayCarInfo = function() {

		console.log('The vehicle name is ' + public.getName() + '.' + ' The ' + public.getName() + ' has an engine: ' + public.checkForEngine() + '.' + ' The ' + public.getName() + ' has ' + public.getWheelCount() + ' wheels.' + ' This ' + public.getName() + ' has ' + public.getDoorCount() + ' doors, and is ' + public.checkForConvertible() + ' a convertible.' );
	}

	return public;
} 

var bike = Car({
	name: "Bike",
	wheelCount: "2",
	hasEngine: false,
	doorCount: "0",
	isConvertible: "not"
	
});

bike.displayCarInfo();

var boat = Car({
	name: "Boat",
	doorCount: "0",
	isConvertible: "",
	hasEngine: true,
	wheelCount: "0"
});

boat.displayCarInfo();

var coup = Car({
	name: "Coup",
	doorCount: "2",
	isConvertible: "not",
	hasEngine: true,
	wheelCount: "4"
});

coup.displayCarInfo();

var sedan = Car({
	name: "Sedan",
	doorCount: "4",
	isConvertible: "not",
	hasEngine: true,
	wheelCount: "4"
});

sedan.displayCarInfo();

var convertible = Car({
	name: "Convertible",
	doorCount: "2",
	isConvertible: "",
	hasEngine: true,
	wheelCount: "4"
});

convertible.displayCarInfo();
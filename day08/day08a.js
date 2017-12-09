var fs = require('fs');

var fileName = 'input.txt';

var register = {};
var maxValueEver = 0;

function buildAndRunFunction(registerKey, changeType, amountToChange, condition) {
	if (!register.hasOwnProperty(registerKey)) {
		register[registerKey] = 0;
	}
	if (condition(register)) {
		switch (changeType) {
			case "dec":
				register[registerKey] = register[registerKey] - amountToChange;
				break;
			case "inc":
				register[registerKey] = register[registerKey] + amountToChange;
				break;
			default:
				console.log("ERROR");
		}
	}
}

function buildCondition(registerKey, comparison, numToCompare) {
	return function () {
		if (!register.hasOwnProperty(registerKey)) {
			register[registerKey] = 0;
		}

		var registerValue = register[registerKey];

		switch (comparison) {
			case "==":
				return registerValue === numToCompare;

			case ">":
				return registerValue > numToCompare;

			case "<":
				return registerValue < numToCompare;

			case ">=":
				return registerValue >= numToCompare;

			case "<=":
				return registerValue <= numToCompare;

			case "!=":
				return registerValue !== numToCompare;

			default:
				console.log("ERROR");
				return true;
		}
	}
}

function parseInstruction(string) {
	var splitString = string.split(" ");
	var registerKey = splitString[0];
	var changeType = splitString[1];
	var amountToChange = parseInt(splitString[2]);
	var condition = buildCondition(splitString[4], splitString[5], parseInt(splitString[6]));

	buildAndRunFunction(registerKey, changeType, amountToChange, condition);
	if (register[registerKey] > maxValueEver) {
		maxValueEver = register[registerKey];
	}
}

fs.readFile(fileName, 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}

	var instructionStrings = input.split(/\r?\n/);

	for (var i = 0; i < instructionStrings.length; i++) {
		parseInstruction(instructionStrings[i]);
	}

	var values = Object.values(register);

	var max = Math.max.apply(null, values);

	console.log(register);
	console.log("MAX: " + max);
	console.log("MAX RECORD: " + maxValueEver);
});


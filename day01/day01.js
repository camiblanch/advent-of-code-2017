var fs = require('fs');

var fileName = 'input.txt';

function getNextNumber(input, i) {
	if (i === input.length - 1) {
		return parseInt(input[0]);
	} else {
		return parseInt(input[i + 1]);
	}
}

function getHalfwayNumber(input, i) {
	var length = input.length;
	var halfway = length / 2;

	if (i + halfway < length) {
		return parseInt(input[i + halfway]);
	} else {
		return parseInt(input[halfway - (length - i)]);
	}
}

fs.readFile(fileName, 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}
	var sum = 0;

	for (var i = 0; i < input.length; i++) {
		var currNumber = parseInt(input[i]);
		var nextNumber = getHalfwayNumber(input, i);

		if (currNumber === nextNumber) {
			sum += currNumber;
		}
	}

	console.log("Sum is: " + sum);
});
var fs = require('fs');

var fileName = 'input.txt';

function getNextNumber(input, i) {
	if (i === input.length - 1) {
		return parseInt(input[0]);
	} else {
		return parseInt(input[i + 1]);
	}
}

fs.readFile(fileName, 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}
	var sum = 0;

	for (var i = 0; i < input.length; i++) {
		var currNumber = parseInt(input[i]);
		var nextNumber = getNextNumber(input, i);

		if (currNumber === nextNumber) {
			sum += currNumber;
		}
	}

	console.log("Sum is: " + sum);
});
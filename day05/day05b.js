var fs = require('fs');

var fileName = 'input.txt';

fs.readFile(fileName, 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}

	var steps = 0;
	var currentIndex = 0;
	var instructions = input.split(/\r?\n/).map(function (value) {
		return parseInt(value, 10);
	});

	while (currentIndex < instructions.length) {
		var numJumpsToTake = instructions[currentIndex];
		if (numJumpsToTake >= 3) {
			instructions[currentIndex] = instructions[currentIndex] - 1
		} else {
			instructions[currentIndex] = instructions[currentIndex] + 1;
		}
		steps++;
		if (numJumpsToTake + currentIndex < instructions.length) {
			currentIndex += numJumpsToTake;
		} else {
			break;
		}
	}
	console.log(steps);
});
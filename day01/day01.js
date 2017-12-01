var fs = require('fs');

fs.readFile('test-case-0.txt', 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}
	var sum = 0;

	for (var i = 0; i < input.length; i++) {
		var currNumber = parseInt(input[i]);
		var nextNumber = parseInt(input[i + 1]);

		if (currNumber === nextNumber) {
			sum += currNumber;
		}
	}

	console.log("Sum is: " + sum);
});
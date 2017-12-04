var fs = require('fs');

var fileName = 'input.txt';

fs.readFile(fileName, 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}

	var sum = 0;

	rows = input.split(/\r?\n/);
	for (var i = 0; i < rows.length; i++) {
		numbers = rows[i].split(/\t/);

		for (var j = 0; j < numbers.length; j++) {
			numbers[j] = parseInt(numbers[j]);
		}

		sum += Math.max.apply(null, numbers) - Math.min.apply(null, numbers);
	}

	console.log(sum);
});
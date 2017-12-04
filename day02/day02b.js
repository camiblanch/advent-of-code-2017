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
			var firstNum = parseInt(numbers[j]);
			for (var k = j + 1; k < numbers.length; k++) {
				var secondNum = parseInt(numbers[k]);

				if (firstNum % secondNum === 0) {
					sum += firstNum / secondNum;
				} else if (secondNum % firstNum === 0) {
					sum += secondNum / firstNum;
				}
			}
		}
	}

	console.log(sum);
});
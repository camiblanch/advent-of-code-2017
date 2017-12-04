var fs = require('fs');

var fileName = 'input.txt';

fs.readFile(fileName, 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}
	var numOfValid = 0;
	var passwords = input.split(/\r?\n/);

	for (var i = 0; i < passwords.length; i++) {
		var words = passwords[i].split(" ");

		for (var j = 0; j < words.length; j++) {
			words[j] = words[j].split("").sort().join("");
		}

		if (valid(words)) {
			numOfValid++;
		}
	}

	console.log(numOfValid);
});

function valid(words) {
	for (var j = 0; j < words.length; j++) {
		if (words.lastIndexOf(words[j]) !== j) {
			return false
		}
	}
	return true;
}

var fs = require('fs');

function getInput() {
	fs.readFile('input.txt', 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}
		return data;
	});
}

getInput();
var fs = require('fs');

var fileName = 'input.txt';

function getWeight(weightWithParen) {
	return weightWithParen.replace("(", "").replace(")", "");
}

function getProgramsAbove(programsAbove) {
	return programsAbove.split(", ");
}

fs.readFile(fileName, 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}

	var programs = input.split(/\r?\n/);

	var roots = [];
	for (var i = 0; i < programs.length; i++) {
		var nameWeightVsAbove = programs[i].split(" -> ");
		if (nameWeightVsAbove.length === 2) {
			var nameAndWeight = nameWeightVsAbove[0].split(" ");

			var name = nameAndWeight[0];
			var weight = getWeight(nameAndWeight[1]);
			var programsAbove = getProgramsAbove(nameWeightVsAbove[1]);
			roots.push(new Program(name, weight, programsAbove))
		}
	}

	var findingRoot = roots;

	for (var j = 0; j < roots.length; j++) {
		for (var k = 0; k < roots[j].programsAbove.length; k++) {
			findingRoot = findingRoot.filter(function (program) {
				return program.name !== roots[j].programsAbove[k];
			});
		}
	}

	console.log(findingRoot);
});

function Program(name, weight, programsAbove) {
	this.name = name;
	this.weight = weight;
	this.programsAbove = programsAbove;
}
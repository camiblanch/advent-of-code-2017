var fs = require('fs');

var fileName = 'input.txt';

function getWeight(weightWithParen) {
	return weightWithParen.replace("(", "").replace(")", "");
}

function getProgramsAbove(programsAbove) {
	return programsAbove.split(", ");
}

function getProgram(programString) {
	var nameWeightVsAbove = programString.split(" -> ");
	var programsAbove = [];
	var nameAndWeight = nameWeightVsAbove[0].split(" ");
	if (nameWeightVsAbove.length === 2) {
		programsAbove = getProgramsAbove(nameWeightVsAbove[1]);
	}
	var name = nameAndWeight[0];
	var weight = getWeight(nameAndWeight[1]);
	return new Program(name, weight, programsAbove);
}

function updateProgramsAboveAndSumWeight(root, programs) {
	var properProgramsAbove = [];
	var sumWeight = root.weight;
	for (var i = 0; i < root.programsAbove.length; i++) {
		var properProgram = programs.find(function (program) {
			return program.name === root.programsAbove[i];
		});
		updateProgramsAboveAndSumWeight(properProgram, programs);
		properProgramsAbove.push(properProgram);
		sumWeight += parseInt(properProgram.sumWeight);
	}
	root.programsAbove = properProgramsAbove;
	root.sumWeight = sumWeight;
}

function checkSumWeightBalance(root) {
	var childrenWeights = root.programsAbove.map(function (program) {
		return program.sumWeight;
	});

	for (var i = 0; i < childrenWeights.length; i++) {
		var isUnique = childrenWeights.filter(function (weight) {
			return weight === childrenWeights[i];
		}).length === 1;
		if (isUnique) {
			var check = checkSumWeightBalance(root.programsAbove[i]);
			if (check !== undefined) {
				return check;
			}
			var unbalancedWeightIndex = i;
			var balancedWeightIndex = 0;
			if (i === 0) {
				balancedWeightIndex = i + 1;
			}

			var balancedSumWeight = root.programsAbove[balancedWeightIndex].sumWeight;
			var unbalancedWeight = root.programsAbove[unbalancedWeightIndex].weight;
			var unbalancedSumWeight = root.programsAbove[unbalancedWeightIndex].sumWeight;

			console.log(unbalancedWeight);
			console.log(unbalancedSumWeight - balancedSumWeight);

			return (unbalancedWeight - (unbalancedSumWeight - balancedSumWeight));
		}
	}

}

fs.readFile(fileName, 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}

	var programLines = input.split(/\r?\n/);

	var programs = [];
	for (var i = 0; i < programLines.length; i++) {
		programs.push(getProgram(programLines[i]))
	}

	var findingRoot = programs;

	for (var j = 0; j < programs.length; j++) {
		for (var k = 0; k < programs[j].programsAbove.length; k++) {
			findingRoot = findingRoot.filter(function (program) {
				return program.name !== programs[j].programsAbove[k];
			});
		}
	}

	var root = findingRoot[0];
	updateProgramsAboveAndSumWeight(root, programs);
	console.log(checkSumWeightBalance(root));
});

function Program(name, weight, programsAbove) {
	this.name = name;
	this.weight = parseInt(weight);
	this.sumWeight = parseInt(weight);
	this.programsAbove = programsAbove;
}
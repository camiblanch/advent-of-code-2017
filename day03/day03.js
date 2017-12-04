function Coords(newX, newY) {
	var x = newX;
	var y = newY;
	this.getX = function () {
		return x;
	};

	this.getY = function () {
		return y;
	};
}

var input = 277678;

var inputX = 0;
var inputY = 0;
var counter = 1;

function isFinished() {
	return counter === input;
}

for (var i = 1; counter <= input; i++) {
	var lengthOfWall = i * 2;

	// Build right wall
	inputX += 1;
	counter++;
	if (isFinished()) {
		report(new Coords(inputX, inputY));
		break;
	}

	for (var j = 0; j < lengthOfWall - 1; j++) {
		inputY += 1;
		counter++;
		if (isFinished()) {
			report(new Coords(inputX, inputY));
			break;
		}
	}

	// Build top wall
	for (var k = 0; k < lengthOfWall; k++) {
		inputX -= 1;
		counter++;
		if (isFinished()) {
			report(new Coords(inputX, inputY));
			break;
		}
	}

	// Build left wall
	for (var l = 0; l < lengthOfWall; l++) {
		inputY -= 1;
		counter++;
		if (isFinished()) {
			report(new Coords(inputX, inputY));
			break;
		}
	}

	// Build bottom wall
	for (var m = 0; m < lengthOfWall; m++) {
		inputX += 1;
		counter++;
		if (isFinished()) {
			report(new Coords(inputX, inputY));
			break;
		}
	}
}

function report(coords) {
	console.log(Math.abs(coords.getX()) + Math.abs(coords.getY()));
}

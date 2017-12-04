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
// var input = 5;

var inputX = 200;
var inputY = 200;
var counter = 1;

var grid = Array.from({length: 800}).map(function () {
	return Array.from({length: 800}).map(function () {
		return 0;
	});
});

grid[200][200] = 1;

for (var i = 1; counter <= input; i++) {
	var lengthOfWall = i * 2;

	// Build right wall
	inputX += 1;
	grid[inputX][inputY] = getAdjacentSum(new Coords(inputX, inputY));

	for (var j = 0; j < lengthOfWall - 1; j++) {
		inputY += 1;
		grid[inputX][inputY] = getAdjacentSum(new Coords(inputX, inputY));
	}

	// Build top wall
	for (var k = 0; k < lengthOfWall; k++) {
		inputX -= 1;
		grid[inputX][inputY] = getAdjacentSum(new Coords(inputX, inputY));
	}

	// Build left wall
	for (var l = 0; l < lengthOfWall; l++) {
		inputY -= 1;
		grid[inputX][inputY] = getAdjacentSum(new Coords(inputX, inputY));
	}

	// Build bottom wall
	for (var m = 0; m < lengthOfWall; m++) {
		inputX += 1;
		grid[inputX][inputY] = getAdjacentSum(new Coords(inputX, inputY));
	}
}

function getAdjacentSum(currCoords) {
	var sum = 0;
	var x = currCoords.getX();
	var y = currCoords.getY();

	sum += grid[x + 1][y];
	sum += grid[x + 1][y + 1];
	sum += grid[x + 1][y - 1];

	sum += grid[x - 1][y];
	sum += grid[x - 1][y + 1];
	sum += grid[x - 1][y - 1];

	sum += grid[x][y + 1];
	sum += grid[x][y - 1];

	if (sum > input) {
		console.log(sum);
		process.exit(0);
	}

	return sum;
}

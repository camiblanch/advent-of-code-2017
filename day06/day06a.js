var fs = require('fs');

var fileName = 'input.txt';

fs.readFile(fileName, 'utf8', function (err, input) {
	if (err) {
		return console.log(err);
	}

	var blocks = input.split(/\t/).map(function (value) {
		return parseInt(value, 10);
	});

	reallocate(blocks);

});

// The reallocation routine operates in cycles. In each cycle,
// it finds the memory bank with the most blocks (ties won by the lowest-numbered memory bank) and
// redistributes those blocks among the banks.
// To do this, it removes all of the blocks from the selected bank,
// then moves to the next (by index) memory bank and
// inserts one of the blocks.
// It continues doing this until it runs out of blocks; if it reaches the last memory bank, it wraps around to the first one.

var previousBlocks = [];

function findMostBlockIndex(blocks) {
	var maxBlockIndex = 0;
	for (var i = 1; i < blocks.length; i++) {
		if (blocks[i] > blocks[maxBlockIndex]) {
			maxBlockIndex = i;
		}
	}
	return maxBlockIndex;
}

function redistribute(maxBlockIndex, blocks) {
	var blocksToDistribute = blocks[maxBlockIndex];
	blocks[maxBlockIndex] = 0;

	var currBlockIndex = maxBlockIndex;

	for (var i = 0; i < blocksToDistribute; i++) {
		currBlockIndex++;
		if (currBlockIndex >= blocks.length) {
			currBlockIndex = 0;
		}

		blocks[currBlockIndex] = blocks[currBlockIndex] + 1;
	}

	if (previousBlocks.includes(JSON.stringify(blocks))) {
		console.log(previousBlocks.length + 1);
	} else {
		previousBlocks.push(JSON.stringify(blocks));
		reallocate(blocks);
	}
}

function reallocate(blocks) {
	var maxBlockIndex = findMostBlockIndex(blocks);
	redistribute(maxBlockIndex, blocks);
}
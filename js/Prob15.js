/* This is the core script for Problem #15

The basic algorithm finds a row from Pascal's triangle and then sums the total
to solve for the number of paths.
*/

/* This function formats and writes out the final answer to the document.
*/
function writeAnswerToPage(ans) {
	var ansID = document.getElementById("answer"); // Find the answer elememt on the page
	
	var msg = "I found the answer! It's " + ans + ". Was I right?";
	ansID.textContent = msg;
}

/* This object represents a single row from Pascal's Triangle. For simplicity,
we start on row 1, as opposed to row 0.
*/
var PascalRow = {
	row: [1, 1],			// The current row of Pascal's Triangle we're at
	rowIndex: 1,			// The row's index
	
	nextRow: function() {	// Calculates and moves to the next row in the triangle
		// The bulk of the work is handled in this for loop
		var oldValue, curValue;	// Place holder variables
		oldValue = this.row[0];
		for (var i = 1; i < this.row.length; i++) { // [0] always equals 1
			curValue = this.row[i];	// Stores the current value
			this.row[i] = oldValue + this.row[i];
			oldValue = curValue; // oldValue becomes curRow[i]'s original value
		}
		
		// Add 1 to the end of the array
		this.row[this.row.length] = 1;
		this.rowIndex++; // Increase to the next index
	},
	curInd: function() {	// Just returns rowIndex
		return this.rowIndex;
	}
};

// This function builds the row at PascalRow down to the bottom tip of the diamond
function buildDown() {
	var curRow = PascalRow.row; // The current row being worked on

	while (curRow.length > 1) {
		var nextRow = new Array(curRow.length - 1);
		for (var i = 0; i < nextRow.length; i++) {
			nextRow[i] = curRow[i] + curRow[i+1];
		}
		curRow = nextRow;
	}
	
	return curRow;
}

// Start of execution.
// Go to row 20 of Pascal's Triangle
while (PascalRow.curInd() < 20) {
	PascalRow.nextRow();
}

// buildDown does the heavy lifting for the second half
var result = buildDown();
writeAnswerToPage(result);

// Testing testing, read all about it! The pinball wizard and the miracle cure!
// For this test, we're advancing PascalRow to be on row 4 and outputting the contents.
/*
while (PascalRow.rowIndex < 4) {
	PascalRow.nextRow();
}

var tester = "";
for (var i = 0; i < PascalRow.row.length; i++) {
	tester += PascalRow.row[i] + ", ";
}
writeAnswerToPage(tester);
*/
/* This object contains all the functions which are reqired to check the winning/draw conditions
 case 1 : diagonal check
 case 2 : row check
 case 3 : column check
 case 4 : draw check
*/
let winningLogicObject = {
  diagonalsCheck: function diagonalsCheck(i, j, SIZE, tttm, chance) {
    let countLeft = 0;
    let countRight = 0;
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        // condition for left diagonal
        if (i == j && tttm[i][j] === chance) countLeft += 1;
        // condition for right diagonal
        if (i + j == SIZE - 1 && tttm[i][j] === chance) countRight += 1;
      }
    }
    if (countLeft === SIZE || countRight === SIZE) return true;
    else return false;
  },
  rowCheck: function rowCheck(i, j, SIZE, tttm, chance) {
    let count = 0;
    for (var j = 0; j < SIZE; j++) {
      if (tttm[i][j] === chance) count += 1;
    }
    if (count === SIZE) return true;
    else return false;
  },
  columnCheck: function columnCheck(i, j, SIZE, tttm, chance) {
    // increase i with same j
    let count = 0;
    for (var i = 0; i < SIZE; i++) {
      if (tttm[i][j] === chance) count += 1;
    }
    if (count === SIZE) return true;
    else return false;
  },
  checkDraw: function checkDraw(SIZE, tttm) {
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        if (tttm[i][j] === -1) return false;
      }
    }
    return true;
  },
};

export default winningLogicObject;

console.log("script added");
var chance = 0; // player's chance
let tttm = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
]; // tic tac toe matrix
let SIZE = 3;

// this function will the player chance on the page
function chanceUpdateOnUI() {
  chanceUpdateElement = document.getElementsByClassName("chance")[0];
  chanceUpdateElement.innerHTML = "Player " + (chance === 0 ? "X" : "O");
}

function diagonalsCheck(i, j) {
  // if clicked row,col comes as a diagonal
  diagonal = i == j ? "l" : "";
  diagonal = i + j == SIZE - 1 ? "r" : "";
  if (diagonal.length) {
    let count = 0;
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        if (diagonal == "l") {
          if (i == j && tttm[i][j] === chance) count += 1;
        } else {
          if (i + j == SIZE - 1 && tttm[i][j] === chance) count += 1;
        }
      }
    }
    if (count === SIZE) return true;
    else return false;
  }
  return false;
}

function rowCheck(i, j) {
  let count = 0;
  for (var j = 0; j < SIZE; j++) {
    if (tttm[i][j] === chance) count += 1;
  }
  if (count === SIZE) return true;
  else return false;
}

function columnCheck(i, j) {
  // increase i with same j
  let count = 0;
  for (var i = 0; i < SIZE; i++) {
    if (tttm[i][j] === chance) count += 1;
  }
  if (count === SIZE) return true;
  else return false;
}

function checkDraw() {
  for (var i = 0; i < SIZE; i++) {
    for (var j = 0; j < SIZE; j++) {
      if (tttm[i][j] === -1) return false;
    }
  }
  return true;
}

function checkWinner(i, j) {
  // case 1 : diagonal check
  // case 2 : row check
  // case 3 : column check
  // case 4 : draw check
  var alertText = "";
  if (diagonalsCheck(i, j) || rowCheck(i, j) || columnCheck(i, j)) {
    alertText = "Winner: Player " + (chance === 0 ? "X" : "O");
  } else if (checkDraw()) {
    alertText = "It's a Draw";
  } else {
    return false;
  }
  alert(alertText);
  location.reload();
}

function play(event) {
  let splitClass = event.target.classList[1].split("");
  let i = parseInt(splitClass[splitClass.length - 2]);
  let j = parseInt(splitClass[splitClass.length - 1]);
  if (tttm[i][j] === -1) {
    boxElement = document.getElementsByClassName(event.target.className)[0];
    boxElement.innerHTML = chance == 0 ? "X" : "O";
    tttm[i][j] = chance; // insert the number in matrix then only give the chance to other player
    if (!checkWinner(i, j)); // check if we have winner then declare the winner else give chance to other player
    chance = chance === 0 ? 1 : 0; //  alter the chance var
    chanceUpdateOnUI();
  } else alert("Wrong click");
}

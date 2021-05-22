import winningLogicObject from "./winning.js";

let chance = 0; // player's chance
let tttm = []; // tic tac toe matrix
let SIZE = 3; // default size of board

/**
 * Init function will initialize the game by creating the dynamic board on UI
 */
function init() {
  let table = document.createElement("table");
  table.setAttribute("border", 1);
  table.setAttribute("cellspacing", "10px");
  table.className = "table";
  let row;
  for (var i = 0; i < SIZE; i++) {
    row = document.createElement("tr");
    row.className = "row row" + i;
    let initialMatrixRow = [];
    for (var j = 0; j < SIZE; j++) {
      let box = document.createElement("td");
      initialMatrixRow.push(-1);
      box.onclick = play;
      box.className = "col col" + i + "" + j;
      row.appendChild(box);
    }
    tttm.push(initialMatrixRow);
    table.appendChild(row); // appending row containing SIZE elements as td into table
  }
  let tableContainer = document.getElementsByClassName("table-wrapper")[0];
  tableContainer.append(table);
  chanceUpdateOnUI();
}

// this function will update the player chance on the page
function chanceUpdateOnUI() {
  let chanceUpdateElement = document.getElementsByClassName("chance")[0];
  chanceUpdateElement.innerHTML = "Player " + (chance === 0 ? "X" : "O");
}

/**
 * This function will check all the winnind/draw conditions
 * @param {Int} i row
 * @param {Int} j col
 * @returns boolean
 */
function checkWinner(i, j) {
  var alertText = "";
  if (
    winningLogicObject.diagonalsCheck(i, j, SIZE, tttm, chance) ||
    winningLogicObject.rowCheck(i, j, SIZE, tttm, chance) ||
    winningLogicObject.columnCheck(i, j, SIZE, tttm, chance)
  ) {
    alertText = "Winner: Player " + (chance === 0 ? "X" : "O");
  } else if (winningLogicObject.checkDraw(SIZE, tttm)) {
    alertText = "It's a Draw";
  } else {
    return false;
  }
  alert(alertText);
  location.reload();
}

/**
 * This function will update the UI as well has tttm (tic tac toe matrix) for the game to proceed
 * @param {*} event
 */
function play(event) {
  let splitClass = event.target.classList[1].split("");
  let i = parseInt(splitClass[splitClass.length - 2]);
  let j = parseInt(splitClass[splitClass.length - 1]);
  if (tttm[i][j] === -1) {
    let boxElement = document.getElementsByClassName(event.target.className)[0];
    boxElement.innerHTML = chance == 0 ? "X" : "O";
    tttm[i][j] = chance; // insert the number in matrix then only give the chance to other player
    setTimeout(() => {
      if (!checkWinner(i, j)); // check if we have winner then declare the winner else give chance to other player
      chance = chance === 0 ? 1 : 0; //  alter the chance var
      chanceUpdateOnUI();
    }, 10);
  } else alert("Wrong click");
}

init();

const prompt = require("prompt");

let board =   [["-","-","-"],
               ["-","-","-"],
               ["-","-","-"]];

let rows = +process.argv[2];

function constructBoard(rows){
  let res = [];
  let arr = new Array(rows).fill('-');
  for (let i = 0; i < rows ; i++) {
    res.push(arr.slice());
  }
  return res;
}

function checkWinner(board) {
  let oAns = new Array(board.length).fill('O').join('');
  let xAns = new Array(board.length).fill('X').join('');
  let rightDiag = "", leftDiag = "";
  for (let i = 0; i < board.length; i++) {
    rightDiag += board[i][i];
    leftDiag += board[i][board.length - 1 - i];
    if (board[i].join("") === oAns || board[i].join("") === xAns) {
      return board[i][0];
    }
    let temp = "";
    for (let j = 0; j < board[i].length; j++){
      temp += board[j][i];
    }
    if (temp === oAns|| temp === xAns) {
      return temp[0];
    }
  }
  if (rightDiag === oAns || rightDiag === xAns) {
    return rightDiag[0];
  } else if (leftDiag === oAns || leftDiag === xAns) {
    return leftDiag[0];
  }
  return false;
}

const ticTacToe = (board, count = 0) => {
  let winner;
  prompt.start();
  prompt.get(["x-position", "y-position"], (err, results) => {
    if (board[results["x-position"]][results["y-position"]] === '-') {
      board[results["x-position"]][results["y-position"]] = count % 2 === 0 ? 'O' : 'X';
      board.forEach(i => console.log(i));
      winner = checkWinner(board);
      if (!winner) {
        return ticTacToe(board, count+1);
      } else {
        console.log(winner, " wins!");
        return;
      }
    } else {
      console.log("cannot pick that spot, already taken");
      return ticTacToe(board, count);
    }
  });
}

board = rows ? constructBoard(rows) : board;

ticTacToe(board);

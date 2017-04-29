class Board {
  constructor () {
    this.board = {};
    this.playerTurn = "human";
    this.marks = { "human": "X", "computer": "O" };
    this.fetchingMove = false;
    this.resetBoard();
  };

  setView (view) {
    this.view = view;
  };

  getSquare (i) {
    return this.board[i];
  };

  getPlayerTurn () {
    return this.playerTurn;
  };

  resetBoard () {
    for (let i=0; i<9; i++) {
      this.board[i] = " ";
    }

    if (this.view) {
      this.view.update();
    }
  };

  getWinner () {
    let boardFull = true;
    for (let i=0; i<9; i++) {
      if (this.board[i] === " ") {
        boardFull = false;
      }
    }

    if (boardFull) {
      return "draw";
    } else if (this.checkForWinner("human")) {
      return "human";
    } else if (this.checkForWinner("computer")) {
      return "computer";
    } else {
      return false;
    }
  };

  checkForWinner (player) {
    return (this.checkRows(player) || this.checkColumns(player)) || this.checkDiagonals(player);
  };

  sendResults () {
    let data = {"final_board":{}};

    for (let i=0; i<9; i++) {
      data["final_board"] = { i: this.board[i] };
    }

    let jsonData = JSON.stringify(data);
    $.ajax({
      url: "https://gnswrchqte.execute-api.us-west-2.amazonaws.com/prod/putboard",
      type: "PUT",
      data: jsonData,
      success: (data) => {
        console.log(data);
      }
    })
  };

  checkRows (player) {
    for (let i=0; i<3; i++) {
      let startIdx = 3*i;
      if (this.board[startIdx] === this.marks[player] && (this.board[startIdx] === this.board[startIdx+1] && this.board[startIdx+1] === this.board[startIdx+2])) {
        return true;
      }
    }

    return false;
  };

  checkColumns (player) {
    for (let i=0; i<3; i++) {
      if (this.board[i] === this.marks[player] && (this.board[i] === this.board[i+3] && this.board[i+3] === this.board[i+6])) {
        return true;
      }
    }

    return false;
  };

  checkDiagonals (player) {
    if (this.board[0] === this.marks[player] && (this.board[0] === this.board[4] && this.board[4] === this.board[8])) {
      return true;
    }

    if (this.board[2] === this.marks[player] && (this.board[2] === this.board[4] && this.board[4] === this.board[6])) {
      return true;
    }

    return false;
  };

  tryMove (squareNum, player) {
    if (this.board[squareNum] === " " && this.playerTurn === player) {
      this.board[squareNum] = this.marks[player];
      this.playerTurn = this.playerTurn === "human" ? "computer" : "human";
      return true;
    } else {
      return false;
    }
  };

  getComputerMove () {
    let that = this;
    this.fetchingMove = true;

    $.ajax({
      url: "https://zpj6onnvm5.execute-api.us-west-2.amazonaws.com/prod/getmove",
      type: "GET",
      success: (data) => {
        that.fetchingMove = false;
        let jsonData = JSON.parse(data);
        that.tryMove(jsonData["move_position"], "computer");
      }
    });
  };
};

export default Board;

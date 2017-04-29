class Board {
  constructor () {
    this.board = {};
    this.playerTurn = "human";
    this.marks = { "human": "X", "computer": "O" };
    this.resetBoard();
  };

  setView (view) {
    this.view = view;
  };

  getSquare (i) {
    return this.board[i];
  };

  resetBoard () {
    for (var i=0; i<8; i++) {
      this.board[i] = " ";
    }

    if (this.view) {
      this.view.update();
    }
  };

  checkForWinner (player) {
    if ((this.checkRows(player) || this.checkColumns(player)) || this.checkDiagonals(player)) {
      // $.ajax({
      //   url: "https://gnswrchqte.executeapi.uswest2.amazonaws.com/prod/putboard",
      //   type: "PUT",
      //   data: this.board,
      //   success: (data) => {
      //     this.resetBoard();
      //   }
      // })
    };
  };

  checkRows (player) {
    for (var i=0; i<3; i++) {
      var startIdx = 3*i;
      if (this.board[startIdx] === player && (this.board[startIdx] === this.board[startIdx+1] && this.board[startIdx+1] === this.board[startIdx+2])) {
        return true;
      }
    }

    return false;
  };

  checkColumns (player) {
    for (var i=0; i<3; i++) {
      if (this.board[i] === player && (this.board[i] === this.board[i+3] && this.board[i+3] === this.board[i+6])) {
        return true;
      }
    }

    return false;
  };

  checkDiagonals (player) {
    if (this.board[0] === player && (this.board[0] === this.board[4] && this.board[4] === this.board[8])) {
      return true;
    }

    if (this.board[2] === player && (this.board[2] === this.board[4] && this.board[4] === this.board[6])) {
      return true;
    }

    return false;
  };

  tryMove (squareNum, player) {
    if (this.board[squareNum] === " " && this.playerTurn === player) {
      this.board[squareNum] === this.marks[player];
      this.view.update();
      return true;
    } else {
      return false;
    }
  };

  getComputerMove () {
    // NB: leaving this code commented out.  The request URL times out consistently.

    // $.ajax({
    //   url: "https://zpj6onnvm5.executeapi.uswest2.amazonaws.com/prod/getmove",
    //   type: "GET",
    //   success: (data) => {
    //     var moveSuccess = this.tryMove(data[move_position], "computer");
    //     if (!moveSuccess) {
    //       this.getComputerMove();
    //     }
    //   }
    // });

    // NB: Here's a workaround that mimics the AJAX request/response
    let validMoves = [];

    for (let i=0; i<8; i++) {
      if (this.board[i] === " ") {
        validMoves.push(i);
      }
    }

    let idx = Math.floor(Math.random()*validMoves.length);
    let response = { "move_position": idx };

    let moveSuccess = this.tryMove(response["move_position"], "computer");
    if (!moveSuccess) {
      this.getComputerMove();
    }
  };
};

export default Board;

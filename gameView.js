class GameView {
  constructor (board) {
    this.board = board;
    this.boardElement = document.getElementById("board");
    this.squares = [];
    this.board.setView(this);
  };

  setupBoard () {
    for (var i=0; i<3; i++) {
      var row = document.createElement("ul");
      row.className = "row";

      this.squares[i] = [];
      for (var j=0; j<3; j++) {
        var square = document.createElement("li");
        square.textContent = this.board.getSquare(i);
        square.className = "square";

        square.addEventListener("click", this.handleClick.bind(this));

        row.append(square);
        this.squares[i][j] = square;
      }

      this.boardElement.append(row);
    }
  };

  handleClick (e) {
    if (board.playerTurn === "human") {
      var coords = [0, 0];
      var attempt = this.board.tryMove(coords, "human");
      if (!attempt) {
        alert("Uh oh! Not a valid move.");
      } else {
        this.board.playerTurn = "computer";
      }
    }
  };

  start () {
    while (!this.board.checkForWinner("human") && !this.board.checkForWinner("computer")) {
      if (this.board.playerTurn === "computer") {
        this.board.getComputerMove();
        this.board.playerTurn = "human";
      }
    }
  };

  update () {
    for (var i=0; i<8; i++) {
      this.squares[i].textContent = this.board.getSquare(i);
    }
  };
};

export default GameView;

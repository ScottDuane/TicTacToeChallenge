class GameView {
  constructor (board) {
    this.board = board;
    this.boardElement = document.getElementById("board");
    this.squares = [];
    this.setupBoard();
    this.start();
  };

  setupBoard () {
    for (let i=0; i<3; i++) {
      let row = document.createElement("ul");
      row.className = "row";

      for (let j=0; j<3; j++) {
        let square = document.createElement("li");
        square.textContent = this.board.getSquare(i);
        square.className = "square";
        square.id = 3*i+j;

        square.addEventListener("click", this.handleClick.bind(this));

        row.append(square);
        this.squares[3*i+j] = square;
      }

      this.boardElement.append(row);
    }
  };

  handleClick (e) {
    e.preventDefault();

    if (this.board.getPlayerTurn() === "human") {
      let squareNum = parseInt(e.target.id);
      this.board.tryMove(squareNum, "human");
    }
  };

  start () {
    let that = this;

    let interval = setInterval(() => {
      if (!that.board.getWinner()) {
        if (that.board.playerTurn === "computer" && !that.board.fetchingMove) {
          that.board.getComputerMove();
        }

        that.update();
      } else {
        let message = "";
        switch (that.board.getWinner()){
          case "draw":
            message = "Draw!";
            break;
          case "human":
            message = "You've won!";
            break;
          case "computer":
            message = "Game over :(";
            break;
        }
        
        that.update();

        let resultMessage = document.createElement("div");
        resultMessage.textContent = message;
        resultMessage.className = 'result-message';
        document.body.append(resultMessage);

        that.board.sendResults();
        clearInterval(interval);
      }
    }, 50);
  };

  update () {
    for (let i=0; i<9; i++) {
      this.squares[i].textContent = this.board.getSquare(i);
    }
  };
};

export default GameView;

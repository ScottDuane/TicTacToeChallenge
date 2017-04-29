/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/TicTacToeChallenge/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.board = {};
    this.playerTurn = "human";
    this.marks = { "human": "X", "computer": "O" };
    this.resetBoard();
  }

  _createClass(Board, [{
    key: "setView",
    value: function setView(view) {
      this.view = view;
    }
  }, {
    key: "getSquare",
    value: function getSquare(i) {
      return this.board[i];
    }
  }, {
    key: "resetBoard",
    value: function resetBoard() {
      for (var i = 0; i < 8; i++) {
        this.board[i] = " ";
      }

      if (this.view) {
        this.view.update();
      }
    }
  }, {
    key: "checkForWinner",
    value: function checkForWinner(player) {
      if (this.checkRows(player) || this.checkColumns(player) || this.checkDiagonals(player)) {
        // $.ajax({
        //   url: "https://gnswrchqte.executeapi.uswest2.amazonaws.com/prod/putboard",
        //   type: "PUT",
        //   data: this.board,
        //   success: (data) => {
        //     this.resetBoard();
        //   }
        // })
      };
    }
  }, {
    key: "checkRows",
    value: function checkRows(player) {
      for (var i = 0; i < 3; i++) {
        var startIdx = 3 * i;
        if (this.board[startIdx] === player && this.board[startIdx] === this.board[startIdx + 1] && this.board[startIdx + 1] === this.board[startIdx + 2]) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "checkColumns",
    value: function checkColumns(player) {
      for (var i = 0; i < 3; i++) {
        if (this.board[i] === player && this.board[i] === this.board[i + 3] && this.board[i + 3] === this.board[i + 6]) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "checkDiagonals",
    value: function checkDiagonals(player) {
      if (this.board[0] === player && this.board[0] === this.board[4] && this.board[4] === this.board[8]) {
        return true;
      }

      if (this.board[2] === player && this.board[2] === this.board[4] && this.board[4] === this.board[6]) {
        return true;
      }

      return false;
    }
  }, {
    key: "tryMove",
    value: function tryMove(squareNum, player) {
      if (this.board[squareNum] === " " && this.playerTurn === player) {
        this.board[squareNum] === this.marks[player];
        this.view.update();
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "getComputerMove",
    value: function getComputerMove() {
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
      var validMoves = [];

      for (var i = 0; i < 8; i++) {
        if (this.board[i] === " ") {
          validMoves.push(i);
        }
      }

      var idx = Math.floor(Math.random() * validMoves.length);
      var response = { "move_position": idx };

      var moveSuccess = this.tryMove(response["move_position"], "computer");
      if (!moveSuccess) {
        this.getComputerMove();
      }
    }
  }]);

  return Board;
}();

;

exports.default = Board;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(board) {
    _classCallCheck(this, GameView);

    this.board = board;
    this.boardElement = document.getElementById("board");
    this.squares = [];
    this.board.setView(this);
    this.setupBoard();
  }

  _createClass(GameView, [{
    key: "setupBoard",
    value: function setupBoard() {
      for (var i = 0; i < 3; i++) {
        var row = document.createElement("ul");
        row.className = "row";

        this.squares[i] = [];
        for (var j = 0; j < 3; j++) {
          var square = document.createElement("li");
          square.textContent = this.board.getSquare(i);
          square.className = "square";

          square.addEventListener("click", this.handleClick.bind(this));

          row.append(square);
          this.squares[i][j] = square;
        }

        this.boardElement.append(row);
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      if (board.playerTurn === "human") {
        var coords = [0, 0];
        var attempt = this.board.tryMove(coords, "human");
        if (!attempt) {
          alert("Uh oh! Not a valid move.");
        } else {
          this.board.playerTurn = "computer";
        }
      }
    }
  }, {
    key: "start",
    value: function start() {
      while (!this.board.checkForWinner("human") && !this.board.checkForWinner("computer")) {
        if (this.board.playerTurn === "computer") {
          this.board.getComputerMove();
          this.board.playerTurn = "human";
        }
      }
    }
  }, {
    key: "update",
    value: function update() {
      for (var i = 0; i < 8; i++) {
        this.squares[i].textContent = this.board.getSquare(i);
      }
    }
  }]);

  return GameView;
}();

;

exports.default = GameView;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _board = __webpack_require__(0);

var _board2 = _interopRequireDefault(_board);

var _gameView = __webpack_require__(1);

var _gameView2 = _interopRequireDefault(_gameView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  console.log("read");
  // let board = new Board();
  // let view = new GameView(board);
  // // view.setupBoard();
  // // view.start();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
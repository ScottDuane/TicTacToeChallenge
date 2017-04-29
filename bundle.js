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
    this.fetchingMove = false;
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
    key: "getPlayerTurn",
    value: function getPlayerTurn() {
      return this.playerTurn;
    }
  }, {
    key: "resetBoard",
    value: function resetBoard() {
      for (var i = 0; i < 9; i++) {
        this.board[i] = " ";
      }

      if (this.view) {
        this.view.update();
      }
    }
  }, {
    key: "getWinner",
    value: function getWinner() {
      if (this.checkForWinner("human")) {
        return "human";
      } else if (this.checkForWinner("computer")) {
        return "computer";
      } else {
        return false;
      }
    }
  }, {
    key: "checkForWinner",
    value: function checkForWinner(player) {
      return this.checkRows(player) || this.checkColumns(player) || this.checkDiagonals(player);
    }
  }, {
    key: "sendResults",
    value: function sendResults() {
      var data = { "final_board": {} };

      for (var i = 0; i < 9; i++) {
        data["final_board"] = { i: this.board[i] };
      }

      var jsonData = JSON.stringify(data);
      $.ajax({
        url: "https://gnswrchqte.execute-api.us-west-2.amazonaws.com/prod/putboard",
        type: "PUT",
        data: jsonData,
        success: function success(data) {
          console.log(data);
        }
      });
    }
  }, {
    key: "checkRows",
    value: function checkRows(player) {
      for (var i = 0; i < 3; i++) {
        var startIdx = 3 * i;
        if (this.board[startIdx] === this.marks[player] && this.board[startIdx] === this.board[startIdx + 1] && this.board[startIdx + 1] === this.board[startIdx + 2]) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "checkColumns",
    value: function checkColumns(player) {
      for (var i = 0; i < 3; i++) {
        if (this.board[i] === this.marks[player] && this.board[i] === this.board[i + 3] && this.board[i + 3] === this.board[i + 6]) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "checkDiagonals",
    value: function checkDiagonals(player) {
      if (this.board[0] === this.marks[player] && this.board[0] === this.board[4] && this.board[4] === this.board[8]) {
        return true;
      }

      if (this.board[2] === this.marks[player] && this.board[2] === this.board[4] && this.board[4] === this.board[6]) {
        return true;
      }

      return false;
    }
  }, {
    key: "tryMove",
    value: function tryMove(squareNum, player) {
      if (this.board[squareNum] === " " && this.playerTurn === player) {
        this.board[squareNum] = this.marks[player];
        this.playerTurn = this.playerTurn === "human" ? "computer" : "human";
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "getComputerMove",
    value: function getComputerMove() {
      var that = this;
      this.fetchingMove = true;

      $.ajax({
        url: "https://zpj6onnvm5.execute-api.us-west-2.amazonaws.com/prod/getmove",
        type: "GET",
        success: function success(data) {
          that.fetchingMove = false;
          var jsonData = JSON.parse(data);
          that.tryMove(jsonData["move_position"], "computer");
        }
      });
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
    this.setupBoard();
    this.start();
  }

  _createClass(GameView, [{
    key: "setupBoard",
    value: function setupBoard() {
      for (var i = 0; i < 3; i++) {
        var row = document.createElement("ul");
        row.className = "row";

        for (var j = 0; j < 3; j++) {
          var square = document.createElement("li");
          square.textContent = this.board.getSquare(i);
          square.className = "square";
          square.id = 3 * i + j;

          square.addEventListener("click", this.handleClick.bind(this));

          row.append(square);
          this.squares[3 * i + j] = square;
        }

        this.boardElement.append(row);
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      e.preventDefault();

      if (this.board.getPlayerTurn() === "human") {
        var squareNum = parseInt(e.target.id);
        this.board.tryMove(squareNum, "human");
      }
    }
  }, {
    key: "start",
    value: function start() {
      var that = this;

      var interval = setInterval(function () {
        if (!that.board.getWinner()) {
          if (that.board.playerTurn === "computer" && !that.board.fetchingMove) {
            that.board.getComputerMove();
          }

          that.update();
        } else {
          var message = that.board.getWinner() === "human" ? "You've won!" : "Game over :(";
          //alert(message);
          that.update();
          that.board.sendResults();
          clearInterval(interval);
        }
      }, 50);
    }
  }, {
    key: "update",
    value: function update() {
      for (var i = 0; i < 9; i++) {
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
  var board = new _board2.default();
  var view = new _gameView2.default(board);
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
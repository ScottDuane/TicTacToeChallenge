import Board from './board.js';
import GameView from './gameView.js';

document.addEventListener('DOMContentLoaded', () => {
  let board = new Board();
  let view = new GameView(board);
});

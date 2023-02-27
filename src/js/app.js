import GamePlay from './gamePlay';

const play = new GamePlay();
play.init();
setInterval(() => play.redrawPosition(), 1000);

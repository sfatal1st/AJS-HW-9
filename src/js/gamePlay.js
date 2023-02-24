export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
  }

  drawUi() {
    this.boardEl = document.querySelector(`.board`);
    for (let i = 0; i < this.boardSize * this.boardSize; i += 1) {
      const cellEl = document.createElement(`div`);
      cellEl.classList.add(`cell`, `map-tile`);
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  redrawPosition() {
    let position = Math.floor(Math.random() * (this.boardSize ** 2));
    for (const cell of this.cells) {
      cell.innerHTML = ``;
    }
    const cellEl = this.boardEl.children[position];
    const charEl = document.createElement(`div`);
    charEl.classList.add(`character`);
    cellEl.appendChild(charEl);
  }

  init() {
    document.addEventListener(`DOMContentLoaded`, () => {
      this.drawUi();
    });
  }
}

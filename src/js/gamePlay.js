export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.ballsEl = null;
    this.cells = [];
    this.cellEl = null;
    this.position = 0;
    this.balls = 0;
    this.lose = 0;
    this.onClickCell = this.onClickCell.bind(this);
  }

  drawUi() {
    this.ballsEl = document.querySelector(".balls");
    this.boardEl = document.querySelector(".board");
    for (let i = 0; i < this.boardSize * this.boardSize; i += 1) {
      const cellEl = document.createElement("div");
      cellEl.classList.add("cell", "map-tile");
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  redrawPosition() {
    this.position = Math.floor(Math.random() * 16);
    for (const cell of this.cells) {
      cell.innerHTML = "";
    }
    this.cellEl = this.boardEl.children[this.position];
    const charEl = document.createElement("div");
    charEl.classList.add("character");
    this.cellEl.appendChild(charEl);
  }

  init() {
    document.addEventListener(`DOMContentLoaded`, () => {
      this.drawUi();
      this.boardEl.addEventListener("click", this.onClickCell);
    });
  }

  onClickCell(e) {
    if (e.target.closest(".character") !== null) {
      this.balls += 1;
      this.redrawPosition();
      this.ballsEl.textContent = "Баллов: " + this.balls;
    } else if (++this.lose > 5) {
      this.ballsEl.textContent = "Вы проиграли!";
      this.balls = 0;
      this.lose = 0;
    }
  }
}

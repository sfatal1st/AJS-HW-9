import SaveState from "./SaveState";

export default class DragDrop {
  constructor() {
    this.saveState = new SaveState();

    this.cards = document.querySelectorAll('.column-body > .card');

    this.currentCard = null;
    this.currentColumn = null;

    this.cards.forEach((card) => {
      card.addEventListener('mousedown', (e) => {
        //e.preventDefault();
        this.currentCard = card;
        this.currentColumn = card.closest('.column');
        this.currentCard.style.position = 'absolute';
        this.currentCard.style.zIndex = 1000;
        this.moveAt(e.pageX, e.pageY);
        document.body.appendChild(this.currentCard);
        this.currentCard.style.cursor = 'grabbing';
      });
    });

    document.addEventListener('mousemove', e => {
      if (this.currentCard) {
        this.moveAt(e.pageX, e.pageY);
        let prevCard = this.getPrevCard(this.currentCard);
        let nextCard = this.getNextCard(this.currentCard);
        let column = this.getColumn(e.clientX, e.clientY);
        if (column && column !== this.currentColumn) {
          column.querySelector('.column-body').appendChild(this.currentCard);
          this.currentColumn = column;
        } else if (prevCard && e.clientY < prevCard.getBoundingClientRect().top + prevCard.offsetHeight / 2) {
          prevCard.before(this.currentCard);
        } else if (nextCard && e.clientY > nextCard.getBoundingClientRect().top + nextCard.offsetHeight / 2) {
          nextCard.after(this.currentCard);
        }
      }
    });

    document.addEventListener('mouseup', () => {
      this.currentCard.style.position = '';
      this.currentCard.style.zIndex = '';
      this.currentCard.style.cursor = '';
      this.currentCard = null;
      this.saveState.saveState();
      this.saveState.renderBoard();
    });
  }

  moveAt(x, y) {
    this.currentCard.style.left = x - this.currentCard.offsetWidth / 2 + 'px';
    this.currentCard.style.top = y - this.currentCard.offsetHeight / 2 + 'px';
  }

  getPrevCard(card) {
    let prev = card.previousElementSibling;
    while (prev) {
      if (prev.classList.contains('card')) {
        return prev;
      }
      prev = prev.previousElementSibling;
    }
    return null;
  }

  getNextCard(card) {
    let next = card.nextElementSibling;
    while (next) {
      if (next.classList.contains('card')) {
        return next;
      }
      next = next.nextElementSibling;
    }
    return null;
  }

  getColumn(x, y) {
    let columns = document.querySelectorAll('.column');
    for (let i = 0; i < columns.length; i++) {
      let rect = columns[i].getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return columns[i];
      }
    }
    return null;
  }
}

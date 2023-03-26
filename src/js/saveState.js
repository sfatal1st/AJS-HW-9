export default class SaveState {
  constructor() {
    this.board = document.querySelector('.board');

    // Загрузка состояния из LocalStorage
    this.state = JSON.parse(localStorage.getItem('boardState')) || {
      columns: [
        { header: 'To do', cards: [] },
        { header: 'In progress', cards: [] },
        { header: 'Done', cards: [] },
      ],
    };
  }

  // Сохранение состояния в LocalStorage
  saveState() {
    localStorage.setItem('boardState', JSON.stringify(this.state));
  }

  // Обновление DOM-дерева на основе состояния
  renderBoard() {
    this.innerHTML = '';

    this.state.columns.forEach((column, columnIndex) => {
      const columnElem = document.createElement('div');
      columnElem.classList.add('column');

      const columnHeaderElem = document.createElement('div');
      columnHeaderElem.classList.add('column-header');
      columnHeaderElem.textContent = column.header;
      columnElem.appendChild(columnHeaderElem);

      const columnBodyElem = document.createElement('div');
      columnBodyElem.classList.add('column-body');
      columnElem.appendChild(columnBodyElem);

      column.cards.forEach((card, cardIndex) => {
        const cardElem = document.createElement('div');
        cardElem.classList.add('card');
        cardElem.textContent = card;
        cardElem.draggable = true;
        cardElem.dataset.columnIndex = columnIndex;
        cardElem.dataset.cardIndex = cardIndex;
        columnBodyElem.appendChild(cardElem);
      });

      const addCardBtnElem = document.createElement('button');
      addCardBtnElem.classList.add('add-card-btn');
      addCardBtnElem.textContent = 'Add another card';
      columnElem.appendChild(addCardBtnElem);

      this.board.appendChild(columnElem);
    });
  }
}

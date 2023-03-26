import SaveState from "./SaveState";

export default class AddCard {
  constructor() {
    this.saveState = new SaveState();
    // Получаем все кнопки "Add another card"
    this.addCardBtns = document.querySelectorAll('.add-card-btn');

    // Для каждой кнопки "Add another card" добавляем обработчик события клика
    this.addCardBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Создаем новую карточку
        const newCard = this.createNewCard();

        // Находим родительский элемент колонки, куда добавлять карточку
        const columnBody = btn.previousElementSibling;

        // Добавляем новую карточку в конец списка
        columnBody.appendChild(newCard);
        //this.saveState.saveState();
        //this.saveState.renderBoard();
      });
    });
  }
  // Функция для создания новой карточки
  createNewCard() {
    // Создаем новый элемент карточки
    const card = document.createElement('div');
    card.classList.add('card');

    // Создаем текстовое поле для описания карточки
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Enter a title for this card...';

    // Добавляем текстовое поле в карточку
    card.appendChild(textarea);

    return card;
  }
}

import SaveState from "./SaveState";

export default class DeleteCard {
  constructor() {
    this.saveState = new SaveState();
    // Получаем все карточки
    this.cards = document.querySelectorAll(".card");
    // Для каждой карточки добавляем обработчик события наведения мыши
    this.cards.forEach((card) => {
      card.addEventListener("mouseover", () => {
        // Создаем элемент иконки крестика
        const deleteIcon = document.createElement("span");
        deleteIcon.classList.add("delete-icon");
        deleteIcon.innerHTML = "X";

        // Добавляем иконку крестика в верхний правый угол карточки
        card.appendChild(deleteIcon);

        // Добавляем обработчик события клика на иконку крестика
        deleteIcon.addEventListener('click', () => {
          // Удаляем карточку
          card.remove();
          //this.saveState.saveState();
          //this.saveState.renderBoard();
        });
      });

      card.addEventListener('mouseout', () => {
        // Удаляем иконку крестика, если курсор мыши покинул карточку
        const deleteIcon = card.querySelector('.delete-icon');
        if (deleteIcon) {
          deleteIcon.remove();
        }
      });
    });
  }
}

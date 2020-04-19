import createNewElement from './createNewElement.js';
import createTaskCard from './createTaskCard.js';

export default function createColumn(name, tasksArray, index) {
  const column = createNewElement('div', 'column');
  column.setAttribute('data-id', index);
  const columnHeader = createNewElement('div', 'column-header', `<p>${name}</p>`);
  const columnCardsContainer = createNewElement('div', 'cards-container');
  const addingCardBtn = createNewElement('div', 'adding-card-btn', '<p>+ Add another card</p>');
  column.appendChild(columnHeader);
  column.appendChild(columnCardsContainer);
  column.appendChild(addingCardBtn);

  addingCardBtn.addEventListener('click', () => {
    const newTaskCard = createTaskCard(tasksArray);
    const taskCardInput = newTaskCard.querySelector('.task-input');
    columnCardsContainer.appendChild(newTaskCard);
    taskCardInput.focus();
  });
  return column;
}

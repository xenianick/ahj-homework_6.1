/* eslint-disable no-param-reassign */
import createNewElement from './createNewElement.js';
import moveAt from './moveAt.js';

export default function dragCard(task, taskCard, tasksArray, downEvent) {
  const shiftX = downEvent.clientX - taskCard.getBoundingClientRect().left;
  const shiftY = downEvent.clientY - taskCard.getBoundingClientRect().top;

  const dummy = createNewElement('div', 'dummy');
  const taskCardMarginBottom = getComputedStyle(taskCard).marginBottom;
  const taskCardMarginBottomInt = parseInt(taskCardMarginBottom, 10);
  dummy.style = `height:${taskCard.offsetHeight + taskCardMarginBottomInt}px`;

  taskCard.after(dummy);

  document.body.appendChild(taskCard);
  taskCard.classList.add('dragged');

  moveAt(taskCard, downEvent.pageX, downEvent.pageY, shiftX, shiftY);

  let cardToDropBy;
  let columnToDropBy;
  let taskCardsElements;
  let cardsContainerElement;

  function onMouseMove(moveEvent) {
    moveAt(taskCard, moveEvent.pageX, moveEvent.pageY, shiftX, shiftY);

    taskCard.style.display = 'none';
    const elementBelow = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
    taskCard.style.display = 'flex';

    cardToDropBy = elementBelow.closest('.task-card');
    columnToDropBy = elementBelow.closest('.column');

    if (!columnToDropBy) {
      return;
    }
    if (columnToDropBy) {
      cardsContainerElement = columnToDropBy.querySelector('.cards-container');
      taskCardsElements = cardsContainerElement.querySelector('.task-card');
    }
    if (!taskCardsElements) {
      cardsContainerElement.appendChild(dummy);
    }
    if (!cardToDropBy) {
      return;
    }
    const y = moveEvent.clientY;
    const cardToDropByBottom = cardToDropBy.offsetTop + cardToDropBy.offsetHeight;
    const cardToDropByMiddle = cardToDropByBottom - cardToDropBy.offsetHeight / 2;
    if (y < cardToDropByMiddle) {
      cardToDropBy.after(dummy);
    } else {
      cardToDropBy.before(dummy);
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  taskCard.addEventListener('mouseup', () => {
    const closestColumn = dummy.closest('.column');
    let closestColumnIndex;
    if (closestColumn) {
      closestColumnIndex = closestColumn.getAttribute('data-id');
    }
    dummy.after(taskCard);
    dummy.remove();
    taskCard.classList.remove('dragged');

    task.columnNumber = closestColumnIndex;
    localStorage[task.id] = JSON.stringify(task);
    const taskIndex = tasksArray.findIndex((trew) => task.id === trew.id);
    if (taskIndex !== -1) {
      const taskFromArray = tasksArray[taskIndex];
      taskFromArray.columnNumber = closestColumnIndex;
    } else {
      tasksArray.push(task);
    }
    taskCard.style = false;

    document.removeEventListener('mousemove', onMouseMove);
  });
}

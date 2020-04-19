/* eslint-disable no-param-reassign */
import createNewElement from './createNewElement.js';
import changeTaskText from './changeTaskText.js';
import dragCard from './dragCard.js';

export default function renderTaskCard(task, tasksArray) {
  const taskCard = createNewElement('form', 'task-card');
  const taskCardInput = createNewElement('textarea', 'task-input');
  taskCardInput.spellcheck = false;
  taskCardInput.value = task.text;
  taskCardInput.required = true;
  const taskCardDeleteContainer = createNewElement('div', 'task-delete-btn-container');
  const taskCardDeleteBtn = createNewElement('div', 'task-delete-btn disabled', '&times');
  taskCardDeleteContainer.appendChild(taskCardDeleteBtn);

  taskCard.appendChild(taskCardInput);
  taskCard.appendChild(taskCardDeleteContainer);

  taskCardInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      taskCardInput.blur();
    }
  });
  taskCardInput.addEventListener('blur', () => {
    if (taskCardInput.value !== '') {
      const taskIndex = tasksArray.findIndex((item) => item.id === task.id);
      changeTaskText(tasksArray, taskIndex, task, taskCardInput);
    }
  });
  taskCardDeleteBtn.addEventListener('click', () => {
    taskCard.remove();
    const taskIndex = tasksArray.findIndex((item) => item.id === task.id);
    tasksArray.splice(taskIndex, 1);
    localStorage.removeItem(task.id);
  });

  // перенос карточки
  taskCard.addEventListener('mousedown', (event) => {
    if (event.target !== taskCardDeleteBtn && event.target !== taskCardInput) {
      taskCardInput.blur();
      dragCard(task, taskCard, tasksArray, event);
    }
  });
  return taskCard;
}

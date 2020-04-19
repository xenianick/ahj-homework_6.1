/* eslint-disable max-len */
import autosize from 'autosize';
import createNewElement from './createNewElement.js';
import Task from './Task.js';
import setNewTask from './setNewTask.js';
import changeTaskText from './changeTaskText.js';
import dragCard from './dragCard.js';

export default function createTaskCard(tasksArray) {
  const taskCard = createNewElement('form', 'task-card');
  const taskCardInput = createNewElement('textarea', 'task-input');
  taskCardInput.spellcheck = false;
  taskCardInput.required = true;
  const taskCardAddBtn = createNewElement('button', 'task-add-btn', 'Add Card');
  const taskCardDeleteContainer = createNewElement('div', 'task-delete-btn-container');
  const taskCardDeleteBtn = createNewElement('div', 'task-delete-btn', '&times');
  taskCardDeleteContainer.appendChild(taskCardDeleteBtn);

  taskCard.appendChild(taskCardInput);
  taskCard.appendChild(taskCardDeleteContainer);
  taskCard.appendChild(taskCardAddBtn);

  autosize(taskCardInput);
  const newTask = new Task('', '');

  taskCard.addEventListener('submit', (event) => {
    event.preventDefault();
    setNewTask(newTask, taskCard, tasksArray);
    taskCardAddBtn.remove();
  });
  taskCardInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      taskCardInput.blur();
    }
  });
  taskCardInput.addEventListener('blur', () => {
    if (taskCardInput.value !== '') {
      const taskIndex = tasksArray.findIndex((item) => item.id === newTask.id);
      if (taskIndex !== -1) {
        changeTaskText(tasksArray, taskIndex, newTask, taskCardInput);
      } else {
        setNewTask(newTask, taskCard, tasksArray);
        taskCardAddBtn.remove();
      }
    }
  });
  taskCardDeleteBtn.addEventListener('click', () => {
    taskCard.remove();
    const taskIndex = tasksArray.findIndex((item) => item.id === newTask.id);
    if (taskIndex !== -1) {
      tasksArray.splice(taskIndex, 1);
      localStorage.removeItem(newTask.id);
    }
  });
  // перенос карточки
  taskCard.addEventListener('mousedown', (event) => {
    if (event.target !== taskCardDeleteBtn && event.target !== taskCardAddBtn && event.target !== taskCardInput) {
      taskCardInput.blur();
      dragCard(newTask, taskCard, tasksArray, event);
    }
  });
  return taskCard;
}

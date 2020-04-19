import autosize from 'autosize';
import createNewElement from './createNewElement.js';
import restoreSavedTasks from './restoreSavedTasks.js';
import createColumn from './createColumn.js';
import renderTaskCard from './renderTaskCard.js';

const bodyEl = document.querySelector('body');

const mainContainer = createNewElement('div', 'main-container');
const columnsContainer = createNewElement('div', 'columns-container');

mainContainer.appendChild(columnsContainer);
bodyEl.insertBefore(mainContainer, bodyEl.firstChild);

// получаем из localStorage данные о сохраненных тасках и кладем их в массив
const tasksArray = restoreSavedTasks();

// создаем колонки
const columnFirst = createColumn('Todo', tasksArray, '1');
const columnSecond = createColumn('In progress', tasksArray, '2');
const columnThird = createColumn('Done', tasksArray, '3');
columnsContainer.appendChild(columnFirst);
columnsContainer.appendChild(columnSecond);
columnsContainer.appendChild(columnThird);

// добавляем сохраненные задачи на страницу
tasksArray.forEach((task) => {
  const taskCard = renderTaskCard(task, tasksArray);
  const columnId = task.columnNumber;
  const taskColumn = columnsContainer.querySelector(`[data-id="${columnId}"]`);
  const taskColumnContainer = taskColumn.querySelector('.cards-container');
  taskColumnContainer.appendChild(taskCard);
});

// autosize textarea
const textFields = document.querySelectorAll('textarea');
textFields.forEach((item) => autosize(item));

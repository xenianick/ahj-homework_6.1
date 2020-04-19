/* eslint-disable no-param-reassign */
export default function setNewTask(task, taskCard, tasksArray) {
  const column = taskCard.closest('.column');
  const columnIndex = column.getAttribute('data-id');
  task.columnNumber = columnIndex;
  const taskCardInput = taskCard.querySelector('.task-input');
  task.text = taskCardInput.value;
  tasksArray.push(task);
  const taskString = JSON.stringify(task);
  localStorage.setItem(task.id, taskString);
}

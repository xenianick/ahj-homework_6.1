/* eslint-disable no-param-reassign */
export default function changeTaskText(tasksArray, taskIndex, task, taskCardInput) {
  const taskFromArray = tasksArray[taskIndex];
  task.text = taskCardInput.value;
  taskFromArray.text = taskCardInput.value;
  localStorage[task.id] = JSON.stringify(task);
}

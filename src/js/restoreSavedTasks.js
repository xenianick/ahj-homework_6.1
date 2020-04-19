export default function restoreSavedTasks() {
  const tasksArray = [];
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      const item = localStorage.getItem(key);
      if (item !== 'INFO') {
        const oldtask = JSON.parse(item);
        tasksArray.push(oldtask);
      }
    }
  }
  return tasksArray;
}

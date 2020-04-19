/* eslint-disable no-param-reassign */
export default function moveAt(taskCard, pageX, pageY, shiftX, shiftY) {
  taskCard.style.left = `${pageX - shiftX}px`;
  taskCard.style.top = `${pageY - shiftY}px`;
}

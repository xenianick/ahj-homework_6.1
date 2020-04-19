import getId from './getId.js';

export default class Task {
  constructor(text, columnNumber) {
    this.text = text;
    this.columnNumber = columnNumber;
    this.id = getId();
  }
}

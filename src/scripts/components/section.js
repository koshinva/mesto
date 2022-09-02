export default class Section {
  constructor({ renderer }, selectorContainer) {
    this._renderer = renderer;
    this._sectionContainer = document.querySelector(selectorContainer);
  }
  renderItems(items) {
    items.reverse().forEach((item) => this._renderer(item));
  }
  addItem(element) {
    this._sectionContainer.prepend(element);
  }
}

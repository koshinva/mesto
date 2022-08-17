export default class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._items = items;
    this._renderer = renderer;
    this._selectorContainer = document.querySelector(selectorContainer);
  }
  renderer() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._selectorContainer.prepend(element);
  }
}

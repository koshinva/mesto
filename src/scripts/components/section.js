export default class Section {
  constructor({ renderer }, selectorContainer) {
    this._renderer = renderer;
    this._sectionContainer = document.querySelector(selectorContainer);
  }
  renderItems(items) {
    items.reverse().forEach((item) => this._renderer(item));
    // this._items.then((data) => {
    //   data.reverse().forEach((item) => {
    //     this._renderer(item);
    //   })
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  }
  addItem(element) {
    this._sectionContainer.prepend(element);
  }
}

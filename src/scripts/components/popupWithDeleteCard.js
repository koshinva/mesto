import Popup from './popup.js';

export default class PopupWithDeleteCard extends Popup {
  constructor(popupSelector, { deleteCard }) {
    super(popupSelector);
    this._deleteCard = deleteCard;
    this._btnDeleteCard = this._popup.querySelector('.popup__button');
  }
  promiseDeleteCard() {
    return new Promise((resolve) => {
      this._btnDeleteCard.addEventListener('click', () => {
        resolve();
        this.close();
      });
    });
  }
}

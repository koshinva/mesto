import Popup from './popup.js';

export default class PopupWithDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._btnDeleteCard = this._popup.querySelector('.popup__button');
  }
  setPopupHandler(handler) {
    this._popupHandler = handler;
  }
  setEventListeners() {
    super.setEventListeners();
    this._btnDeleteCard.addEventListener('click', () => {
      this._popupHandler();
    })
  }
}

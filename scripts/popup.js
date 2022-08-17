export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    this.setEventListeners();
    this._popup.classList.add('popup_opened');
  }
  close = () => {
    this._removeEventListeners();
    this._popup.classList.remove('popup_opened');
  };
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };
  _closePopupOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };
  _removeEventListeners = () => {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._closePopupOverlay);
  };
  setEventListeners() {
    this._popup
      .querySelector('.popup__close-icon')
      .addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._closePopupOverlay);
  };
}
import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupButton = this._popupForm.querySelector('.popup__button');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._inputValues = {};
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
  _getInputValues() {
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
  }
  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true, 'Сохранение...');
      this._getInputValues();
      this._handleFormSubmit(this._inputValues);
    });
    super.setEventListeners();
  }
  renderLoading(isLoading, text) {
    if (isLoading) {
      this._popupButton.textContent = text;
    } else if (!isLoading) {
      this._popupButton.textContent = text;
    }
  }
}

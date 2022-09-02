import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupButton = this._popupForm.querySelector('.popup__button');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._submitButtonText = this._popupButton.textContent;
  }
  close = () => {
    super.close();
    this._popupForm.reset();
  }
  _getInputValues() {
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
  }
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    })
  }
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const initialText = this._popupButton.textContent;
      this._popupButton.textContent = 'Сохранение...';
      this._getInputValues();
      this._handleFormSubmit(this._inputValues)
        .then(() => this.close())
        .finally(() => {
          this._popupButton.textContent = initialText;
        });
    });
  }
}

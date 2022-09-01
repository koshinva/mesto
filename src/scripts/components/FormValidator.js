export default class FormValidator {
  constructor(objectSettings, formElement) {
    this._objectSettings = objectSettings;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(this._objectSettings.inputSelector)
    );
    this._buttonElement = formElement.querySelector(
      this._objectSettings.submitButtonSelector
    );
  }

  _showInputError(inputElement, textError) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = textError;
    inputElement.classList.add(this._objectSettings.inputErrorClass);
    errorElement.classList.add(this._objectSettings.errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._objectSettings.inputErrorClass);
    errorElement.classList.remove(this._objectSettings.errorClass);
    errorElement.textContent = '';
  }
  _checkInputValidaty(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    });
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(
        this._objectSettings.inactiveButtonClass
      );
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(
        this._objectSettings.inactiveButtonClass
      );
      this._buttonElement.removeAttribute('disabled');
    }
  }
  _setEventListener() {
    this._toggleButtonState();
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidaty(inputItem);
        this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._setEventListener();
  }
  hideError() {
    this._inputList.forEach((inputItem) => {
      this._hideInputError(inputItem);
    });
  }
  checkButton() {
    this._toggleButtonState();
  }
}
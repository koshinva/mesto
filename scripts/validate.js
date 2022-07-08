function showInputError(formElement, inputElement, textError, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = textError;
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.classList.add(obj.errorClass);
}
function hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
}
function checkInputValidaty(formElement, inputElement, obj) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      obj
    );
  } else {
    hideInputError(formElement, inputElement, obj);
  }
}
function hasInvalidInput(inputList) {
  return inputList.some((inputItem) => {
    return !inputItem.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}
function setEventListener(formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, obj);
  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      checkInputValidaty(formElement, inputItem, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
}
function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListener(formElement, obj);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popap__input-error_active',
});

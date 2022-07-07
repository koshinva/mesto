const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_place');
const popupViewImage = document.querySelector('.popup_type_image');
const popupViewImageCardImage = document.querySelector('.popup__image');
const popupViewImageDescription = document.querySelector(
  '.popup__image-description'
);
const btnClosePopupEditProfile = document.querySelector(
  '.popup__close-icon_location_profile'
);
const btnClosePopupAddCard = document.querySelector(
  '.popup__close-icon_location_place'
);
const btnClosePopupViewImage = document.querySelector(
  '.popup__close-icon_location_image'
);
const btnOpenPopupEditForm = document.querySelector('.profile__button-edit');
const btnOpenPopupAddCard = document.querySelector('.profile__button-add');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const inputName = document.querySelector('.popup__input_value_name');
const inputProfession = document.querySelector(
  '.popup__input_value_profession'
);
const inputTitle = document.querySelector('.popup__input_value_title');
const inputLink = document.querySelector('.popup__input_value_link');
const formElementProfile = document.querySelector(
  '.popup__form_location_profile'
);
const formElementPlace = document.querySelector('.popup__form_location_place');
const placeTemplate = document.querySelector('#place-template').content;
const placeSection = document.querySelector('.place');

function openPopupEditForm() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  openPopup(popupEditProfile);
}
function openPopupAddCard() {
  formElementPlace.reset();
  openPopup(popupAddCard);
}
function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupEditProfile);
}
function formSubmitAddPlace(event) {
  event.preventDefault();
  addNewCard(inputTitle.value, inputLink.value);
  closePopup(popupAddCard);
}
function changeLike(event) {
  event.target.classList.toggle('place__like_active');
}
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
function createCard(title, link) {
  const placeElement = placeTemplate
    .querySelector('.place__element')
    .cloneNode(true);
  const placeElementImage = placeElement.querySelector('.place__image');
  placeElement.querySelector('.place__name-city').textContent = title;
  placeElementImage.src = link;
  placeElementImage.alt = title;
  placeElementImage.addEventListener('click', (item) => {
    const srcImage = item.target.src;
    const nameCity = item.target
      .closest('.place__element')
      .querySelector('.place__name-city').textContent;
    popupViewImageCardImage.src = srcImage;
    popupViewImageCardImage.alt = nameCity;
    popupViewImageDescription.textContent = nameCity;
    openPopup(popupViewImage);
  });
  placeElement
    .querySelector('.place__like')
    .addEventListener('click', changeLike);
  placeElement
    .querySelector('.place__button-remove')
    .addEventListener('click', (item) => {
      item.target.closest('.place__element').remove();
    });
  return placeElement;
}
function renderCard(card) {
  placeSection.prepend(card);
}
function addNewCard(title, link) {
  const newCard = createCard(title, link);
  renderCard(newCard);
}

function showInputError(formElement, inputElement, textError) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = textError;
  inputElement.classList.add('popup__input_type_error');
  errorElement.classList.add('popap__input-error_active');
}
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popap__input-error_active');
  errorElement.textContent = '';
}
function checkInputValidaty(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
function setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      checkInputValidaty(formElement, inputItem);
      toggleButtonState(inputList, buttonElement);
    });
  });
}
function hasInvalidInput(inputList) {
  return inputList.some((inputItem) => {
    return !inputItem.validity.valid;
  });
}
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive');
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove('popup__button_inactive');
    buttonElement.removeAttribute('disabled');
  }
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListener(formElement);
  });
}

enableValidation();

initialCards.reverse().forEach((card) => {
  addNewCard(card.name, card.link);
});

btnOpenPopupEditForm.addEventListener('click', openPopupEditForm);
btnOpenPopupAddCard.addEventListener('click', openPopupAddCard);
btnClosePopupEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
btnClosePopupAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});
btnClosePopupViewImage.addEventListener('click', () => {
  closePopup(popupViewImage);
});
formElementProfile.addEventListener('submit', formSubmitHandler);
formElementPlace.addEventListener('submit', formSubmitAddPlace);
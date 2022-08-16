import Card from './card.js';
import FormValidator from './validate.js';
import { Popup, PopupWithImage } from './popup.js';
import initialCards from './initial-cards.js';
import objectSettings from './object-settings.js';
// const popupEditProfile = document.querySelector('.popup_type_profile');
// const popupAddCard = document.querySelector('.popup_type_place');
// const popupViewImage = document.querySelector('.popup_type_image');

// const btnClosePopupEditProfile = document.querySelector(
//   '.popup__close-icon_location_profile'
// );
// const btnClosePopupAddCard = document.querySelector(
//   '.popup__close-icon_location_place'
// );
// const btnClosePopupViewImage = document.querySelector(
//   '.popup__close-icon_location_image'
// );
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
const placeSection = document.querySelector('.place');
const templateSelector = '#place-template';
const validateFormElementProfile = new FormValidator(
  objectSettings,
  formElementProfile
);
const validateFormElementPlace = new FormValidator(
  objectSettings,
  formElementPlace
);

const popupEditProfile = new Popup('.popup_type_profile');
const popupAddCard = new Popup('.popup_type_place');
const popupViewImage = new PopupWithImage('.popup_type_image');

function openPopupEditForm() {
  validateFormElementProfile.hideError();
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  validateFormElementProfile.enableValidation();
  popupEditProfile.open();
}
function openPopupAddCard() {
  validateFormElementPlace.hideError();
  formElementPlace.reset();
  validateFormElementPlace.enableValidation();
  popupAddCard.open()
}
function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  popupEditProfile.close();
}
// function closePopupOverlay(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup(evt.currentTarget);
//   }
// }
// function closePopapEsc(evt) {
//   if (evt.key === 'Escape') {
//     document.removeEventListener('keydown', closePopapEsc);
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   }
// }
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopapEsc);
//   popup.addEventListener('click', closePopupOverlay);
// }
// function closePopup(popup) {
//   document.removeEventListener('keydown', closePopapEsc);
//   popup.removeEventListener('click', closePopupOverlay);
//   popup.classList.remove('popup_opened');
// }

function handleCardClick(name, link, element) {
  element.addEventListener('click', () => {
    popupViewImage.open(name, link);
  });
}
function addNewCard(data) {
  const newCard = new Card(data, templateSelector, handleCardClick);
  const card = newCard.getCard();
  renderCard(card);
}

function formSubmitAddPlace(event) {
  event.preventDefault();
  const newCardPlace = { name: inputTitle.value, link: inputLink.value };
  addNewCard(newCardPlace);
  popupAddCard.close();
}

initialCards.reverse().forEach((card) => {
  addNewCard(card);
});

function renderCard(card) {
  placeSection.prepend(card);
}

btnOpenPopupEditForm.addEventListener('click', openPopupEditForm);
btnOpenPopupAddCard.addEventListener('click', openPopupAddCard);
// btnClosePopupEditProfile.addEventListener('click', () => {
//   closePopup(popupEditProfile);
//   popupEditProfile.close();
//   validateFormElementProfile.hideError();
// });
// btnClosePopupAddCard.addEventListener('click', () => {
//   closePopup(popupAddCard);
//   popupAddCard.close();
//   validateFormElementPlace.hideError();
// });
// btnClosePopupViewImage.addEventListener('click', () => {
//   closePopup(popupViewImage);
//   popupViewImage.close();
// });
formElementProfile.addEventListener('submit', formSubmitHandler);
formElementPlace.addEventListener('submit', formSubmitAddPlace);

// class Section {
//   constructor({ items, renderer }, selectorContainer) {
//     this._items = items;
//     this._renderer = renderer;
//     this._selectorContainer = document.querySelector(selectorContainer);
//   }
//   renderer() {
//     this._items.forEach((item) => {
//       this._renderer(item);
//     });
//   }
//   addItem(element) {
//     this._selectorContainer.append(element);
//   }
// }


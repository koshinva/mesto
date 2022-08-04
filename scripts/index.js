import Card from "./Card.js";
import FormValidator from "./Validate.js";
import initialCards from "./initial-cards.js";
import objectSettings from "./object-settings.js";

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
const placeSection = document.querySelector('.place');
const templateSelector = '#place-template';
const validateFormElementProfile = new FormValidator(objectSettings, formElementProfile);
const validateFormElementPlace = new FormValidator(objectSettings, formElementPlace);

function openPopupEditForm() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  validateFormElementProfile.enableValidation();
  openPopup(popupEditProfile);
}
function openPopupAddCard() {
  formElementPlace.reset();
  validateFormElementPlace.enableValidation();
  openPopup(popupAddCard);
}
function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupEditProfile);
}
function closePopupOverlay(popup) {
  popup.addEventListener('click', (evt) => {
    if (
      !evt.target.closest('.popup__body') &&
      !evt.target.closest('.popup__image-container')
    ) {
      closePopup(popup);
    }
  });
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener(
    'keydown',
    function closePopapEsc(evt) {
      if (evt.key === 'Escape') {
        document.removeEventListener('keydown', closePopapEsc, false);
        closePopup(popup);
      }
    },
    false
  );

  closePopupOverlay(popup);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleCardClick(name, link, element) {
  element.addEventListener('click', () => {
    popupViewImageCardImage.src = link;
    popupViewImageCardImage.alt = name;
    popupViewImageDescription.textContent = name;
    openPopup(popupViewImage);
  })
}
function addNewCard(data) {
  const newCard = new Card(data, templateSelector, handleCardClick);
  const card = newCard.getCard();
  renderCard(card);
}

function formSubmitAddPlace(event) {
  event.preventDefault();
  const newCardPlace = {name: inputTitle.value, link: inputLink.value};
  addNewCard(newCardPlace);
  closePopup(popupAddCard);
}

initialCards.reverse().forEach((card) => {
  addNewCard(card);
});

function renderCard(card) {
  placeSection.prepend(card);
}

btnOpenPopupEditForm.addEventListener('click', openPopupEditForm);
btnOpenPopupAddCard.addEventListener('click', openPopupAddCard);
btnClosePopupEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
  validateFormElementProfile.hideError();
});
btnClosePopupAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
  validateFormElementPlace.hideError();
});
btnClosePopupViewImage.addEventListener('click', () => {
  closePopup(popupViewImage);
});
formElementProfile.addEventListener('submit', formSubmitHandler);
formElementPlace.addEventListener('submit', formSubmitAddPlace);
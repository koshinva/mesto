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
  enableValidation(objectSettings);
  openPopup(popupEditProfile);
}
function openPopupAddCard() {
  formElementPlace.reset();
  enableValidation(objectSettings);
  openPopup(popupAddCard);
}
function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupEditProfile);
}
// function formSubmitAddPlace(event) {
//   event.preventDefault();
//   addNewCard(inputTitle.value, inputLink.value);
//   closePopup(popupAddCard);
// }
// function changeLike(event) {
//   event.target.classList.toggle('place__like_active');
// }
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
// function createCard(title, link) {
//   const placeElement = placeTemplate
//     .querySelector('.place__element')
//     .cloneNode(true);
//   const placeElementImage = placeElement.querySelector('.place__image');
//   placeElement.querySelector('.place__name-city').textContent = title;
//   placeElementImage.src = link;
//   placeElementImage.alt = title;
//   placeElementImage.addEventListener('click', (item) => {
//     const srcImage = item.target.src;
//     const nameCity = item.target
//       .closest('.place__element')
//       .querySelector('.place__name-city').textContent;
//     popupViewImageCardImage.src = srcImage;
//     popupViewImageCardImage.alt = nameCity;
//     popupViewImageDescription.textContent = nameCity;
//     openPopup(popupViewImage);
//   });
//   placeElement
//     .querySelector('.place__like')
//     .addEventListener('click', changeLike);
//   placeElement
//     .querySelector('.place__button-remove')
//     .addEventListener('click', (item) => {
//       item.target.closest('.place__element').remove();
//     });
//   return placeElement;
// }
// function renderCard(card) {
//   placeSection.prepend(card);
// }
// function addNewCard(title, link) {
//   const newCard = createCard(title, link);
//   renderCard(newCard);
// }

// initialCards.reverse().forEach((card) => {
//   addNewCard(card.name, card.link);
// });

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

class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const placeTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.place__element')
      .cloneNode(true);
    return placeTemplate;
  }

  _changeLike = () => {
    this._card.querySelector('.place__like').classList.toggle('place__like_active');
  }

  _deleteCard = () => {
    this._card.remove();
  }

  _setEventListener() {
    this._card.querySelector('.place__like').addEventListener('click', this._changeLike);
    this._card.querySelector('.place__button-remove').addEventListener('click', this._deleteCard);
    this._handleCardClick(this._name, this._link, this._card.querySelector('.place__image'));
  }

  _createCard() {
    this._card = this._getTemplate();
    this._setEventListener();
    const placeElementImage = this._card.querySelector('.place__image');
    const placeElementName = this._card.querySelector('.place__name-city');
    placeElementName.textContent = this._name;
    placeElementImage.src = this._link;
    placeElementImage.alt = this._name;
  }

  getCard() {
    this._createCard();
    return this._card;
  }
}

const templateSelector = '#place-template';

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

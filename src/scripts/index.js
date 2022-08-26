import '../pages/index.css';
import Card from './components/card.js';
import FormValidator from './components/validate.js';
import Section from './components/section.js';
import UserInfo from './components/userInfo.js';
import PopupWithImage from './components/popupWithImage.js';
import PopupWithForm from './components/popupWithForm.js';
import initialCards from './initial-cards.js';
import objectSettings from './object-settings.js';
import {
  selectorContainer,
  btnOpenPopupEditForm,
  btnOpenPopupAddCard,
  inputName,
  inputProfession,
  formElementProfile,
  formElementPlace,
  templateSelector,
} from './constants.js';

const validateFormElementProfile = new FormValidator(
  objectSettings,
  formElementProfile
);
const validateFormElementPlace = new FormValidator(
  objectSettings,
  formElementPlace
);
const userInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorProfession: '.profile__profession',
});

const cardList = new Section(
  {
    items: getCardInfo(),
    renderer: (item) => {
      const card = createCard(item, templateSelector, handleCardClick);
      cardList.addItem(card);
    },
  },
  selectorContainer
);

const popupEditProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: ({ name, profession }) => {
    userInfo.setUserInfo(name, profession);

    popupEditProfile.close();
  },
});
const popupAddCard = new PopupWithForm('.popup_type_place', {
  handleFormSubmit: ({ title, link }) => {
    const card = createCard(
      { name: title, link: link },
      templateSelector,
      handleCardClick
    );
    cardList.addItem(card);
    popupAddCard.close();
  },
});
const popupViewImage = new PopupWithImage(
  '.popup_type_image',
  '.popup__image',
  '.popup__image-description'
);

function createCard(data, templateSelector, handleCardClick) {
  const newCard = new Card(data, templateSelector, handleCardClick);
  const card = newCard.getCard();
  return card;
}
function openPopupEditForm() {
  validateFormElementProfile.hideError();
  const dataUserInfo = userInfo.getUserInfo();
  inputName.value = dataUserInfo.name;
  inputProfession.value = dataUserInfo.profession;
  validateFormElementProfile.checkButton();
  popupEditProfile.open();
}
function openPopupAddCard() {
  validateFormElementPlace.hideError();
  formElementPlace.reset();
  validateFormElementPlace.checkButton();
  popupAddCard.open();
}
function handleCardClick(name, link) {
  popupViewImage.open(name, link);
}

btnOpenPopupEditForm.addEventListener('click', openPopupEditForm);
btnOpenPopupAddCard.addEventListener('click', openPopupAddCard);

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupViewImage.setEventListeners();

validateFormElementProfile.enableValidation();
validateFormElementPlace.enableValidation();

cardList.renderer();

// async function getInfo() {
//   const resp = await fetch('https://nomoreparties.co/v1/cohort-49/users/me', {
//     headers: {
//       authorization: 'eca0b75c-d6e7-4d32-8bb7-efde9f6a94ee'
//     }
//   });
//   const info  = await resp.json();
//   console.log(info)
// }

// getInfo();

async function getCardInfo() {
  try {
    const resp = await fetch('https://mesto.nomoreparties.co/v1/cohort-49/cards', {
      headers: { authorization: 'eca0b75c-d6e7-4d32-8bb7-efde9f6a94ee' },
    });
    const data = await resp.json();
    return data;
  } catch(e) {
    console.log('Ошибка загрузки карточек')
  }
}
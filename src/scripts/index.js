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
  templateSelector
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
    items: initialCards.reverse(),
    renderer: (item) => {
      const newCard = new Card(item, templateSelector, handleCardClick);
      const card = newCard.getCard();
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
    const newCard = new Card(
      { name: title, link: link },
      templateSelector,
      handleCardClick
    );
    const card = newCard.getCard();
    cardList.addItem(card);
    popupAddCard.close();
  },
});
const popupViewImage = new PopupWithImage('.popup_type_image');

function openPopupEditForm() {
  validateFormElementProfile.hideError();
  const dataUserInfo = userInfo.getUserInfo();
  inputName.value = dataUserInfo.name;
  inputProfession.value = dataUserInfo.profession;
  validateFormElementProfile.enableValidation();
  popupEditProfile.open();
}
function openPopupAddCard() {
  validateFormElementPlace.hideError();
  formElementPlace.reset();
  validateFormElementPlace.enableValidation();
  popupAddCard.open();
}
function handleCardClick(name, link, element) {
  element.addEventListener('click', () => {
    popupViewImage.open(name, link);
  });
}

btnOpenPopupEditForm.addEventListener('click', openPopupEditForm);
btnOpenPopupAddCard.addEventListener('click', openPopupAddCard);

cardList.renderer();

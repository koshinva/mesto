import '../pages/index.css';
import Card from './components/card.js';
import FormValidator from './components/validate.js';
import Section from './components/section.js';
import UserInfo from './components/userInfo.js';
import PopupWithImage from './components/popupWithImage.js';
import PopupWithForm from './components/popupWithForm.js';
import PopupWithDeleteCard from './components/popupWithDeleteCard.js';
import Api from './components/api.js';
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

const api = new Api();
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

api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data.name, data.about);
});
const cardList = new Section(
  {
    items: api.getCardInfo(),
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
    api.editProfile(name, profession);
    popupEditProfile.close();
  },
});
const popupAddCard = new PopupWithForm('.popup_type_place', {
  handleFormSubmit: ({ title, link }) => {
    api.addNewCard(title, link).then((data) => {
      const card = createCard(data, templateSelector, handleCardClick);
      cardList.addItem(card);
    });
    popupAddCard.close();
  },
});
const popupViewImage = new PopupWithImage(
  '.popup_type_image',
  '.popup__image',
  '.popup__image-description'
);
const popupDeleteCard = new PopupWithDeleteCard('.popup_type_delete-card', {
  deleteCard: function () {
    console.log('попап удаления карточки');
  },
});

function createCard(data, templateSelector, handleCardClick) {
  const newCard = new Card(data, templateSelector, "28600ea3ec9a1bf34f02e0a3", {
    handleCardClick: handleCardClick,
    removeCard: () => {
      popupDeleteCard.open();
      return popupDeleteCard.promiseDeleteCard();
    },
    deleteCardServer: api.deleteCard,
    likeCardServer: api.likeCard,
    disLikeCardServer: api.disLikeCard
  });
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
popupDeleteCard.setEventListeners();

validateFormElementProfile.enableValidation();
validateFormElementPlace.enableValidation();

cardList.renderer();
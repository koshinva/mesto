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
  btnOpenPopupChangeAvatar,
  inputName,
  inputProfession,
  inputAvatarUrl,
  formElementProfile,
  formElementPlace,
  formElementAvatar,
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
const validateFormElementAvatar = new FormValidator(
  objectSettings,
  formElementAvatar
);

const userInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorProfession: '.profile__profession',
  selectorAvatar: '.profile__avatar',
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
    popupEditProfile.renderLoading(false, 'Сохранить');
    popupEditProfile.close();
  },
});
const popupAddCard = new PopupWithForm('.popup_type_place', {
  handleFormSubmit: ({ title, link }) => {
    api.addNewCard(title, link).then((data) => {
      const card = createCard(data, templateSelector, handleCardClick);
      cardList.addItem(card);
    });
    popupAddCard.renderLoading(false, 'Создать');
    popupAddCard.close();
  },
});
const popupViewImage = new PopupWithImage(
  '.popup_type_image',
  '.popup__image',
  '.popup__image-description'
);
const popupDeleteCard = new PopupWithDeleteCard('.popup_type_delete-card');
const popupChangeAvatar = new PopupWithForm('.popup_type_change-avatar', {
  handleFormSubmit: ({ avatar }) => {
    api.apdateAvatar(avatar);
    userInfo.setUserAvatar(avatar);
    popupChangeAvatar.renderLoading(false, 'Сохранить');
    popupChangeAvatar.close();
  },
});

function createCard(data, templateSelector, handleCardClick) {
  const newCard = new Card(data, templateSelector, userInfo.getUserId(), {
    handleCardClick: handleCardClick,
    removeCard: () => handleCardDelete(newCard),
    likeCardServer: api.likeCard,
    disLikeCardServer: api.disLikeCard,
  });
  const card = newCard.getCard();
  return card;
}
function handleCardDelete(card) {
  popupDeleteCard.setPopupHandler(() => {
    api
      .deleteCard(card._idCard)
      .then(() => {
        card.deleteCard();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  popupDeleteCard.open();
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
function openPopupChangeAvatar() {
  validateFormElementAvatar.hideError();
  inputAvatarUrl.value = userInfo.getUserAvatar();
  validateFormElementAvatar.checkButton();
  popupChangeAvatar.open();
}
function handleCardClick(name, link) {
  popupViewImage.open(name, link);
}

btnOpenPopupEditForm.addEventListener('click', openPopupEditForm);
btnOpenPopupAddCard.addEventListener('click', openPopupAddCard);
btnOpenPopupChangeAvatar.addEventListener('click', openPopupChangeAvatar);

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupViewImage.setEventListeners();
popupDeleteCard.setEventListeners();
popupChangeAvatar.setEventListeners();

validateFormElementProfile.enableValidation();
validateFormElementPlace.enableValidation();
validateFormElementAvatar.enableValidation();

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setUserAvatar(data.avatar);
    userInfo.setUserId(data._id);
  })
  .then(() => {
    cardList.renderer();
  });

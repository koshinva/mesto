import '../pages/index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithDeleteCard from '../scripts/components/PopupWithDeleteCard.js';
import Api from '../scripts/components/Api.js';
import objectSettings from '../scripts/utils/object-settings.js';
import {
  selectorContainer,
  btnOpenPopupEditForm,
  btnOpenPopupAddCard,
  btnOpenPopupChangeAvatar,
  templateSelector,
} from '../scripts/utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: 'eca0b75c-d6e7-4d32-8bb7-efde9f6a94ee',
    'Content-type': 'application/json',
  },
});

const formValidators = {};

const userInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorProfession: '.profile__profession',
  selectorAvatar: '.profile__avatar',
});

const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
  selectorContainer
);

const popupEditProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: ({ name, profession }) => {
    return api
      .editProfile(name, profession)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
  },
});
const popupAddCard = new PopupWithForm('.popup_type_place', {
  handleFormSubmit: ({ title, link }) => {
    return api
      .addNewCard(title, link)
      .then((data) => {
        const card = createCard(data);
        cardList.addItem(card);
      })
      .catch((err) => {
        console.log(err);
      })
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
    return api
      .apdateAvatar(avatar)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
  },
});

function enableValidation(objectSettings) {
  const formList = Array.from(document.querySelectorAll(objectSettings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(objectSettings, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
};

function createCard(data) {
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
  formValidators['popup__form_location_profile'].hideError();
  const dataUserInfo = userInfo.getUserInfo();
  popupEditProfile.setInputValues(dataUserInfo)
  formValidators['popup__form_location_profile'].checkButton();
  popupEditProfile.open();
}
function openPopupAddCard() {
  formValidators['popup__form_location_place'].hideError();
  formValidators['popup__form_location_place'].checkButton();
  popupAddCard.open();
}
function openPopupChangeAvatar() {
  formValidators['popup__form_location_change-avatar'].hideError();
  formValidators['popup__form_location_change-avatar'].checkButton();
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

enableValidation(objectSettings);

Promise.all([api.getUserInfo(), api.getCardInfo()])
  .then(([userData, cardInfo]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(cardInfo);
  })
  .catch((err) => {
    console.log(err);
  });

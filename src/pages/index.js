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
  inputName,
  inputProfession,
  inputAvatarUrl,
  formElementProfile,
  formElementPlace,
  formElementAvatar,
  templateSelector,
} from '../scripts/utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: 'eca0b75c-d6e7-4d32-8bb7-efde9f6a94ee',
    'Content-type': 'application/json',
  },
});

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
    renderer: (item) => {
      const card = createCard(item, templateSelector, handleCardClick);
      cardList.addItem(card);
    },
  },
  selectorContainer
);

const popupEditProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: ({ name, profession }) => {
    renderLoading(true, popupEditProfile.getButton(), 'Сохранить');
    api
      .editProfile(name, profession)
      .then(() => {
        userInfo.setUserInfo(name, profession);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, popupEditProfile.getButton(), 'Сохранить');
      });
  },
});
const popupAddCard = new PopupWithForm('.popup_type_place', {
  handleFormSubmit: ({ title, link }) => {
    renderLoading(true, popupAddCard.getButton(), 'Создать');
    api
      .addNewCard(title, link)
      .then((data) => {
        const card = createCard(data, templateSelector, handleCardClick);
        cardList.addItem(card);
      })
      .then(() => {
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, popupAddCard.getButton(), 'Создать');
      });
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
    renderLoading(true, popupChangeAvatar.getButton(), 'Сохранить');
    api
      .apdateAvatar(avatar)
      .then(() => {
        userInfo.setUserAvatar(avatar);
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, popupChangeAvatar.getButton(), 'Сохранить');
      });
  },
});
function renderLoading(isLoading, buttonPopup, textButtonPopup) {
  if (isLoading) {
    buttonPopup.textContent = 'Сохранение...';
  } else {
    buttonPopup.textContent = textButtonPopup;
  }
}
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

Promise.all([api.getUserInfo(), api.getCardInfo()])
  .then(([userData, cardInfo]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    userInfo.setUserId(userData._id)
    cardList.renderItems(cardInfo);
  })
  .catch((err) => {
    console.log(err);
  });

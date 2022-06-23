const editFormProfile = document.querySelector('.popup_type_profile');
const editFormPlace = document.querySelector('.popup_type_place');
const popupOpenImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageDescription = document.querySelector(
  '.popup__image-description'
);
const btnCloseEditFormProfile = document.querySelector(
  '.popup__close-icon_location_profile'
);
const btnCloseEditFormPlace = document.querySelector(
  '.popup__close-icon_location_place'
);
const btnClosePopupImage = document.querySelector(
  '.popup__close-icon_location_image'
);
const btnOpenEditForm = document.querySelector('.profile__button-edit');
const btnAddPlace = document.querySelector('.profile__button-add');
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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

function addElementPlace(card) {
  newCardPlace(card.name, card.link);
}
function openEditFormProfile() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  editFormProfile.classList.add('popup_opened');
}
function openEditFormPlace() {
  inputTitle.value = '';
  inputLink.value = '';
  editFormPlace.classList.add('popup_opened');
}
function openImage(event) {
  popupImage.src = event.target.src;
  popupImageDescription.textContent =
    event.target.parentNode.querySelector('.place__name-city').textContent;
  popupOpenImage.classList.add('popup_opened');
}
function closeEditFormProfile() {
  editFormProfile.classList.remove('popup_opened');
}
function closeEditFormPlace() {
  editFormPlace.classList.remove('popup_opened');
}
function closePopapImage() {
  popupOpenImage.classList.remove('popup_opened');
}
function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closeEditFormProfile();
}
function formSubmitAddPlace(event) {
  event.preventDefault();
  newCardPlace(inputTitle.value, inputLink.value, true)
  closeEditFormPlace();
}
function changeLike(event) {
  event.target.classList.toggle('place__like_active');
}
function removePlace(event) {
  event.target.parentNode.remove();
}
function newCardPlace(title, link, prepend = false) {
  const placeElement = placeTemplate
    .querySelector('.place__element')
    .cloneNode(true);
  placeElement.querySelector('.place__name-city').textContent = title;
  placeElement.querySelector('.place__image').src = link;
  placeElement
    .querySelector('.place__image')
    .addEventListener('click', openImage);
  placeElement
    .querySelector('.place__like')
    .addEventListener('click', changeLike);
  placeElement
    .querySelector('.place__button-remove')
    .addEventListener('click', removePlace);
  if (prepend) {
    placeSection.prepend(placeElement);
  } else {
    placeSection.append(placeElement);
  }
}

initialCards.forEach(addElementPlace);
btnOpenEditForm.addEventListener('click', openEditFormProfile);
btnAddPlace.addEventListener('click', openEditFormPlace);
btnCloseEditFormProfile.addEventListener('click', closeEditFormProfile);
btnCloseEditFormPlace.addEventListener('click', closeEditFormPlace);
btnClosePopupImage.addEventListener('click', closePopapImage);
formElementProfile.addEventListener('submit', formSubmitHandler);
formElementPlace.addEventListener('submit', formSubmitAddPlace);
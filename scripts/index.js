const editFormProfile = document.querySelector('.edit-form_profile');
const editFormPlace = document.querySelector('.edit-form_place');
const btnCloseEditFormProfile = document.querySelector('.edit-form__close-icon_location_profile');
const btnCloseEditFormPlace = document.querySelector('.edit-form__close-icon_location_place')
const btnOpenEditForm = document.querySelector('.profile__button-edit');
const btnAddPlace = document.querySelector('.profile__button-add');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const inputName = document.querySelector('.edit-form__input_value_name');
const inputProfession = document.querySelector(
  '.edit-form__input_value_profession'
);
const formElement = document.querySelector('.edit-form__form');
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
  const placeElement = placeTemplate
    .querySelector('.place__element')
    .cloneNode(true);
  placeElement.querySelector('.place__image').src = card.link;
  placeElement.querySelector('.place__name-city').textContent = card.name;
  placeSection.append(placeElement);
}

function openEditFormProfile() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  editFormProfile.classList.add('edit-form_opened');
}
function openEditFormPlace() {
  editFormPlace.classList.add('edit-form_opened');
}
function closeEditFormProfile() {
  editFormProfile.classList.remove('edit-form_opened');
}
function closeEditFormPlace() {
  editFormPlace.classList.remove('edit-form_opened');
}
function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closeEditForm();
}

initialCards.forEach(addElementPlace);
btnOpenEditForm.addEventListener('click', openEditFormProfile);
btnAddPlace.addEventListener('click', openEditFormPlace);
btnCloseEditFormProfile.addEventListener('click', closeEditFormProfile);
btnCloseEditFormPlace.addEventListener('click', closeEditFormPlace);
formElement.addEventListener('submit', formSubmitHandler);

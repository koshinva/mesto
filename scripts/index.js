let windowEditForm = document.querySelector('.edit-form');
let btnCloseEditForm = document.querySelector('.edit-form__close-icon');
let btnOpenEditForm = document.querySelector('.profile__button-edit');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let inputName = document.querySelector('.edit-form__input_value_name');
let inputProfession = document.querySelector(
  '.edit-form__input_value_profession'
);
let formElement = document.querySelector('.edit-form__form');
const placeTemplate = document.querySelector('#place-template').content;
const placeSection = document.querySelector('.place')


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
  const placeElement = placeTemplate.querySelector('.place__element').cloneNode(true);
  placeElement.querySelector('.place__image').src = card.link;
  placeElement.querySelector('.place__name-city').textContent = card.name;
  placeSection.append(placeElement);
}

function openEditForm() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  windowEditForm.classList.add('edit-form_opened');
}
function closeEditForm() {
  windowEditForm.classList.remove('edit-form_opened');
}
function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closeEditForm();
}

initialCards.forEach(addElementPlace);
btnOpenEditForm.addEventListener('click', openEditForm);
btnCloseEditForm.addEventListener('click', closeEditForm);
formElement.addEventListener('submit', formSubmitHandler);

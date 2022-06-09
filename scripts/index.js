let windowEditForm = document.querySelector('.edit-form');
let btnCloseEditForm = document.querySelector('.edit-form__close-icon');
let btnOpenEditForm = document.querySelector('.profile__button-edit');

btnOpenEditForm.addEventListener('click', openEditForm);
btnCloseEditForm.addEventListener('click', closeEditForm);

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let inputName = document.querySelectorAll('.edit-form__input')[0];
let inputProfession = document.querySelectorAll('.edit-form__input')[1];

function openEditForm() {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  windowEditForm.classList.remove('edit-form_hidden');
}
function closeEditForm() {
  windowEditForm.classList.add('edit-form_hidden');
}

let formElement = document.querySelector('.edit-form__form');
formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closeEditForm();
}

let placeLike = document.querySelectorAll('.place__like');
placeLike.forEach((element) => element.addEventListener('click', changeLike));
function changeLike() {
  if (this.getAttribute('src') === './images/place/like/like-noactive.svg') {
    this.setAttribute('src', './images/place/like/like-active.svg');
  } else {
    this.setAttribute('src', './images/place/like/like-noactive.svg');
  }
}

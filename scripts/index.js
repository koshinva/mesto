let windowEditForm = document.querySelector('.edit-form');
let btnCloseEditForm = document.querySelector('.edit-form__close-icon');
let btnOpenEditForm = document.querySelector('.profile__button-edit');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let inputName = document.querySelector('.edit-form__input_value_name');
let inputProfession = document.querySelector('.edit-form__input_value_profession');
let formElement = document.querySelector('.edit-form__form');

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

btnOpenEditForm.addEventListener('click', openEditForm);
btnCloseEditForm.addEventListener('click', closeEditForm);
formElement.addEventListener('submit', formSubmitHandler);
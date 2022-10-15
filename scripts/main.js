const openPopupButton = document.querySelector('.profile__edit-btn');
const form = document.querySelector('.pop-up__form');
const inputName = form.querySelector('#pop-up__name');
const inputText = form.querySelector('#pop-up__text');
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');
const closePopup = document.querySelectorAll('.pop-up');
const closePopupButton = document.querySelector('.pop-up__close-btn');

const openAddBtn = document.querySelector('.profile__add-button');
const removeAddBtn = document.querySelector('.pop-up_add-btn');

let closePopupArr = Array.from(closePopup);

openPopupButton.addEventListener('click', function () {
  closePopupArr[0].classList.remove('pop-up_close');
  inputName.value = titleProfile.textContent;
  inputText.value = subtitleProfile.textContent;
});

openAddBtn.addEventListener('click', function () {
  closePopupArr[1].classList.remove('pop-up_add-btn');
});

closePopupButton.addEventListener('click', function () {
  closePopupArr[0].classList.add('pop-up_close');
});

form.addEventListener('submit', function formSubmitHandler(event) {
  event.preventDefault();
  if (inputName.value === '') {
    titleProfile.textContent = 'Жак-Ив Кусто';
  } else {
    titleProfile.textContent = inputName.value;
  }

  if (inputText.value === '') {
    subtitleProfile.textContent = 'Исследователь океана';
  } else {
    subtitleProfile.textContent = inputText.value;
  }
  
  closePopupArr[0].classList.add('pop-up_close');
});

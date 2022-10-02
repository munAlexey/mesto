let openPopupButton = document.querySelector('.profile__edit-btn');

openPopupButton.addEventListener('click', function () {
  let openPopup = document.querySelector('.pop-up');
  openPopup.classList.remove('pop-up__close');
});

let closePopupButton = document.querySelector('.pop-up__close-btn');
let closePopup = document.querySelector('.pop-up');

closePopupButton.addEventListener('click', function () {
  closePopup.classList.add('pop-up__close');
});

let form = document.querySelector('.pop-up__form');

let inputName = form.querySelector('#pop-up__name');
let inputText = form.querySelector('#pop-up__text');
let titleProfile = document.querySelector('.profile__title');
let subtitleProfile = document.querySelector('.profile__subtitle');
let formBtn = form.querySelector('.pop-up__button');

formBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (inputName.value === '') {
    titleProfile.textContent = 'Жак-Ив Кусто';
    closePopup.classList.add('pop-up__close');
  } else {
    titleProfile.textContent = inputName.value;
    closePopup.classList.add('pop-up__close');
  }

  if (inputText.value === '') {
    subtitleProfile.textContent = 'Исследователь океана';
    closePopup.classList.add('pop-up__close');
  } else {
    subtitleProfile.textContent = inputText.value;
    closePopup.classList.add('pop-up__close');
  }
});



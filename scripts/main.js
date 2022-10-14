const openPopupButton = document.querySelector('.profile__edit-btn');
const form = document.querySelector('.pop-up__form');
const inputName = form.querySelector('#pop-up__name');
const inputText = form.querySelector('#pop-up__text');
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');

openPopupButton.addEventListener('click', function () {
  let openPopup = document.querySelector('.pop-up');
  openPopup.classList.remove('pop-up_close');
  inputName.value = titleProfile.textContent;
  inputText.value = subtitleProfile.textContent;
});

const closePopupButton = document.querySelector('.pop-up__close-btn');
const closePopup = document.querySelector('.pop-up');

closePopupButton.addEventListener('click', function () {
  closePopup.classList.add('pop-up_close');
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
  
  closePopup.classList.add('pop-up_close');
});

// let heart = document.querySelectorAll('.cards__like-btn');

// for (let i = 0; i < heart.length; i++) {
//   heart[i].addEventListener('click', function() {
//     heart[i].classList.toggle('cards__like-btn_state_active');
//   });
// };
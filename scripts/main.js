let openPopupButton = document.querySelector('.profile__edit-btn');
let form = document.querySelector('.pop-up__form');
let inputName = form.querySelector('#pop-up__name');
let inputText = form.querySelector('#pop-up__text');
let titleProfile = document.querySelector('.profile__title');
let subtitleProfile = document.querySelector('.profile__subtitle');

openPopupButton.addEventListener('click', function () {
  let openPopup = document.querySelector('.pop-up');
  openPopup.classList.remove('pop-up_close');
  inputName.value = titleProfile.textContent;
  inputText.value = subtitleProfile.textContent;
});

let closePopupButton = document.querySelector('.pop-up__close-btn');
let closePopup = document.querySelector('.pop-up');

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
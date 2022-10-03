let openPopupButton = document.querySelector('.profile__edit-btn');

openPopupButton.addEventListener('click', function () {
  let openPopup = document.querySelector('.pop-up');
  openPopup.classList.remove('pop-up-close');
});

let closePopupButton = document.querySelector('.pop-up__close-btn');
let closePopup = document.querySelector('.pop-up');

closePopupButton.addEventListener('click', function () {
  closePopup.classList.add('pop-up-close');
});

let form = document.querySelector('.pop-up__form');

let inputName = form.querySelector('#pop-up__name');
let inputText = form.querySelector('#pop-up__text');
let titleProfile = document.querySelector('.profile__title');
let subtitleProfile = document.querySelector('.profile__subtitle');
let formBtn = form.querySelector('.pop-up__button');

formBtn.addEventListener('click', function formSubmitHandler(event) {
  event.preventDefault();
  if (inputName.value === '') {
    titleProfile.textContent = 'Жак-Ив Кусто';
    closePopup.classList.add('pop-up-close');
  } else {
    titleProfile.textContent = inputName.value;
    closePopup.classList.add('pop-up-close');
  }

  if (inputText.value === '') {
    subtitleProfile.textContent = 'Исследователь океана';
    closePopup.classList.add('pop-up-close');
  } else {
    subtitleProfile.textContent = inputText.value;
    closePopup.classList.add('pop-up-close');
  }
});

let heart = document.querySelectorAll('.cards__like-btn');
console.log(heart);

for (let i = 0; i < heart.length; i++) {
  heart[i].addEventListener('click', function() {
    heart[i].classList.add('cards__like-btn_state_active');
  });
};

form.addEventListener('submit', formSubmitHandler); 
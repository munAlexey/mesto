let openPopupButton = document.querySelector('.profile__edit-btn');

openPopupButton.addEventListener('click', function () {
  let openPopup = document.querySelector('.pop-up');
  openPopup.classList.remove('pop-up__close');
});

let closePopupButton = document.querySelector('.pop-up__close-btn');

closePopupButton.addEventListener('click', function () {
  let closePopup = document.querySelector('.pop-up');
  closePopup.classList.add('pop-up__close');
});
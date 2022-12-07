export const popups = Array.from(document.querySelectorAll('.pop-up'));
export const popupCards = document.querySelector('.pop-up_cards');
export const buttonEditProfile = document.querySelector('.profile__edit-btn');
export const formProfile = document.forms.formProfile;
export const inputName = formProfile.querySelector('#pop-up__name');
export const inputText = formProfile.querySelector('#pop-up__text');
export const titleProfile = document.querySelector('.profile__title');
export const subtitleProfile = document.querySelector('.profile__subtitle');
export const popupProfile = document.querySelector('.pop-up_profile');
export const popupFullCards = document.querySelector('.pop-up_cards');

export const cardsList = document.querySelector('.cards__list');
export const inputTitle = document.querySelector('#pop-up__title');
export const inputLink = document.querySelector('#pop-up__link');
export const cardsFullImg = document.querySelector('.pop-up__card-full-img');
export const cardsFullTitle = document.querySelector('.pop-up__card-full-title'); 

 // Форма добавления карточки

export const profileAddBtn = document.querySelector('.profile__add-button');
export const popupAddCard = document.querySelector('.pop-up_add');
export const formAddCard = document.forms.formAdd;
export const formSubmitButton = formAddCard.querySelector('.pop-up__button');

export const configValidation = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  errorClass: 'pop-up__span-error',
  inputErrorClass: 'pop-up__input_type_error',
};

// Шесть карточек «из коробки»

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
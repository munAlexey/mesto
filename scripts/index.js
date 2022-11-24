
import Card from '../scripts/card.js';
import FormValidator from './validate.js'

const popups = Array.from(document.querySelectorAll('.pop-up'));
const popupCards = document.querySelector('.pop-up_cards');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const formProfile = document.forms.formProfile;
const inputName = formProfile.querySelector('#pop-up__name');
const inputText = formProfile.querySelector('#pop-up__text');
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');
const popupProfile = document.querySelector('.pop-up_profile');
const closeProfileButton = document.querySelector('.pop-up__close-btn');


const cardsList = document.querySelector('.cards__list');

const inputTitle = document.querySelector('#pop-up__title');
const inputLink = document.querySelector('#pop-up__link');

const cardsFullImg = document.querySelector('.pop-up__card-full-img');
const cardsFullTitle = document.querySelector('.pop-up__card-full-title');

// Форма добавления карточки

const profileAddBtn = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.pop-up_add');
const formAddCard = document.forms.formAdd;
const formSubmitButton = formAddCard.querySelector('.pop-up__button');

const arrayConfigValidation = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  errorClass: 'pop-up__span-error',
  inputErrorClass: 'pop-up__input_type_error',
};

// Шесть карточек «из коробки»

const initialCards = [
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

const closePopupButton = Array.from(document.querySelectorAll('.pop-up__close-btn'));
closePopupButton.forEach((element) => {
  element.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.pop-up'));
  });
});

const openPopupSmoothly = (openPopupBlock) => {
  openPopupBlock.classList.remove('action_close');
  openPopupBlock.classList.add('action_open');
};

const closePopupSmoothly = (closePopupBlock) => {
  closePopupBlock.classList.add('action_close');
  closePopupBlock.classList.remove('action_open');
};

const createCard = (objCard) => {
  const card = new Card(objCard, '#item', (data) => {
    openPopUp(popupCards);
    cardsFullImg.src = data.link;
    cardsFullImg.alt = data.name;
    cardsFullTitle.textContent = data.name;
  });
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
}

const openPopUp = (popupClass) => {
  popupClass.classList.add('pop-up_opened');
  openPopupSmoothly(popupClass);
  addPopupKey();
};

const closePopup = (popupClass) => {
  popupClass.classList.remove('pop-up_opened');
  closePopupSmoothly(popupClass);
  removePopupKey();
};

const handleEscClose = (evt) => {
  const key = evt.key;
  if (key === 'Escape') {
    const popupOpened = document.querySelector('.pop-up_opened');
    closePopup(popupOpened);
  };
}

const addPopupKey = () => {
  document.addEventListener('keydown', handleEscClose);
}

const removePopupKey = () => {
  document.removeEventListener('keydown', handleEscClose);
}

const closePopupOutside = (popupElement) => {
  popupElement.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target === popupElement) {
      closePopup(popupElement);
    };
  });
}

const initClosePopupByClickOutside= () => {
  popups.forEach(popupElement => {
    closePopupOutside(popupElement);
  });
};

buttonEditProfile.addEventListener('click', function () {
  openPopUp(popupProfile);
  inputName.value = titleProfile.textContent;
  inputText.value = subtitleProfile.textContent;
});

formProfile.addEventListener('submit', function createFormProfile(event) {
  event.preventDefault();
  titleProfile.textContent = inputName.value;
  subtitleProfile.textContent = inputText.value;

  closePopup(popupProfile);
});

initialCards.forEach(function (item) {
  createCard(item);
});
    
const formValidatorCard = new FormValidator(arrayConfigValidation, formAddCard);

const formValidatorProfile = new FormValidator(arrayConfigValidation, formProfile);

formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();

profileAddBtn.addEventListener('click', function () {
  openPopUp(popupAddCard);
  formSubmitButton.setAttribute('disabled', 'disabled');
  formSubmitButton.classList.add(arrayConfigValidation.inactiveButtonClass);
  inputTitle.value = '';
  inputLink.value = '';
});

formAddCard.addEventListener('submit', function formSubmitHandler(event) {
  event.preventDefault();
  const inputObjCard = {
    name: inputTitle.value,
    link: inputLink.value
  };
  createCard(inputObjCard);
  
  closePopup(popupAddCard);
});

initClosePopupByClickOutside();
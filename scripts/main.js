const popups = Array.from(document.querySelectorAll('.pop-up'));
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const formProfile = document.forms.formProfile;
const inputName = formProfile.querySelector('#pop-up__name');
const inputText = formProfile.querySelector('#pop-up__text');
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');
const popupProfile = document.querySelector('.pop-up_profile');
const closeProfileButton = document.querySelector('.pop-up__close-btn');

const cardsTemplate = document.querySelector('#item').content;
const cardsList = document.querySelector('.cards__list');

const inputTitle = document.querySelector('#pop-up__title');
const inputLink = document.querySelector('#pop-up__link');

// Форма добавления карточки

const profileAddBtn = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.pop-up_add');
const popupCloseCardBtn = popupAddCard.querySelector('.pop-up__close-btn');
const formAddCard = document.forms.formAdd;
const formSubmitButton = formAddCard.querySelector('.pop-up__button');

// Открытие попапа с картинкой

const popupCards = document.querySelector('.pop-up_cards');
const cardImg = cardsList.querySelector('.card__img');
const cardsFullImg = popupCards.querySelector('.pop-up__card-full-img');
const cardsFullTitle = popupCards.querySelector('.pop-up__card-full-title');
const cardsFullCloseBtn = popupCards.querySelector('.pop-up__close-btn'); 

const arrayClasses = {
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

const clickClose = (closePopupClass) => {
  closePopup(closePopupClass);
};

const closePopupButton = Array.from(document.querySelectorAll('.pop-up__close-btn'));
closePopupButton.forEach((element) => {
  element.addEventListener('click', (evt) => {
    target = evt.target;
    clickClose(target.closest('.pop-up'));
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

const openPopUp = (popupClass) => {
  popupClass.classList.remove('pop-up_opened');
  addPopupKey();
};

const closePopup = (popupClass) => {
  popupClass.classList.add('pop-up_opened');
  removePopupKey();
};

const createCard = (title, link) => {
  const cardsItem = cardsTemplate.querySelector('.card').cloneNode(true); 
  const cardsImg = cardsItem.querySelector('.card__img');
  const likeBtn = cardsItem.querySelector('.card__like-btn');
  const deletBtn = cardsItem.querySelector('.card__delete');
  const cardsTitle = cardsItem.querySelector('.card__title');

  cardsTitle.textContent = title;
  cardsImg.src = link;
  cardsImg.alt = title;

  // Лайк карточки

  likeBtn.addEventListener('click', () => {
    cardsItem.querySelector('.card__like-btn').classList.toggle('card__like-btn_state_active');
  });

  // Удаление карточки

  deletBtn.addEventListener('click', () => {
    deletBtn.closest('.card').remove();
  });
  
  // Открытие попапа с картинкой

  cardsImg.addEventListener('click', function () {
    openPopUp(popupCards);
    openPopupSmoothly(popupCards);
    

    cardsFullImg.src = link;
    cardsFullImg.alt = title;
    cardsFullTitle.textContent = title;
  });

  return cardsItem;
};

const renderCard = (item) => {
  cardsList.prepend(item);
};

const handleEscClose = (evt) => {
  const key = evt.key;
  if (key === 'Escape') {
    popups.forEach((popup) => {
      if(!popup.classList.contains('pop-up_opened')) {
        clickClose(popup);
        closePopupSmoothly(popup);
      };
    })
  };
}

const addPopupKey = () => {
  document.addEventListener('keydown', handleEscClose);
}

const removePopupKey = () => {
  document.removeEventListener('keydown', handleEscClose);
}

const closePopupOutside = (formElement) => {
  formElement.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target === formElement) {
      clickClose(formElement);
      closePopupSmoothly(formElement);
    };
  });
}

const closePopups = () => {
  popups.forEach(formElement => {
    closePopupOutside(formElement);
    removePopupKey();
  });
};

buttonEditProfile.addEventListener('click', function () {
  openPopUp(popupProfile);
  openPopupSmoothly(popupProfile);
});

inputName.value = titleProfile.textContent;
inputText.value = subtitleProfile.textContent;

closeProfileButton.addEventListener('click', function () {
  closePopupSmoothly(popupProfile);
  removePopupKey();
  inputName.value = titleProfile.textContent;
  inputText.value = subtitleProfile.textContent;
});

formProfile.addEventListener('submit', function createFormProfile(event) {
  event.preventDefault();
  titleProfile.textContent = inputName.value;
  subtitleProfile.textContent = inputText.value;

  closePopupSmoothly(popupProfile);
  closePopup(popupProfile);
});

initialCards.forEach(function (item) {
  renderCard(createCard(item.name, item.link));
});

profileAddBtn.addEventListener('click', function () {
  openPopUp(popupAddCard);
  openPopupSmoothly(popupAddCard);
  enableButton(formSubmitButton, arrayClasses);
});

popupCloseCardBtn.addEventListener('click', function () {
  closePopupSmoothly(popupAddCard);
  removePopupKey();
});

cardsFullCloseBtn.addEventListener('click', function () {
  closePopupSmoothly(popupCards);
  removePopupKey();
});

formAddCard.addEventListener('submit', function formSubmitHandler(event) {
  event.preventDefault();
  renderCard(createCard(inputTitle.value, inputLink.value));
  inputTitle.value = '';
  inputLink.value = '';
  
  closePopupSmoothly(popupAddCard);
  closePopup(popupAddCard);
});

closePopups();
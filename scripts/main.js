const popups = Array.from(document.querySelectorAll('.pop-up'));
const openPopupButton = document.querySelector('.profile__edit-btn');
const formProfile = document.forms.formProfile;
const inputName = formProfile.querySelector('#pop-up__name');
const inputText = formProfile.querySelector('#pop-up__text');
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');
const openPopup = document.querySelector('.pop-up_profile');
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

// Открытие попапа с картинкой

const popupCards = document.querySelector('.pop-up_cards');
const cardImg = cardsList.querySelector('.card__img');
const cardsFullImg = popupCards.querySelector('.card__full-img');
const cardsFullTitle = popupCards.querySelector('.card__full-title');
const cardsFullCloseBtn = popupCards.querySelector('.pop-up__close-btn'); 

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
  setTimeout(() => {
    closePopup(closePopupClass);
  }, 950);
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
};

const closePopup = (popupClass) => {
  popupClass.classList.add('pop-up_opened');
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

  if (cardsTitle.textContent !== title) {
    cardsTitle.textContent = title;
    cardsImg.alt = title;
    cardsImg.src = link;
  }

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
    addPopupKey(popupCards);
    

    cardsFullImg.src = link;
    cardsFullImg.alt = title;
    cardsFullTitle.textContent = title;

    if (cardsFullTitle.textContent !== title) {
      cardsFullImg.src = link;
      cardsFullImg.alt = title;
      cardsFullTitle.textContent = title;
    }
  });

  return cardsItem;
};

const renderCard = (item) => {
  cardsList.prepend(item);
};

const handleEscClose = (evt, formElement) => {
  const key = evt.key;
  if (key === 'Escape') {
    clickClose(formElement);
    closePopupSmoothly(formElement);
  };
}

const addPopupKey = (formElement) => {
  document.addEventListener('keydown', (evt) => {
    handleEscClose(evt, formElement);
  });
}

const removePopupKey = (formElement) => {
  document.removeEventListener('keydown', (evt) => {
    handleEscClose(evt, formElement);
  });
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
    removePopupKey(formElement);
  });
};

openPopupButton.addEventListener('click', function () {
  openPopUp(openPopup);
  openPopupSmoothly(openPopup);
  addPopupKey(openPopup);
});

inputName.value = titleProfile.textContent;
inputText.value = subtitleProfile.textContent;

closeProfileButton.addEventListener('click', function () {
  closePopupSmoothly(openPopup);
  removePopupKey(openPopup);
  setTimeout(() => {
    inputName.value = titleProfile.textContent;
    inputText.value = subtitleProfile.textContent;
  }, 950);
});

formProfile.addEventListener('submit', function formSubmitHandler(event) {
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

  closePopupSmoothly(openPopup);
  removePopupKey(openPopup);
  setTimeout(() => {
    closePopup(openPopup);
  }, 950);
});

initialCards.forEach(function (item) {
  renderCard(createCard(item.name, item.link));
});

profileAddBtn.addEventListener('click', function () {
  openPopUp(popupAddCard);
  openPopupSmoothly(popupAddCard);
  addPopupKey(popupAddCard);
  const formSubmitButton = formAddCard.querySelector('.pop-up__button');
  formSubmitButton.setAttribute('disabled', 'disabled');
  formSubmitButton.classList.add('pop-up__button_disabled');
});

popupCloseCardBtn.addEventListener('click', function () {
  closePopupSmoothly(popupAddCard);
  removePopupKey(popupAddCard);
});

cardsFullCloseBtn.addEventListener('click', function () {
  closePopupSmoothly(popupCards);
  removePopupKey(popupCards);
});

formAddCard.addEventListener('submit', function formSubmitHandler(event) {
  event.preventDefault();
  renderCard(createCard(inputTitle.value, inputLink.value));
  if (inputTitle.value !== '') {
    inputTitle.value = '';
  }

  if (inputLink.value !== '') {
    inputLink.value = '';
  }
  
  closePopupSmoothly(popupAddCard);
  removePopupKey(popupAddCard);
  setTimeout(() => {
    closePopup(popupAddCard);
  }, 950);
});

closePopups();
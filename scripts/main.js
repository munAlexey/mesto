const openPopupButton = document.querySelector('.profile__edit-btn');
const form = document.forms.formProfile;
const inputName = form.querySelector('#pop-up__name');
const inputText = form.querySelector('#pop-up__text');
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');
const openPopup = document.querySelector('.pop-up_profile');
const closeProfileButton = document.querySelector('.pop-up__close-btn');

const cardsTemplate = document.querySelector('#item').content;
const cardsList = document.querySelector('.cards__list');

const inputTitle = document.querySelector('#pop-up__title');
const inputLink = document.querySelector('#pop-up__link');

// Форма добавления карточки

const openAddBtn = document.querySelector('.profile__add-button');
const openAddMenu = document.querySelector('.pop-up_add');
const closeAddBtn = openAddMenu.querySelector('.pop-up__close-btn');
const formAdd = document.forms.formAdd;

// Открытие попапа с картинкой

const fullImg = document.querySelector('.pop-up_cards');
const cardImg = cardsList.querySelector('.cards__img');
const cardsFullImg = fullImg.querySelector('.cards__full-img');
const cardsFullTitle = fullImg.querySelector('.cards__full-title');
const cardsFullCloseBtn = fullImg.querySelector('.pop-up__close-btn'); 

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

const closePopupKey = Array.from(document.querySelectorAll('.pop-up'));
closePopupKey.forEach(formElement => {
  formElement.addEventListener('keydown', (evt) => {
    const key = evt.key;
    if (key === 'Escape') {
      clickClose(formElement);
      closePopupSmoothly(formElement);
    };
  })

  formElement.addEventListener('click', (evt) => {
    const target = evt.target;
    
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
  const cardsItem = cardsTemplate.querySelector('.cards__item').cloneNode(true); 
  const cardsImg = cardsItem.querySelector('.cards__img');
  const likeBtn = cardsItem.querySelector('.cards__like-btn');
  const deletBtn = cardsItem.querySelector('.cards__delete');
  const cardsTitle = cardsItem.querySelector('.cards__title');

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
    cardsItem.querySelector('.cards__like-btn').classList.toggle('cards__like-btn_state_active');
  });

  // Удаление карточки

  deletBtn.addEventListener('click', () => {
    deletBtn.closest('.cards__item').remove();
  });
  
  // Открытие попапа с картинкой

  cardsImg.addEventListener('click', function () {
    openPopUp(fullImg);
    openPopupSmoothly(fullImg);

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

openPopupButton.addEventListener('click', function () {
  openPopUp(openPopup);
  openPopupSmoothly(openPopup);
});

inputName.value = titleProfile.textContent;
inputText.value = subtitleProfile.textContent;

closeProfileButton.addEventListener('click', function () {
  closePopupSmoothly(openPopup);
  setTimeout(() => {
    inputName.value = titleProfile.textContent;
    inputText.value = subtitleProfile.textContent;
  }, 950);
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
  
  closePopupSmoothly(openPopup);
  setTimeout(() => {
    closePopup(openPopup);
  }, 950);
});

initialCards.forEach(function (item) {
  renderCard(createCard(item.name, item.link));
});

openAddBtn.addEventListener('click', function () {
  openPopUp(openAddMenu);
  openPopupSmoothly(openAddMenu);
});

closeAddBtn.addEventListener('click', function () {
  closePopupSmoothly(openAddMenu);
});

cardsFullCloseBtn.addEventListener('click', function () {
  closePopupSmoothly(fullImg);
});

formAdd.addEventListener('submit', function formSubmitHandler(event) {
  event.preventDefault();
  renderCard(createCard(inputTitle.value, inputLink.value));
  if (inputTitle.value !== '') {
    inputTitle.value = '';
  }

  if (inputLink.value !== '') {
    inputLink.value = '';
  }
  
  closePopupSmoothly(openAddMenu);
  setTimeout(() => {
    closePopup(openAddMenu);
  }, 950);
});

enableValidation({
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  errorClass: 'pop-up__span-error',
  inputErrorClass: 'pop-up__input_type_error',
}); 
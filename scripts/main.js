const openPopupButton = document.querySelector('.profile__edit-btn');
const form = document.querySelector('.pop-up__form');
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
const formAdd = document.querySelector('.pop-up__form-add');

// Открытие попапа с картинкой

const fullImg = document.querySelector('.pop-up_cards');
const cardImg = cardsList.querySelector('.cards__img');
const cardsFullImg = fullImg.querySelector('.cards__full-img');
const cardsFullTitle = fullImg.querySelector('.cards__full-title');
const cardsFullCloseBtn = fullImg.querySelector('.pop-up__close-btn'); 

const clickClose = (evt) => {
  setTimeout(() => {
    closePopup(evt.target.closest('.pop-up'));
  }, 950);
}
const closePopupButton = Array.from(document.querySelectorAll('.pop-up__close-btn'));
closePopupButton.forEach((element) => {
  element.addEventListener('click', clickClose);
});

function openPopUp(popupClass) {
  popupClass.classList.remove('pop-up_opened');
};

function closePopup(popupClass) {
  popupClass.classList.add('pop-up_opened');
};

function createCard(title, link) {
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
    fullImg.classList.add('action_open');
    fullImg.classList.remove('action_close');

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
}

function renderCard(item) {
  cardsList.prepend(item);
}


openPopupButton.addEventListener('click', function () {
  openPopUp(openPopup);
  openPopup.classList.add('action_open');
  openPopup.classList.remove('action_close');
});

inputName.value = titleProfile.textContent;
inputText.value = subtitleProfile.textContent;

closeProfileButton.addEventListener('click', function () {
  openPopup.classList.add('action_close');
  openPopup.classList.remove('action_open');
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
  
  openPopup.classList.add('action_close');
  openPopup.classList.remove('action_open');
  setTimeout(() => {
    closePopup(openPopup);
  }, 950);
});

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


initialCards.forEach(function (item) {
  renderCard(createCard(item.name, item.link));
});

openAddBtn.addEventListener('click', function () {
  openPopUp(openAddMenu);
  openAddMenu.classList.add('action_open');
  openAddMenu.classList.remove('action_close');
});

closeAddBtn.addEventListener('click', function () {
  openAddMenu.classList.add('action_close');
  openAddMenu.classList.remove('action_open');
});

cardsFullCloseBtn.addEventListener('click', function () {
  fullImg.classList.add('action_close');
  fullImg.classList.remove('action_open');
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
  
  openAddMenu.classList.add('action_close');
  openAddMenu.classList.remove('action_open');
  setTimeout(() => {
    closePopup(openAddMenu);
  }, 950);
});
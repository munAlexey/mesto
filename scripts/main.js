const openPopupButton = document.querySelector('.profile__edit-btn');
const form = document.querySelector('.pop-up__form');
const inputName = form.querySelector('#pop-up__name');
const inputText = form.querySelector('#pop-up__text');
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');
const openPopup = document.querySelector('.pop-up_profile');
const closePopupButton = document.querySelector('.pop-up__close-btn');

function popupOpen(openBtn, popupClass) {
  openBtn.addEventListener('click', function () {
    popupClass.classList.remove('pop-up_opened');
    popupClass.classList.add('action_open');
    popupClass.classList.remove('action_close');
  });
};

function popupClose(closeBtn, popupClass) {
  closeBtn.addEventListener('click', function () {
    popupClass.classList.add('action_close');
    popupClass.classList.remove('action_open');
    setTimeout(() => {
      popupClass.classList.add('pop-up_opened');
    }, 950);
  });
};

popupOpen(openPopupButton, openPopup);
inputName.value = titleProfile.textContent;
inputText.value = subtitleProfile.textContent;
popupClose(closePopupButton, openPopup);


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
  
  openPopup.classList.add('pop-up_opened');
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

const cardsTemplate = document.querySelector('#item').content;
const cardsList = document.querySelector('.cards__list');

for (let i = 0; i < initialCards.length; i++) {
  const cardsItem = cardsTemplate.querySelector('.cards__item').cloneNode(true);
  cardsItem.querySelector('.cards__title').textContent = initialCards[i].name;
  cardsItem.querySelector('.cards__img').src = initialCards[i].link;
  cardsItem.querySelector('.cards__img').alt = initialCards[i].name;
  cardsList.append(cardsItem);
}

// Форма добавления карточки

const openAddBtn = document.querySelector('.profile__add-button');
const openAddMenu = document.querySelector('.pop-up_add');
const closeAddBtn = openAddMenu.querySelector('.pop-up__close-btn');
const formAdd = document.querySelector('.pop-up__form-add');

popupOpen(openAddBtn, openAddMenu);

popupClose(closeAddBtn, openAddMenu);

const inputTitle = document.querySelector('#pop-up__title');
const inputLink = document.querySelector('#pop-up__link');
const likeBtn = Array.from(document.querySelectorAll('.cards__like-btn'));  // Лайк карточки
const deletBtn = Array.from(document.querySelectorAll('.cards__delete'));  // Удаление карточки

// Открытие попапа с картинкой

const fullImg = document.querySelector('.pop-up_cards');
const cardImg = cardsList.querySelectorAll('.cards__img');
const cardsFullImg = fullImg.querySelector('.cards__full-img');
const cardsFullTitle = fullImg.querySelector('.cards__full-title');
const cardsFullCloseBtn = fullImg.querySelector('.pop-up__close-btn'); 

cardImg.forEach(function(item, index) {
  item.addEventListener('click', function() {
    cardsFullImg.src = initialCards[index].link;
    cardsFullTitle.textContent = initialCards[index].name;
    fullImg.classList.remove('pop-up_opened');
    fullImg.classList.add('action_open');
    fullImg.classList.remove('action_close');
  })
});

popupClose(cardsFullCloseBtn, fullImg);

formAdd.addEventListener('submit', function formSubmitHandler(event) {
  event.preventDefault();

  const cardsItem = cardsTemplate.querySelector('.cards__item').cloneNode(true); 
  const cardsImg = cardsItem.querySelector('.cards__img');
  const likeBtn = cardsItem.querySelector('.cards__like-btn');
  const deletBtn = cardsItem.querySelector('.cards__delete');

  cardsItem.querySelector('.cards__title').textContent = inputTitle.value;
  cardsImg.src = inputLink.value;
  cardsImg.alt = inputTitle.value;

  // Лайк карточки

  likeBtn.addEventListener('click', () => {
    cardsItem.querySelector('.cards__like-btn').classList.toggle('cards__like-btn_state_active');
  });
  cardsList.prepend(cardsItem);
  openAddMenu.classList.add('pop-up_opened');

  // Удаление карточки

  deletBtn.addEventListener('click', () => {
    deletBtn.closest('.cards__item').remove();
  });
  
  // Открытие попапа с картинкой

  popupOpen(cardsImg, fullImg);

  cardsFullImg.src = inputLink.value;
  cardsFullImg.alt = inputTitle.value;
  cardsFullTitle.textContent = inputTitle.value;

  popupClose(cardsFullCloseBtn, fullImg);
});

// Лайк карточки

likeBtn.map(function (item) {
  item.addEventListener('click', function() {
    item.classList.toggle('cards__like-btn_state_active');
  });
});

// Удаление карточки

deletBtn.forEach(function (item) {
  item.addEventListener('click', function() {
    item.closest('.cards__item').remove();
  });
});
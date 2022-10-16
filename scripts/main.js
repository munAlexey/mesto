const openPopupButton = document.querySelector('.profile__edit-btn');
const form = document.querySelector('.pop-up__form');
const inputName = form.querySelector('#pop-up__name');
const inputText = form.querySelector('#pop-up__text');
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');
const openPopup = document.querySelector('.pop-up_close');
const closePopupButton = document.querySelector('.pop-up__close-btn');

openPopupButton.addEventListener('click', function () {
  openPopup.classList.remove('pop-up_close');
  inputName.value = titleProfile.textContent;
  inputText.value = subtitleProfile.textContent;
});

closePopupButton.addEventListener('click', function () {
  openPopup.classList.add('pop-up_close');
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
  
  openPopup.classList.add('pop-up_close');
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
const openAddMenu = document.querySelector('.pop-up_add-btn');
const closeAddBtn = document.querySelector('.pop-up__close-add-btn');
const formAdd = document.querySelector('.pop-up__form-add');

openAddBtn.addEventListener('click', function() {
  openAddMenu.classList.remove('pop-up_add-btn');
});

closeAddBtn.addEventListener('click', function(evt) {
  openAddMenu.classList.add('pop-up_add-btn');
});

const inputTitle = document.querySelector('#pop-up__title');
const inputLink = document.querySelector('#pop-up__link');
const likeBtn = Array.from(document.querySelectorAll('.cards__like-btn'));  // Лайк карточки
const deletBtn = Array.from(document.querySelectorAll('.cards__delete'));  // Удаление карточки

formAdd.addEventListener('submit', function formSubmitHandler(event) {
  event.preventDefault();

  const cardsItem = cardsTemplate.querySelector('.cards__item').cloneNode(true); 
  const likeBtn = cardsItem.querySelector('.cards__like-btn');
  const deletBtn = cardsItem.querySelector('.cards__delete');

  cardsItem.querySelector('.cards__title').textContent = inputTitle.value;
  cardsItem.querySelector('.cards__img').src = inputLink.value;
  cardsItem.querySelector('.cards__img').alt = inputTitle.value;

  // Лайк карточки

  likeBtn.addEventListener('click', () => {
    cardsItem.querySelector('.cards__like-btn').classList.toggle('cards__like-btn_state_active');
  });
  cardsList.prepend(cardsItem);
  openAddMenu.classList.add('pop-up_add-btn');

  // Удаление карточки

  deletBtn.addEventListener('click', () => {
    deletBtn.closest('.cards__item').remove();
  });
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
export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  

  _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
      
      return cardElement;
  }
  
  generateCard() {
    this._element = this._getTemplate(this._cardsImg);
    this._cardsImg = this._element.querySelector('.card__img');
    this._cardsTitle = this._element.querySelector('.card__title');
    this._cardsFullImg = document.querySelector('.pop-up__card-full-img');
    this._cardCount = this._element.querySelector('.card__like-count');
    this._cardsTitle.textContent = this._data.name || this._data.title;
    this._cardLike = this._element.querySelector('.card__like-btn');
    this._cardsImg.src = this._data.link;
    this._cardsImg.alt = this._data.name || this._data.title;
    this._cardCount.textContent = this._data.likes.length;

    this._setEventListener();
    
    return this._element;
  }

  enableValidation() {
    this._setEventListener();
  }

  _setEventListener() {

    this._cardLike.addEventListener('click', () => {
      this._handleLikeBtn();
    });
  
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteBtn();
    });
    
    this._cardsImg.addEventListener('click', () => {
      this._openCardFullImg();
    });
  }

  // Лайк карточки

  _handleLikeBtn() {
    this._cardLike.classList.toggle('card__like-btn_state_active');
  }

  // Удаление карточки

  _handleDeleteBtn() {
    this._cardsImg.closest('.card').remove();
  }
  
  // Открытие попапа с картинкой

  _openCardFullImg() {
    this._handleCardClick(this._data);
  }
}
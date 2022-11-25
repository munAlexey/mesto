export default class Card {
  constructor(data, templateSelector, handleOpenPopup) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
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
    this._cardsTitle.textContent = this._data.name;
    this._cardLike = this._element.querySelector('.card__like-btn');
    this._cardsImg.src = this._data.link;
    this._cardsImg.alt = this._data.name;

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
    this._handleOpenPopup(this._data);
  }
}
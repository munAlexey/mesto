export default class Card {
  constructor(data, templateSelector, handleOpenPopup) {
    this.data = data;
    this._title = data.name;
    this._link = data.link;
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
    this._deleteBtn = this._element.querySelector('.card__delete');
    this._cardsTitle.textContent = this._title;
    this._cardLike = this._element.querySelector('.card__like-btn');
    this._cardsImg.src = this._link;
    this._cardsImg.alt = this._title;

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
    this._deleteBtn.closest('.card').remove();
  }
  
  // Открытие попапа с картинкой

  _openCardFullImg() {
    this._handleOpenPopup(this.data);
  }
}
export default class Card {
  cardsFullImg;
  cardsFullTitle;
  cardsImg;
  cardsTitle;
  popupOpened;

  constructor(data, templateSelector) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
      
      return cardElement;
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();
    this.cardsImg = this._element.querySelector('.card__img');
    this.cardsTitle = this._element.querySelector('.card__title');
    this.cardsFullImg = document.querySelector('.pop-up__card-full-img');
    this.popupOpened = document.querySelector('.pop-up_cards');

    this.cardsTitle.textContent = this._title;
    this.cardsImg.src = this._link;
    this.cardsImg.alt = this._title;
    
    return this._element;
  }

  _setEventListener() {
    this._element.querySelector('.card__like-btn').addEventListener('click', () => {
      this._handleLikeBtn();
    });
    
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteBtn();
    });
    
        
    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._openCardFullImg();
    });
  }

  // Лайк карточки

  _handleLikeBtn() {
    this._element.querySelector('.card__like-btn').classList.toggle('card__like-btn_state_active');
  }

  // Удаление карточки

  _handleDeleteBtn() {
    this._element.closest('.card').remove();
  }
  
  // Открытие попапа с картинкой

  _openCardFullImg() {
    openPopUp(popupCards);
    this.popupOpened.classList.add('pop-up_opened');
    cardsFullImg.src = this._link;
    cardsFullImg.alt = this._title;
    cardsFullTitle.textContent = this._title;
  }
}
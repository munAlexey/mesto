export default class Card {
  constructor(data, templateSelector, handleCardClick, openConfirmPopup, handleLikeBtn, userInfo) {
    this._data = data;
    this._userInfo = userInfo;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this.openConfirmPopup = openConfirmPopup;
    this._handleLikeBtn = handleLikeBtn;
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
    this._deleteElement = this._element.querySelector('.card__delete')
    this._cardsImg = this._element.querySelector('.card__img');
    this._cardsTitle = this._element.querySelector('.card__title');
    this._cardsFullImg = document.querySelector('.pop-up__card-full-img');
    this._cardCount = this._element.querySelector('.card__like-count');
    this._cardsTitle.textContent = this._data.name || this._data.title;
    this._cardLike = this._element.querySelector('.card__like-btn');
    this._cardsImg.src = this._data.link;
    this._cardsImg.alt = this._data.name || this._data.title;
    this._cardCount.textContent = this._data.likes.length;
    this.isLike();
    if (this._data.owner._id === this._userInfo) {
      this._addBusketBtn()
    }
    else {
      this._deleteBusketBtn()
    }

    this._setEventListener();
    
    return this._element; 
  }

  enableEventListeners() {
    this._setEventListener();
  }

  _setEventListener() {
    this._cardLike.addEventListener('click', () => {
      this._handleLikeBtn(this.toogleLike(), this)
    });
  
    this._deleteElement.addEventListener('click', () => {
      this.openConfirmPopup(this);
    });
    
    this._cardsImg.addEventListener('click', () => {
      this._openCardFullImg();
    });
  }

  _deleteBusketBtn() {
    this._deleteElement.classList.add('card__delete_hidden');
  }

  _addBusketBtn() {
    this._deleteElement.classList.remove('card__delete_hidden');
  }

  // Лайк карточки

  toogleLike() {
    return this._data.likes.some(like => like._id === this._userInfo);
  }

  addLike() {
    this._cardLike.classList.add('card__like-btn_state_active');
  }

  removeLike() {
    this._cardLike.classList.remove('card__like-btn_state_active');
  }

  getNewLikes(data) {
    this._data.likes = data.likes;
    this._cardCount.textContent = this._data.likes.length;
  }

  isLike() {
    if(this.toogleLike()) {
      this.addLike();
    } else {
      this.removeLike();
    }
  }

  // Удаление карточки

  handleDeleteBtn() {
    this._element.remove();
    this._element = null;
  }
  
  // Открытие попапа с картинкой

  _openCardFullImg() {
    this._handleCardClick(this._data);
  }
}
import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupElement) {
    super(popupElement);
    this._cardsFullImg = this._popupElement.querySelector('.pop-up__card-full-img');
    this._cardsFullTitle = this._popupElement.querySelector('.pop-up__card-full-title'); 
  }
  open(data) {
    this._cardsFullImg .src = data.link;
    this._cardsFullTitle.alt = data.name || data.title;
    this._cardsFullTitle.textContent = data.name || data.title;
    super.open();
  }
}

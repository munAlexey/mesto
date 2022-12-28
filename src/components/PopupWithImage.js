import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._cardsFullImg = this._popupSelector.querySelector('.pop-up__card-full-img');
    this._cardsFullTitle = this._popupSelector.querySelector('.pop-up__card-full-title'); 
  }
  open(data) {
    super.open();
    this._cardsFullImg .src = data.link;
    this._cardsFullTitle.alt = data.name || data.title;
    this._cardsFullTitle.textContent = data.name || data.title;
  }
}
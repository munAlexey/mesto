import Popup from './Popup.js';

export class PopupConfirm extends Popup {
  constructor(popupElement, cardElement) {
    super(popupElement);
    this.confirmBtn = document.querySelector('.pop-up__confirm-btn');
    this._cardElement = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this.confirmBtn.addEventListener('click', () => {
      this._cardElement(this.card);
    })
  }

  open(card) {
    super.open();
    this.card = card;
  }
}
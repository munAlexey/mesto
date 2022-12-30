import Popup from './Popup.js';

export class PopupConfirm extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this.confirmBtn = document.querySelector('.pop-up__confirm-btn');
  }

  setEventListeners(handleSubmit) {
    super.setEventListeners();
    this.confirmBtn.addEventListener('click', () => {
      handleSubmit()
    })
  }
}
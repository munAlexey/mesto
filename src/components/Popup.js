export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }


  open() {
    this._popupElement.classList.add('pop-up_opened');
    this._popupElement.classList.remove('action_close');
    this._popupElement.classList.add('action_open');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('pop-up_opened');
    this._popupElement.classList.add('action_close');
    this._popupElement.classList.remove('action_open');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  
  setEventListeners() {
    const closePopupButton = this._popupElement.querySelector('.pop-up__close-btn');
    closePopupButton.addEventListener('click', (evt) => {
      this.close();
    });

    this._popupElement.addEventListener('click', (evt) => {
      const target = evt.target;
      if (target === this._popupElement) {
        this.close();
      };
    });
  }

  _handleEscClose(evt) {
    const key = evt.key;
    if (key === 'Escape') {
      this.close();
    };
  }
}
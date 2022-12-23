export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }


  open() {
    this._popupSelector.classList.add('pop-up_opened');
    this._popupSelector.classList.remove('action_close');
    this._popupSelector.classList.add('action_open');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('pop-up_opened');
    this._popupSelector.classList.add('action_close');
    this._popupSelector.classList.remove('action_open');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  
  setEventListeners() {
    const closePopupButton = this._popupSelector.querySelector('.pop-up__close-btn');
    closePopupButton.addEventListener('click', (evt) => {
      this.close();
    });

    this._popupSelector.addEventListener('click', (evt) => {
      const target = evt.target;
      if (target === this._popupSelector) {
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
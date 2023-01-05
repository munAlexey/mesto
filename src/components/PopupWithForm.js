import Popup from './Popup.js';
import {configValidation} from '../utils/constants.js'

export default class PopupWithForm extends Popup {
  constructor(popupElement, formSubmitHandler,form) {
    super(popupElement);
    this._formSubmitButton = this._popupElement.querySelector('.pop-up__button');
    this._form = form;
    this.formSubmitHandler = formSubmitHandler;
    this._inputList = Array.from(this._popupElement.querySelectorAll(configValidation.inputSelector));
  }

  _getInputValues() {
    const inputArr = {};
    this._inputList.forEach(input => {
      inputArr[input.name] = input.value;
    })
    return inputArr;
  }

  renderLoading(isLoading, text) {
    if(isLoading) {
      this._formSubmitButton.textContent = `${this._formSubmitButton.textContent}...`
    } else {
      this._formSubmitButton.textContent = text;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners(renderLoading) {
    super.setEventListeners();

    this._popupElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);
      this.formSubmitHandler(this._getInputValues(), this);
      this.close();
    });
  }
}
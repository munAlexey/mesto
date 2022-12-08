import Popup from './Popup.js';
import {configValidation} from '../utils/constants.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler,form) {
    super(popupSelector);
    this._form = form;
    this.formSubmitHandler = formSubmitHandler;
    this._inputList = Array.from(this._popupSelector.querySelectorAll(configValidation.inputSelector));
  }

  _getInputValues() {
    const inputArr = {};
    this._inputList.forEach(input => {
      inputArr[input.name] = input.value;
    })
    return inputArr;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.addEventListener('submit', (event) => {
      event.preventDefault();
      this.formSubmitHandler(this._getInputValues());
      this.close();
    });
    
  }
}
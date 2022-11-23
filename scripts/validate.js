export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._formSubmitButton = this._form.querySelector(this._config.submitButtonSelector);
  } 

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._toggleInputErrorState(input);
        this._toggleButtonSubmit(); 
      });
    });
  }

  _toggleInputErrorState(input) {
    this.formError = this._form.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    })
  }

  _toggleButtonSubmit() {
    if (this._hasInvalidInput(this._inputList)) {
      this._enableButton();
    } else {
      this._disabelButton();
    }
  }
  
  _enableButton() {
    this._formSubmitButton.setAttribute('disabled', 'disabled');
    this._formSubmitButton.classList.add(this._config.inactiveButtonClass);
  }

  _disabelButton = () => {
    this._formSubmitButton.removeAttribute('disabled');
    this._formSubmitButton.classList.remove(this._config.inactiveButtonClass);
  }

  _showInputError(input, errorMessage) {
    input.classList.add(this._config.inputErrorClass);
    this.formError.classList.add(this._config.errorClass);
    this.formError.textContent = errorMessage;
  }

  _hideInputError = (input) => {
    input.classList.remove('pop-up__input-chanched');
    input.classList.remove(this._config.inputErrorClass);
    this.formError.classList.remove(this._config.errorClass);
    this.formError.textContent = '';
  }
}
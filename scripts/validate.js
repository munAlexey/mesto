export default class FormValidator {
  inputList;
  form;
  formSubmitButton;
  input;
  formError;

  constructor(config, formClass) {
    this.config = config;
    this.formClass = formClass;
    this.form = document.querySelector(this.formClass);
    this.inputList = Array.from(this.form.querySelectorAll(this.config.inputSelector));
    this.formSubmitButton = this.form.querySelector(this.config.submitButtonSelector);
    this.INPUT_WIDTH = 55;
  } 

  _setEventListeners() {
    this.inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonSubmit(); 
      });
    });
  }

  _isValid(input) {
  this.formError = this.form.querySelector(`.${input.id}-error`);
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
}; 

  _toggleButtonSubmit() {
    if (this._hasInvalidInput(this.inputList)) {
      this._enableButton();
    } else {
      this._disabelButton();
    }
  }
  
  _enableButton() {
    this.formSubmitButton.setAttribute('disabled', 'disabled');
    this.formSubmitButton.classList.add(this.config.inactiveButtonClass);
  }

  _disabelButton = () => {
    this.formSubmitButton.removeAttribute('disabled');
    this.formSubmitButton.classList.remove(this.config.inactiveButtonClass);
  }

  _showInputError(input, errorMessage) {
  if(errorMessage.length > this.INPUT_WIDTH) {
    input.classList.add('pop-up__input-chanched');
  }
  input.classList.add(this.config.inputErrorClass);
  this.formError.classList.add(this.config.errorClass);
  this.formError.textContent = errorMessage;
}

  _hideInputError = (input) => {
    input.classList.remove('pop-up__input-chanched');
    input.classList.remove(this.config.inputErrorClass);
    this.formError.classList.remove(this.config.errorClass);
    this.formError.textContent = '';
  }
}
const showInputError = (input, formError, errorMessage, config) => {
  if(errorMessage.length > 55) {
    input.style['margin-bottom'] = '45px';
  }
  input.classList.add(config.inputErrorClass);
  formError.classList.add(config.errorClass);
  formError.textContent = errorMessage;
}

const hideInputError = (input, formError, config) => {
  input.style['margin-bottom'] = '30px';
  input.classList.remove(config.inputErrorClass);
  formError.classList.remove(config.errorClass);
  formError.textContent = '';
}

const isValid = (input, form, config) => {
  const formError = form.querySelector(`.${input.id}-error`);
  if (!input.validity.valid) {
    showInputError(input, formError, input.validationMessage, config);
  } else {
    hideInputError(input, formError, config);
  }
}
const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const formSubmitButton = form.querySelector(config.submitButtonSelector);
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid(input, form, config);
      toggleButtonSubmit(inputList, formSubmitButton, config);
    });
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonSubmit = (inputList, formSubmitButton, config) => {
  if (hasInvalidInput(inputList)) {
    enableButton(formSubmitButton, config);
  } else {
    disabelButton(formSubmitButton, config);
  }
}

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(form => {
    setEventListeners(form, config);
    closePopups();
  })
}

const closePopupKey = (formElement) => {
  const body = document.querySelector('body');
  body.addEventListener('keydown', (evt) => {
    const key = evt.key;
    if (key === 'Escape') {
      clickClose(formElement);
      closePopupSmoothly(formElement);
    };
  });
}

const closePopupOutside = (formElement) => {
  formElement.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target === formElement) {
      clickClose(formElement);
      closePopupSmoothly(formElement);
    };
  });
}

const closePopups = () => {
  const popups = Array.from(document.querySelectorAll('.pop-up'));
  popups.forEach(formElement => {
    closePopupOutside(formElement);
    closePopupKey(formElement);
  });
}

const enableButton = (formSubmitButton, config) => {
  formSubmitButton.setAttribute('disabled', 'disabled');
  formSubmitButton.classList.add(config.inactiveButtonClass);
}

const disabelButton = (formSubmitButton, config) => {
  formSubmitButton.removeAttribute('disabled');
  formSubmitButton.classList.remove(config.inactiveButtonClass);
}

enableValidation({
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  errorClass: 'pop-up__span-error',
  inputErrorClass: 'pop-up__input_type_error',
}); 

// привет, прошу прощения мисскликнул и случайно отправил не успев запушить
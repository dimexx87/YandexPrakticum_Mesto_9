// СОЗДАНИЕ И ЭКСПОРТ КЛАССА ВАЛИДАЦИИ ФОРМ
export class FormValidator {
  constructor(data, form) {
    this._formInput = data.formInput;
    this._buttonElement = data.buttonElement;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = form;
  }

  // приватный метод добавления атрибутов ошибки при валидации
  _showInputError(formInput, errorMessage) {
    const formError = this._form.querySelector(`#${formInput.id}-error`);
    formInput.classList.add(this._inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._errorClass);
  }

  // приватный метод скрытия атрибутов ошибки при валидации
  _hideInputError(formInput) {
    const formError = this._form.querySelector(`#${formInput.id}-error`);
    formInput.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = "";
  }

  // приватный метод проверки валидности формы
  _isValid(formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  }

  // приватный метод проверки валидности ввода
  _hasInvalidInput(inputList) {
    return inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  }

  // приватный метод включения/ выключения кнопки от условия валидности формы
  _toggleButtonState(inputList) {
    const buttonElement = this._form.querySelector(this._buttonElement);
    if (this._hasInvalidInput(inputList)) {
      this.buttonDisabled(buttonElement);
    } else {
      this._buttonEnabled(buttonElement);
    }
  }

  // приватный метод установки слушателей ввода символов
  _setEventListeners(formInput) {
    const inputList = Array.from(this._form.querySelectorAll(formInput));
    inputList.forEach((formInput) => {
      formInput.addEventListener("input", () => {
        this._isValid(formInput);
        this._toggleButtonState(inputList);
      });
    });
  }

  // публичный метод очистки формы при нажатии на крестик
  clearValidationForm(form) {
    const inputList = Array.from(this._form.querySelectorAll(this._formInput));
    inputList.forEach((formInput) => {
      const formError = this._form.querySelector(`#${formInput.id}-error`);
      formInput.classList.remove(this._inputErrorClass);
      formError.classList.remove(this._errorClass);
      formError.textContent = "";
    });
    const buttonElement = this._form.querySelector(this._buttonElement);
    this._buttonEnabled(buttonElement);
  }

  // публичный метод выключения кнопки
  buttonDisabled(form) {
    const buttonElement = this._form.querySelector(this._buttonElement);
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }

  // приватный метод включения кнопки
  _buttonEnabled(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  }

  // публичный метод подключения валидации форм
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formInput);
  }
}

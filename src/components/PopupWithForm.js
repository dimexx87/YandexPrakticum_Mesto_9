// наследник Popup: возвращает в объект инпуты формы, отвечает за сабмит и закрытие попапа добавления карточек и редактирования информации о пользователе

import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ moduleWindow, handleFormSubmit }) {
    super(moduleWindow);
    this._handleFormSubmit = handleFormSubmit;
  }

  // анонимный метод возврата инпутов формы в объект
  _getInputValues() {
    this._inputList = this._moduleWindow.querySelectorAll(".popup__text");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
      this._formValues.likes = 0;
      this._formValues.owner = 0;
    });
    return this._formValues;
  }

  // публичный метод обработки сабмита: отмена стандартного сабмита, ообработка объекта с инпутами
  setEventListeners() {
    super.setEventListeners();
    this._moduleWindow.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._moduleWindow.querySelector(".popup__container").reset();
  }
}

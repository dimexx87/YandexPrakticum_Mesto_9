// наследник Popup: возвращает в объект инпуты формы, отвечает за сабмит и закрытие попапа просмотра увеличенных фото

import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(moduleWindow, zoomPicture, zoomTitle) {
    super(moduleWindow);
    this._zoomPicture = zoomPicture;
    this._zoomTitle = zoomTitle;
  }

  // перезаписываем публичный метод открытия попапа с передачей попапу данных карточки
  open(obj) {
    this._zoomPicture.src = obj.link;
    this._zoomPicture.alt = `Изображение ${obj.name} не загрузилось`;
    this._zoomTitle.textContent = obj.name;
    super.open();
  }
}

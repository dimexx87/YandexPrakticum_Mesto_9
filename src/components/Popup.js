// класс для открытия и закрытия попапов.
export class Popup {
  constructor(moduleWindow, _handleEscClose) {
    this._moduleWindow = moduleWindow;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleMouseClose = this._handleMouseClose.bind(this);
  }

  // публичный метод открытия попапа и установки слушателей "закрытия"
  open() {
    this._moduleWindow.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleMouseClose);
  }

  // публичный метод закрытия попапа и снятия слушателей "закрытия"
  close() {
    this._moduleWindow.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleMouseClose);
  }

  // анонимный метод закрытия попапа при клике на ESC
  _handleEscClose(e) {
    if (e.keyCode === 27) {
      this._moduleWindow.classList.remove("popup_opened");
    }
  }

  // анонимный метод закрытия попапа при клике мышкой на области за пределами изображения
  _handleMouseClose(e) {
    if (e.target === this._moduleWindow) {
      this._moduleWindow.classList.remove("popup_opened");
    }
  }

  // публичный метод установки слушателя закрытия попапа при клике на крестик
  setEventListeners() {
    const closeButton = this._moduleWindow.querySelector(".popup__btn-close");
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}

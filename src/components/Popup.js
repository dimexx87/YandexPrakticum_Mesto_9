// класс для открытия и закрытия попапов.
export class Popup {
  constructor(moduleWindow, _handleEscClose) {
    this._moduleWindow = moduleWindow;
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
    console.log('нажатиеEsc')
    if (e.keyCode === 27) {
      document.querySelector('.popup_opened').classList.remove("popup_opened");
    }
  }

  // анонимный метод закрытия попапа при клике мышкой на области за пределами изображения
  _handleMouseClose(e) {
    console.log('нажатиеМышки')
    const popUp = e.target.closest(".popup");
    if (e.target === popUp) {
      popUp.classList.remove("popup_opened");
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

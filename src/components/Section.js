// отрисовывает элементы на странице (карточки)

export class Section {
  constructor({ data, renderer }, gridContainer) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = gridContainer;
  }

  // публичный метод добавления карточки вконец
  setAppendItem(element) {
    this._container.append(element);
  }

  // публичный метод добавления карточки вначало
  setPrependItem(element) {
    this._container.prepend(element);
  }

  // перебираем элементы массива, рендерим каждый элемент
  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }
}

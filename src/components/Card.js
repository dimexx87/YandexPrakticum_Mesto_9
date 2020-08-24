// импортируем необходимые атрибуты и функцию
import { ownerID } from "../utils/constants.js";
import { Popup } from "./Popup.js";

// СОЗДАЕМ И ЭКСПОРТИРУЕМ КЛАСС СОЗДАНИЯ КАРТОЧЕК
export class Card {
  // добавляем повторяющиеся элементы
  constructor(
    name,
    image,
    likes,
    _id,
    owner,
    template,
    { handleCardClick, handleCardDelete, handleCardLike, handleCardDislike }
  ) {
    this._title = name;
    this._image = image;
    this._likes = likes;
    this.__id = _id;
    this._owner = owner;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._handleCardDislike = handleCardDislike;
  }

  // забираем разметк из HTML, клонируем элемент
  _getTemplate() {
    const cardElement = this._template.content
      .querySelector(".photo-grid__item")
      .cloneNode(true);
    // возвращаем в DOM-элемент карточки
    return cardElement;
  }

  // функция создания карточек
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    // ищем элементы и присваиваем им переменные
    const gridImage = this._element.querySelector(".photo-grid__image");
    const gridTitle = this._element.querySelector(".photo-grid__title");
    const gridLikes = this._element.querySelector(".photo-grid__like-number");
    const gridID = this._element.querySelector("#_id");
    const gridLike = this._element.querySelector(".photo-grid__like");
    const gridDelete = this._element.querySelector(".photo-grid__delete");

    // добавляем данные
    gridImage.src = this._image;
    gridImage.alt = this._title;
    gridTitle.textContent = this._title;
    gridLikes.textContent = this._likes.length;
    gridID.textContent = this.__id;

    // определяем моя ли это карточка
    const owners = this._owner;
    const ownersID = owners._id;
    if (ownersID === undefined || ownersID === "d8de4200ba05da81c45a276b") {
      console.log("Оставить корзинку");
    } else {
      gridDelete.remove();
    }

    // определяем ставили ли лайк карточке
    if (this._likes !== 0) {
      const isUserLiked = this._likes.some((like) => {
        return like._id === ownerID;
      });

      if (isUserLiked) {
        gridLike.className = "photo-grid__like photo-grid__like_active";
      } else {
        gridLike.className = "photo-grid__like";
      }
    }
    // возвращаем элемент наружу
    return this._element;
  }

  // добавляем слушателей событий
  _setEventListeners() {
    // нажатие на лайк
    this._element
      .querySelector(".photo-grid__like")
      .addEventListener("click", () => {
        this._handleLike(this.__id);
      });
    // нажатие на delete
    this._element
      .querySelector(".photo-grid__delete")
      .addEventListener("click", () => {
        this._handleCardDelete(this.__id);
      });
    // нажатие на картинку карточки
    this._element
      .querySelector(".photo-grid__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  // функция проставления/снятия лайка
  _handleLike() {
    const gridLike = this._element.querySelector(".photo-grid__like");
    const gridLikes = this._element.querySelector(".photo-grid__like-number");
    let countLike = gridLikes.textContent;
    // если уже есть лайк то убираем
    if (gridLike.classList.contains("photo-grid__like_active")) {
      // снимаем визуальный лайк
      this._element
        .querySelector(".photo-grid__like")
        .classList.remove("photo-grid__like_active");
      // просим отправить запрос для удаления лайка на сервер из index
      this._handleCardDislike(this.__id);
      // уменьшаем кол-во лайков на 1
      gridLikes.textContent = countLike - 1;
    }
    // если нет лайка то ставим
    else {
      // ставим визуальный лайк
      this._element
        .querySelector(".photo-grid__like")
        .classList.add("photo-grid__like_active");
      // просим отправить запрос для добавления лайка на сервер из index
      this._handleCardLike(this.__id);
      // увеличиваем кол-во лайков на 1
      gridLikes.textContent = ++countLike;
    }
  }

  // функция удаления карточки
  handleDelete() {
    this._element.remove();
    this._element = "";
  }
}

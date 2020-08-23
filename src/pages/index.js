import "./index.css";

// ИМПОРТИРУЕМ КОНСТАНТЫ
import {
  title,
  about,
  nameInput,
  aboutInput,
  popUpEdit,
  popUpAdd,
  formEditElement,
  formAddElement,
  gridContainer,
  cardTemplate,
  place,
  link,
  data,
  editButton,
  closeButtonEditForm,
  closeButtonAddForm,
  closeButtonPictureForm,
  addButton,
  popUpView,
  zoomPicture,
  zoomTitle,
  options,
  avatarInput,
  editPhotoButton,
  popUpPhotoEdit,
  popUpDelete,
  saveBtnPrf,
  saveBtnAvt,
} from "../utils/constants.js";

// ИМПОРТИРУЕМ КЛАССЫ
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Api } from "../components/Api.js";

// СОЗДАЁМ ЭКЗЕМПЛЯРЫ КЛАССОВ

// запросов на сервер и ответов от него
const api = new Api(options);
// попапов
const popUpEditOpen = new Popup(popUpEdit);
const popUpAddOpen = new Popup(popUpAdd);
const userInfo = new UserInfo({
  nameInput: nameInput.textContent,
  aboutInput: aboutInput.textContent,
});
// валидации
// формы модального окна редактирования
const validationEditForm = new FormValidator(data, popUpEdit);
validationEditForm.enableValidation();
// формы модального окна добавления
const validationAddForm = new FormValidator(data, popUpAdd);
validationAddForm.enableValidation();
// формы модального окна редактирования аватара
const validationEditPhotoForm = new FormValidator(data, popUpPhotoEdit);
validationEditPhotoForm.enableValidation();

// создания карточек
const cardList = new Section(
  {
    data: [],
    renderer: [],
  },
  gridContainer
);
cardList.renderItems();

// ПРЕДЗАПОЛНЕНИЕ СТРАНИЦЫ КАРТОЧКАМИ С СЕРВЕРА
api
  .getInitialCards()
  .then((data) => {
    data.forEach((item) => newCard(item, true));
  })
  .catch((err) => {
    console.log(err);
  });

// ЗАГРУЗКИ ПРОФИЛЯ С СЕРВЕРА ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
api
  .getAvatarInfo()
  .then((data) => {
    nameInput.textContent = data.name;
    aboutInput.textContent = data.about;
    avatarInput.src = data.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

// функция изменения кнопки при ожидании загрузки на сервер
function renderLoading(isLoading, btn) {
  if (isLoading) {
    btn.textContent = "Загрузка...";
  } else {
    btn.textContent = "Сохранить";
  }
}

// РЕДАКТИРОВАНИЕ ПОЛЕЙ ПРОФИЛЯ С ПОСЛЕДУЮЩИМ СОХРАНЕНИЕМ
const editCardForm = new PopupWithForm({
  moduleWindow: popUpEdit,
  handleFormSubmit: (formData) => {
    renderLoading(true, saveBtnPrf);
    api
      .setAvatarInfo(formData.name, formData.about)
      .then((data) => {
        nameInput.textContent = data.name;
        aboutInput.textContent = data.about;
        avatarInput.src = data.avatar;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, saveBtnPrf);
        editCardForm.close();
      });
  },
});
editCardForm.setEventListeners();

// РЕДАКТИРОВАНИЕ АВАТАРА
const editAvatarForm = new PopupWithForm({
  moduleWindow: popUpPhotoEdit,
  handleFormSubmit: (data) => {
    renderLoading(true, saveBtnAvt);
    api
      .setAvatar(data.link)
      .then((data) => {
        avatarInput.src = data.avatar;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, saveBtnAvt);
        editAvatarForm.close();
      });
  },
});
editAvatarForm.setEventListeners();

// ФУНКЦИЯ СОЗДАНИЯ НОВЫХ КАРТОЧЕК
function newCard(data, isNew) {
  const card = new Card(
    data.name,
    data.link,
    data.likes,
    data._id,
    data.owner,
    cardTemplate,
    {
      handleCardClick: () => {
        const popupWithImage = new PopupWithImage(
          popUpView,
          zoomPicture,
          zoomTitle
        );
        popupWithImage.open(data);
        popupWithImage.setEventListeners();
      },
      handleCardDelete: (id) => {
        const deleteForm = new PopupWithForm({
          moduleWindow: popUpDelete,
          handleFormSubmit: () => {
            api.deleteCard(id);
            card.handleDelete();
            deleteForm.close();
          },
        });
        deleteForm.setEventListeners();
        deleteForm.open();
      },
      handleCardLike: (id) => {
        api.setLike(id);
      },
      handleCardDislike: (id) => {
        api.deleteLike(id);
      },
    }
  );
  const cardElement = card.generateCard();
  // ставим и оставляем после перезагрузки новые карточки в начало
  if (isNew) {
    cardList.setAppendItem(cardElement);
  } else {
    cardList.setPrependItem(cardElement);
  }
}

// РУЧНОЕ ДОБАВЛЕНИЕ КАРТОЧЕК
const addCardForm = new PopupWithForm({
  moduleWindow: popUpAdd,
  handleFormSubmit: (formData) => {
    api.insertCard(formData.name, formData.link);
    newCard(formData, false);
    addCardForm.close();
  },
});
addCardForm.setEventListeners();

// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА РЕДАКТИРОВАНИЯ
editButton.addEventListener("click", () => {
  const userInfo = new UserInfo({
    nameInput: nameInput.textContent,
    aboutInput: aboutInput.textContent,
  });
  const editInfo = userInfo.getUserInfo();
  title.value = editInfo.name;
  about.value = editInfo.about;
  validationEditForm.clearValidationForm(popUpEdit);
  editCardForm.open();
  popUpEditOpen.setEventListeners();
});

// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ДОБАВЛЕНИЯ
addButton.addEventListener("click", () => {
  place.value = "";
  link.value = "";
  validationAddForm.clearValidationForm(popUpAdd); // очищаем возможно оставшиеся результаты валидации
  validationAddForm.buttonDisabled(popUpAdd); // включение кнопки
  addCardForm.open();
  popUpAddOpen.setEventListeners();
});

// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА РЕДАКТИРОВАНИЯ ФОТО
editPhotoButton.addEventListener("click", () => {
  validationEditPhotoForm.clearValidationForm(popUpPhotoEdit); // очищаем возможно оставшиеся результаты валидации
  validationEditPhotoForm.buttonDisabled(popUpPhotoEdit); // включение кнопки
  editAvatarForm.open();
  popUpAddOpen.setEventListeners();
});

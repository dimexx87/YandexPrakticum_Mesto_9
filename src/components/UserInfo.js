// управление отображением информации о пользователе на странице

export class UserInfo {
  constructor({ nameInput, aboutInput }) {
    this._nameInput = nameInput;
    this._aboutInput = aboutInput;
  }

  getUserInfo() {
    return {
      name: this._nameInput,
      about: this._aboutInput,
    };
  }

  setUserInfo({ nameInput, aboutInput }) {
    this._nameInput = nameInput;
    this._aboutInput = aboutInput;
  }
}

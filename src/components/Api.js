export class Api {
  constructor({ url, headers = {} }) {
    this.url = url;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then(this._handleResponse);
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getAvatarInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    }).then(this._handleResponse);
  }

  setAvatarInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse);
  }

  setAvatar(link) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._handleResponse);
  }

  insertCard(name, link) {
    fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleResponse);
  }

  setLike(cardID) {
    fetch(`${this.url}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify({}),
    }).then(this._handleResponse);
  }

  deleteLike(cardID) {
    fetch(`${this.url}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({}),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({}),
    }).then(this._handleResponse);
  }
}

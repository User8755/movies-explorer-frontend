class Api {
  constructor({ baseUrl, headers, moviesIgmUrl }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._moviesIgmUrl = moviesIgmUrl
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.text().then(err=>Promise.reject({
        status: res.status,
        message: JSON.parse(err).message,
        
      }));
    }
  }

  userInfoApi(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...this._headers,
      },
    }).then(this._checkRes);
  }

  updateUserInfo(item, jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...this._headers,
      },
      body: JSON.stringify({
        name: item.name,
        email: item.email,
      }),
    }).then(this._checkRes);
  }

  getSaveFilm(jwt) {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...this._headers,
      },
    }).then(this._checkRes);
  }

  createSaveFilm(item, jwt) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...this._headers,
      },
      body: JSON.stringify({
        country: item.country,
        director: item.director,
        duration: item.duration,
        year: item.year,
        description: item.description,
        image: `${this._moviesIgmUrl}/${item.image.url}`,
        trailerLink: item.trailerLink,
        thumbnail: `${this._moviesIgmUrl}/${item.image.url}`,
        nameRU: item.nameRU,
        nameEN: item.nameEN,
        movieId: item.id,

      }),
    }).then(this._checkRes);
  }

  deleteSaveFilm(cardId, jwt) {
    return fetch(`${this._baseUrl}/movies/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...this._headers,
      },
    }).then(this._checkRes);
  }

}

const api = new Api({
  moviesIgmUrl: 'https://api.nomoreparties.co/',
  baseUrl: 'https://api.movies.user87.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
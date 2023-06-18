class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
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

  updateUserInfo(item) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
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

  createSaveFilm(item) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        country: item.country,
        director: item.director,
        duration: item.duration,
        year: item.year,
        description: item.description,
        image: item.image,
        trailerLink: item.trailerLink,
        thumbnail: item.thumbnail,
        nameRU: item.nameRU,
        nameEN: item.nameEN,
        movieId: item.movieId,

      }),
    }).then(this._checkRes);
  }

  deleteSaveFilm(cardId) {
    return fetch(`${this._baseUrl}/movies/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkRes);
  }

}

const api = new Api({
  baseUrl: 'http://api.movies.user87.nomoredomains.rocks',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});

export default api;
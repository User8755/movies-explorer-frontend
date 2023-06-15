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

}

const api = new Api({
  baseUrl: 'http://api.movies.user87.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
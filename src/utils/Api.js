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


}

const api = new Api({
  baseUrl: 'api.movies.user87.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
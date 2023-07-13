class MoviesApi {
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.text().then((err) =>
        Promise.reject({
          status: res.status,
          message: JSON.parse(err).message,
        })
      );
    }
  }

  getFilms() {
    return fetch('https://api.nomoreparties.co/beatfilm-movies', {
      headers: { 'Content-Type': 'application/json' },
    }).then(this._checkRes);
  }
}
const films = new MoviesApi();

export default films;

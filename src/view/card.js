import AbstractView from "./abstract.js";

const createMovieCardTemplate = (card) => {
  const {
    cover,
    name,
    rate,
    dateRelease,
    genre,
    description,
    numberOfComments,
    duration
  } = card;
  let yearRelease = dateRelease.getFullYear();
  let shortDescription = description.length > 140 ? `${description.slice(0, 140)}...` : description;
  return (
    `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${rate}</p>
    <p class="film-card__info">
      <span class="film-card__year">${yearRelease}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="${cover}" alt="" class="film-card__poster">
    <p class="film-card__description">${shortDescription}</p>
    <a class="film-card__comments">${numberOfComments} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`
  );
};

export default class Card extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._addToWatchToggleHandler = this._addToWatchToggleHandler.bind(this);
    this._markAsWatchedToggleHandler = this._markAsWatchedToggleHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardTemplate(this._card);
  }


  _addToWatchToggleHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatch();
  }

  _markAsWatchedToggleHandler(evt) {
    evt.preventDefault();
    this._callback.markAsWatched();
  }

  _favoriteToggleHandler(evt) {
    evt.preventDefault();
    this._callback.addToFavorite();
  }

  setFavoriteToggleHandler(callback) {
    this._callback.addToFavorite = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteToggleHandler);
  }

  setMarkAsWatchedToggleHandler(callback) {
    this._callback.markAsWatched = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._markAsWatchedToggleHandler);
  }

  setAddToWatchToggleHandler(callback) {
    this._callback.addToWatch = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._addToWatchToggleHandler);
  }

  _setCardInfoOpenHandlers(callback) {
    let cardEl = this.getElement();
    cardEl.querySelector(`.film-card img`).addEventListener(`click`, callback);
    cardEl.querySelector(`.film-card__comments`).addEventListener(`click`, callback);
    cardEl.querySelector(`.film-card__title`).addEventListener(`click`, callback);
  }

}

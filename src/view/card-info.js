import {
  render,
} from "./utils/render.js";

import SmartView from "./smart";

import Comment from "./comment";
import {
  AFTER_BEGIN,
} from "../main.js";

const createGenreTemplate = (genre) => {
  return (
    `<span class="film-details__genre">${genre}</span>`
  );
};

const createMovieInfoTemplate = (card, isEmoji, emoji) => {
  const {
    cover,
    name,
    originalName,
    rate,
    director,
    actors,
    writers,
    dateRelease,
    duration,
    country,
    genre,
    description,
    numberOfComments
  } = card;

  const formatter = new Intl.DateTimeFormat(`en`, {
    month: `long`
  });
  let fullDate = `${dateRelease.getDate()} ${formatter.format(dateRelease)} ${dateRelease.getFullYear()}`;

  let genreElementsArr = [];
  for (let i = 0; i < genre.length; i++) {
    genreElementsArr.push(createGenreTemplate(genre[i]));
  }
  let genreElements = genreElementsArr.join(` `);

  let genreTitle = genre.length > 1 ? `Genres` : `Genre`;

  const emojiImg = {
    "emoji-smile": `<img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">`,
    "emoji-sleeping": `<img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji"></img>`,
    "emoji-puke": `<img src="./images/emoji/puke.png" width="55" height="55" alt="emoji"></img>`,
    "emoji-angry": `<img src="./images/emoji/angry.png" width="55" height="55" alt="emoji"></img>`
  };
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${cover}" alt=""></img>
              <p class="film-details__age">18+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${originalName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rate}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${fullDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genreTitle}</td>
                  <td class="film-details__cell">
                  ${genreElements}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" />
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" />
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" />
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${numberOfComments}</span></h3>

            <ul class="film-details__comments-list">
            </ul>
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${isEmoji ? emojiImg[emoji] : ``}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" />
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji"></img>
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" />
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji"></img>
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" />
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji"></img>
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" />
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji"></img>
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class CardInfo extends SmartView {
  constructor(card) {
    super();
    this._card = card;
    this._emoji = {
      isEmoji: false,
      emojiImg: null
    };
    this._element = this.getElement();
    this.renderComments();
    this._markAsWatchedToggleHandler = this._markAsWatchedToggleHandler.bind(this);
    this._addToWatchToggleHandler = this._addToWatchToggleHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);
    this._closeByEscHandler = this._closeByEscHandler.bind(this);
    this._closeByClickHandler = this._closeByClickHandler.bind(this);
    this._addEmojiHandler = this._addEmojiHandler.bind(this);

    this._enableAddEmojiHandler();
  }

  getTemplate() {
    return createMovieInfoTemplate(this._card, this._emoji.isEmoji, this._emoji.emojiImg);
  }

  renderComments() {
    for (let i = 0; i < this._card.comments.length; i++) {
      render(this._element.querySelector(`.film-details__comments-list`), new Comment(this._card.comments[i]).getElement(), AFTER_BEGIN);
    }
  }
  _closeByEscHandler(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      this._callback._closeByEsc();
    }
  }
  _closeByClickHandler(evt) {
    evt.preventDefault();
    this._callback._closeByClick();

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
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteToggleHandler);
  }

  setMarkAsWatchedToggleHandler(callback) {
    this._callback.markAsWatched = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._markAsWatchedToggleHandler);
  }

  setAddToWatchToggleHandler(callback) {
    this._callback.addToWatch = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._addToWatchToggleHandler);
  }

  setCloseByClickHandler(callback) {
    this._callback._closeByClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeByClickHandler);
  }

  setCloseByEscHandler(callback) {
    this._callback._closeByEsc = callback;
    document.addEventListener(`keydown`, this._closeByEscHandler);
  }

  restoreHandlers() {
    this.setFavoriteToggleHandler(this._callback.addToFavorite);
    this.setMarkAsWatchedToggleHandler(this._callback.markAsWatched);
    this.setAddToWatchToggleHandler(this._callback.addToWatch);
    this.setCloseByClickHandler(this._callback._closeByClick);
    this._enableAddEmojiHandler();
  }

  _addEmojiHandler(evt) {
    evt.preventDefault();
    this._emoji.emojiImg = evt.target.tagName === `IMG` ? evt.target.parentNode.htmlFor : evt.target.htmlFor;
    this._emoji.isEmoji = true;
    this.updateElement();
    this.renderComments();
    document.querySelector(`#${this._emoji.emojiImg}`).value = this._emoji.emojiImg;
  }

  _enableAddEmojiHandler() {
    this.getElement().querySelectorAll(`.film-details__emoji-label`).forEach((item) => {
      item.addEventListener(`click`, this._addEmojiHandler);
    });
  }

  reset() {
    this._emoji = {
      isEmoji: false,
      emojiImg: null
    };
    this.updateElement();
    this.renderComments();
  }

  removeCloseByEscHandler() {
    document.removeEventListener(`keydown`, this._closeByEscHandler);
  }
}

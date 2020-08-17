export const createMoviesContainerTemplate = () => {
  return (
    `<div class="films-list__container">
      </div>`
  );
};

export const createMoviesListTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
      </section>
    <section>`
  );
};

export const createMovieCardTemplate = (card) => {
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


export const createMoviesExtraListTemplate = () => {
  return (
    `<section class="films-list--extra">
       <h2 class="films-list__title">Top rated</h2>
     </section>`
  );
};


export const createCommentTemplate = (comment) => {
  const {
    emotion,
    text,
    author,
    date
  } = comment;
  return (
    ` <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${emotion}" width="55" height="55" alt="emoji-angry"></img>
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );
};

export const createGenreTemplate = (genre) => {
  return (
    `<span class="film-details__genre">${genre}</span>`
  );
};
export const createMovieInfoTemplate = (card) => {
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
    comments,
    numberOfComments
  } = card;

  const formatter = new Intl.DateTimeFormat(`en`, {
    month: `long`
  });
  let fullDate = `${dateRelease.getDate()} ${formatter.format(dateRelease)} ${dateRelease.getFullYear()}`;
  let commentsElementsArr = [];
  for (let i = 0; i < numberOfComments; i++) {
    commentsElementsArr.push(createCommentTemplate(comments[i]));
  }
  let commentsElements = commentsElementsArr.join(` `);

  let genreElementsArr = [];
  for (let i = 0; i < genre.length; i++) {
    genreElementsArr.push(createGenreTemplate(genre[i]));
  }
  let genreElements = genreElementsArr.join(` `);

  let genreTitle = genre.length > 1 ? `Genres` : `Genre`;

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
            ${commentsElements}
            </ul>
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

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

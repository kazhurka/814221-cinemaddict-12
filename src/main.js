'use strict';

const MOVIES_CARD_COUNT = 5;
const MOVIES_EXTRA_CARD_COUNT = 2;

const createUserRankTemplate = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35"></img>
  </section>`
  );
};

const createMainNavTemplate = () => {
  return (
    `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`
  );

};

const createSortTemplate = () => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};

const createMoviesContainerTemplate = () => {
  return (
    `<div class="films-list__container">
      </div>`
  );
};

const createMoviesListTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
      </section>
    <section>`
  );
};

const createMovieCardTemplate = () => {
  return (
    `<article class="film-card">
    <h3 class="film-card__title">The Great Flamarion</h3>
    <p class="film-card__rating">8.9</p>
    <p class="film-card__info">
      <span class="film-card__year">1945</span>
      <span class="film-card__duration">1h 18m</span>
      <span class="film-card__genre">Mystery</span>
    </p>
    <img src="./images/posters/the-great-flamarion.jpg" alt="" class="film-card__poster">
    <p class="film-card__description">The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…</p>
    <a class="film-card__comments">12 comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`
  );
};

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createMovieStatisticsTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

const createMoviesExtraListTemplate = () => {
  return (
    `<section class="films-list--extra">
       <h2 class="films-list__title">Top rated</h2>
     </section>`
  );
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserRankTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createMainNavTemplate(), `beforeend`);
render(siteMainElement, createMoviesListTemplate(), `beforeend`);

const siteMoviesSection = document.querySelector(`.films`);
render(siteMoviesSection, createMoviesExtraListTemplate(), `beforeend`);
render(siteMoviesSection, createMoviesExtraListTemplate(), `beforeend`);


const siteMoviesListElement = document.querySelector(`.films-list`);
render(siteMoviesListElement, createMoviesContainerTemplate(), `beforeend`);
render(siteMoviesListElement, createShowMoreButtonTemplate(), `beforeend`);

const siteMoviesContainerElement = siteMoviesListElement.querySelector(`.films-list__container`);
for (let i = 0; i < MOVIES_CARD_COUNT; i++) {
  render(siteMoviesContainerElement, createMovieCardTemplate(), `beforeend`);
}

const siteMoviesExtraListElements = document.querySelectorAll(`.films-list--extra`);
Array.from(siteMoviesExtraListElements).forEach(function (item) {
  render(item, createMoviesContainerTemplate(), `beforeend`);
  const siteMoviesExContainerElement = item.querySelector(`.films-list__container`);
  for (let i = 0; i < MOVIES_EXTRA_CARD_COUNT; i++) {
    render(siteMoviesExContainerElement, createMovieCardTemplate(), `beforeend`);
  }
});


const siteStatisticsContainerElement = document.querySelector(`.footer__statistics`);
render(siteStatisticsContainerElement, createMovieStatisticsTemplate(), `beforeend`);

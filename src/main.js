import {
  createMainNavTemplate
} from "./view/main-nav";
import {
  createMovieCardTemplate
} from "./view/movie-cards";
import {
  createMoviesContainerTemplate
} from "./view/movie-cards";
import {
  createMoviesExtraListTemplate
} from "./view/movie-cards";
import {
  createMoviesListTemplate
} from "./view/movie-cards";
import {
  createMovieStatisticsTemplate
} from "./view/movie-statistic";
import {
  createShowMoreButtonTemplate
} from "./view/show-more-button";
import {
  createSortTemplate
} from "./view/sort";
import {
  createUserRankTemplate
} from "./view/user-rank";

const MOVIES_CARD_COUNT = 5;
const MOVIES_EXTRA_CARD_COUNT = 2;

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

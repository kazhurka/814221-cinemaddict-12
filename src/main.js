import MainNavView from "./view/main-nav";
import MovieStatistics from "./view/movie-statistic";
import Sort from "./view/sort";
import UserRank from "./view/user-rank";


import {
  generateCard
} from "./mock/card";

import {
  generateRank
} from "./mock/rank";

import {
  render,
} from "./view/utils.js/render";
import {
  SortButtonDefault,
  SortButtonByRating,
  SortButtonByDate
} from "./view/sort-button";
import MovieList from "./presenter/movie-list";

const MOVIES_CARD_COUNT = 5;
export const BEFORE_END = `beforeend`;
export const AFTER_BEGIN = `afterbegin`;


const generateCards = (quantity) => {
  return Array(quantity).fill(null).map(generateCard);
};
const siteMainElement = document.querySelector(`.main`);
const movieListPresenter = new MovieList(siteMainElement);

const cards = generateCards(20);
let sortedCards = cards;
let rank = generateRank();


const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRank(rank), BEFORE_END);

const sortComponent = new Sort();
render(siteMainElement, new MainNavView(rank), BEFORE_END);
render(siteMainElement, sortComponent, BEFORE_END);

const sortButtonByDateComponent = new SortButtonByDate();
const sortButtonDefaultComponent = new SortButtonDefault();
const sortButtonByRatingComponent = new SortButtonByRating();
render(sortComponent, sortButtonDefaultComponent, BEFORE_END);
sortButtonDefaultComponent.makeActive();
render(sortComponent, sortButtonByDateComponent, BEFORE_END);
render(sortComponent, sortButtonByRatingComponent, BEFORE_END);

const siteStatisticsContainerElement = document.querySelector(`.footer__statistics`);
render(siteStatisticsContainerElement, new MovieStatistics(cards.length), BEFORE_END);


const sortCardsByDate = (cardsData) => {
  let sortedCurrentCards = cardsData.slice();
  sortedCurrentCards.sort((a, b) => {
    return b.dateRelease - a.dateRelease;
  });
  return sortedCurrentCards;
};

const sortCardsByRate = (cardsData) => {
  let sortedCurrentCards = cardsData.slice();
  sortedCurrentCards.sort((a, b) => {
    return b.rate - a.rate;
  });
  return sortedCurrentCards;
};

const toggleSortButton = (evt) => {
  const sortButtonsEls = document.querySelectorAll(`.sort__button`);
  let activeButton = document.querySelector(`.sort__button--active`);
  let index = Array.from(sortButtonsEls).indexOf(evt.target);
  let indexActive = Array.from(sortButtonsEls).indexOf(activeButton);
  if (indexActive !== index) {
    movieListPresenter._clearCards();
    sortButtonsEls.forEach((item) => {
      item.classList.remove(`sort__button--active`);
    });
    evt.target.classList.add(`sort__button--active`);
  }
};

sortButtonDefaultComponent.setClickHandler((evt) => {
  toggleSortButton(evt);
  sortedCards = cards;
  movieListPresenter._renderCards(sortedCards.slice(0, MOVIES_CARD_COUNT));
  movieListPresenter._showMoreButtonComponent.getElement().style.display = `block`;
});


sortButtonByDateComponent.setClickHandler((evt) => {
  toggleSortButton(evt);
  sortedCards = sortCardsByDate(cards);
  movieListPresenter._renderCards(sortedCards.slice(0, MOVIES_CARD_COUNT));
  movieListPresenter._showMoreButtonComponent.getElement().style.display = `block`;
});


sortButtonByRatingComponent.setClickHandler((evt) => {
  toggleSortButton(evt);
  sortedCards = sortCardsByRate(cards);
  movieListPresenter._renderCards(sortedCards.slice(0, MOVIES_CARD_COUNT));
  movieListPresenter._showMoreButtonComponent.getElement().style.display = `block`;
});

movieListPresenter.init(sortedCards);

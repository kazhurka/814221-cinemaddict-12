import MainNavView from "./view/main-nav";
import MovieStatistics from "./view/movie-statistic";
import UserRank from "./view/user-rank";


import {
  generateCard
} from "./mock/card";

import {
  generateRank
} from "./mock/rank";

import {
  render,
} from "./view/utils/render";

import MovieList from "./presenter/movie-list";


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


render(siteMainElement, new MainNavView(rank), BEFORE_END);


const siteStatisticsContainerElement = document.querySelector(`.footer__statistics`);
render(siteStatisticsContainerElement, new MovieStatistics(cards.length), BEFORE_END);

movieListPresenter.init(sortedCards);

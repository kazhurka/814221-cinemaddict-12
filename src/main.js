import MainNavView from "./view/main-nav";
import MovieStatistics from "./view/movie-statistic";
import ShowMoreButton from "./view/show-more-button";
import Sort from "./view/sort";
import UserRank from "./view/user-rank";
import MovieCard from "./view/movie-card";
import MovieInfo from "./view/movie-info";
import MoviesContainer from "./view/movies-container";
import MoviesList from "./view/movies-list";
import NoMovies from "./view/no-movies";

import {
  generateCard
} from "./mock/card";

import {
  generateRank
} from "./mock/rank";

import {
  renderElement,
} from "./utils";

const MOVIES_CARD_COUNT = 5;
export const BEFORE_END = `beforeend`;
export const AFTER_BEGIN = `afterbegin`;

const generateCards = (quantity) => {
  return Array(quantity).fill(null).map(generateCard);
};


const cards = generateCards(0);
let sortedCards = cards;
let rank = generateRank();


const siteHeaderElement = document.querySelector(`.header`);
renderElement(siteHeaderElement, new UserRank(rank).getElement(), BEFORE_END);

const siteMainElement = document.querySelector(`.main`);
renderElement(siteMainElement, new MainNavView(rank).getElement(), BEFORE_END);
renderElement(siteMainElement, new Sort().getElement(), BEFORE_END);
renderElement(siteMainElement, new MoviesList().getElement(), BEFORE_END);

const siteMoviesListElement = document.querySelector(`.films-list`);
renderElement(siteMoviesListElement, new MoviesContainer().getElement(), BEFORE_END);
renderElement(siteMoviesListElement, new ShowMoreButton().getElement(), BEFORE_END);

const removePopup = () => {
  document.querySelector(`.film-details__close`).removeEventListener(`keydown`, byClickClosePopupHandler);
  document.querySelector(`.film-details__close`).removeEventListener(`click`, byKeyClosePopupHandler);
  document.querySelector(`.film-details`).remove();
};

const byClickClosePopupHandler = () => {
  removePopup();
};

const byKeyClosePopupHandler = (evt) => {
  if (evt.key === `Escape`) {
    removePopup();
  }
};

const bodyElement = document.querySelector(`body`);
const openPopupCardHandler = (evt) => {
  const cardEls = Array.from(document.querySelectorAll(`.film-card`));
  let index = cardEls.indexOf(evt.target.parentNode);
  let popup = new MovieInfo(sortedCards[index]).getElement();
  bodyElement.appendChild(popup);
  popup.querySelector(`.film-details__close`).addEventListener(`click`, byClickClosePopupHandler);
  document.addEventListener(`keydown`, byKeyClosePopupHandler);
};

const siteMoviesContainerElement = siteMoviesListElement.querySelector(`.films-list__container`);
const renderCards = (cardsData) => {
  if (cardsData.length === 0) {
    renderElement(siteMoviesContainerElement, new NoMovies().getElement(), BEFORE_END);
  }
  for (let i = 0; i < cardsData.length; i++) {
    let cardEl = new MovieCard(cardsData[i]).getElement();
    renderElement(siteMoviesContainerElement, cardEl, BEFORE_END);
    cardEl.querySelector(`.film-card img`).addEventListener(`click`, openPopupCardHandler);
    cardEl.querySelector(`.film-card__comments`).addEventListener(`click`, openPopupCardHandler);
    cardEl.querySelector(`.film-card__title`).addEventListener(`click`, openPopupCardHandler);
  }


};


const siteStatisticsContainerElement = document.querySelector(`.footer__statistics`);
renderElement(siteStatisticsContainerElement, new MovieStatistics(cards.length).getElement(), BEFORE_END);

const sortButtonsEls = document.querySelectorAll(`.sort__button`);

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

const clearCards = () => {
  siteMoviesContainerElement.innerHTML = ``;
};

const clickButtonHandler = (evt) => {
  let activeButton = document.querySelector(`.sort__button--active`);
  let index = Array.from(sortButtonsEls).indexOf(evt.target);
  let indexActive = Array.from(sortButtonsEls).indexOf(activeButton);
  if (indexActive !== index) {
    clearCards();
    sortButtonsEls.forEach((item) => {
      item.classList.remove(`sort__button--active`);
    });
    evt.target.classList.add(`sort__button--active`);

    switch (index) {
      case 0:
        sortedCards = cards;
        break;
      case 1:
        sortedCards = sortCardsByDate(cards);
        break;
      case 2:
        sortedCards = sortCardsByRate(cards);
    }
    renderCards(sortedCards.slice(0, MOVIES_CARD_COUNT));
    document.querySelector(`.films-list__show-more`).style.display = `block`;
  }
};
sortButtonsEls.forEach((item) => {
  item.addEventListener(`click`, clickButtonHandler);
});

const showMoreHandler = () => {
  const quantity = siteMoviesContainerElement.querySelectorAll(`.film-card`).length;
  renderCards(sortedCards.slice(quantity, MOVIES_CARD_COUNT + quantity));
  if (MOVIES_CARD_COUNT + quantity >= sortedCards.length) {
    document.querySelector(`.films-list__show-more`).style.display = `none`;
  }
};

document.querySelector(`.films-list__show-more`).addEventListener(`click`, showMoreHandler);
renderCards(sortedCards.slice(0, MOVIES_CARD_COUNT));

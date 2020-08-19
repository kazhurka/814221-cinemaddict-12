import {
  createMainNavTemplate
} from "./view/main-nav";

import {
  createMovieInfoTemplate
} from "./view/movie-cards";
import {
  createMovieCardTemplate
} from "./view/movie-cards";
import {
  createMoviesContainerTemplate
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

import {
  generateCard
} from "./mock/card";

import {
  generateRank
} from "./mock/rank";


const MOVIES_CARD_COUNT = 5;
export const BEFORE_END = `beforeend`;
export const AFTER_BEGIN = `afterbegin`;

const generateCards = (quantity) => {
  return Array(quantity).fill(null).map(generateCard);
};


const cards = generateCards(20);
let sortedCards = cards;
let rank = generateRank();
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserRankTemplate(rank), BEFORE_END);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createSortTemplate(), BEFORE_END);
render(siteMainElement, createMainNavTemplate(rank), BEFORE_END);
render(siteMainElement, createMoviesListTemplate(), BEFORE_END);

const siteMoviesListElement = document.querySelector(`.films-list`);
render(siteMoviesListElement, createMoviesContainerTemplate(), BEFORE_END);
render(siteMoviesListElement, createShowMoreButtonTemplate(), BEFORE_END);

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
  render(bodyElement, createMovieInfoTemplate(sortedCards[index]), BEFORE_END);
  document.querySelector(`.film-details__close`).addEventListener(`click`, byClickClosePopupHandler);
  document.addEventListener(`keydown`, byKeyClosePopupHandler);
};

const siteMoviesContainerElement = siteMoviesListElement.querySelector(`.films-list__container`);
const renderCards = (cardsData) => {
  for (let i = 0; i < cardsData.length; i++) {
    render(siteMoviesContainerElement, createMovieCardTemplate(cardsData[i]), BEFORE_END);
  }
  document.querySelectorAll(`.film-card img`).forEach((item) => {
    item.addEventListener(`click`, openPopupCardHandler);
  });
  document.querySelectorAll(`.film-card__comments`).forEach((item) => {
    item.addEventListener(`click`, openPopupCardHandler);
  });
};


const siteStatisticsContainerElement = document.querySelector(`.footer__statistics`);
render(siteStatisticsContainerElement, createMovieStatisticsTemplate(cards.length), BEFORE_END);

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

import ShowMoreButton from "../view/show-more-button";
import MovieCard from "../view/movie-card";
import MoviesContainer from "../view/movies-container";
import MoviesSection from "../view/movies-section.js";
import NoMovies from "../view/no-movies";
import MovieInfo from "../view/movie-info";
import {
  BEFORE_END
} from "../main";
import {
  render
} from "../view/utils/render";
import Sort from "../view/sort";
import {
  SortTypes
} from "../view/const";
import {
  sortCardsByDate,
  sortCardsByRate
} from "../view/utils/common";


export default class MovieList {
  constructor(mainContainer) {
    this._mainContainer = mainContainer;
    this._moviesSectionComponent = new MoviesSection();
    this._moviesContainerComponent = new MoviesContainer();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._sortComponent = new Sort();
    this._MOVIES_CARD_COUNT = 5;
    this._currentSortType = SortTypes.DEFAULT;
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  init(cards) {
    this._renderSort();
    this._movieCards = cards.slice();
    this._sourcedMovieCards = cards.slice();
    render(this._mainContainer, this._moviesSectionComponent, BEFORE_END);
    render(this._moviesSectionComponent, this._moviesContainerComponent, BEFORE_END);
    this._renderShowMoreButton();
    this._renderCards(this._movieCards.slice(0, this._MOVIES_CARD_COUNT));
  }

  _renderCards(cardsData) {
    const removePopup = () => {
      document.querySelector(`.film-details__close`).removeEventListener(`click`, byClickClosePopupHandler);
      document.removeEventListener(`keydown`, byKeyClosePopupHandler);
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

    const openPopupCardHandler = (evt) => {
      const bodyElement = document.querySelector(`body`);
      const cardEls = Array.from(document.querySelectorAll(`.film-card`));
      let index = cardEls.indexOf(evt.target.parentNode);
      let popup = new MovieInfo(this._movieCards[index]).getElement();
      bodyElement.appendChild(popup);
      popup.querySelector(`.film-details__close`).addEventListener(`click`, byClickClosePopupHandler);
      document.addEventListener(`keydown`, byKeyClosePopupHandler);
    };

    if (cardsData.length === 0) {
      render(this._moviesContainerComponent, new NoMovies(), BEFORE_END);
    }
    for (let i = 0; i < cardsData.length; i++) {
      let cardEl = new MovieCard(cardsData[i]).getElement();
      render(this._moviesContainerComponent, cardEl, BEFORE_END);
      cardEl.querySelector(`.film-card img`).addEventListener(`click`, openPopupCardHandler);
      cardEl.querySelector(`.film-card__comments`).addEventListener(`click`, openPopupCardHandler);
      cardEl.querySelector(`.film-card__title`).addEventListener(`click`, openPopupCardHandler);
    }
  }


  _clearCards() {
    this._moviesContainerComponent.getElement().innerHTML = ``;
  }

  _renderShowMoreButton() {
    render(this._moviesSectionComponent, this._showMoreButtonComponent, BEFORE_END);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _handleShowMoreButtonClick() {
    const quantity = this._mainContainer.querySelectorAll(`.film-card`).length;
    this._renderCards(this._movieCards.slice(quantity, this._MOVIES_CARD_COUNT + quantity));
    if (this._MOVIES_CARD_COUNT + quantity >= this._movieCards.length) {
      document.querySelector(`.films-list__show-more`).style.display = `none`;
    }
  }

  _sortMovies(sortType) {
    switch (sortType) {
      case SortTypes.BY_DATE:
        this._movieCards.sort(sortCardsByDate);
        break;
      case SortTypes.BY_RATE:
        this._movieCards.sort(sortCardsByRate);
        break;
      default:
        this._movieCards = this._sourcedMovieCards.slice();
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortComponent.setActiveSortButton(sortType);
    this._sortMovies(sortType);
    this._clearCards();
    this._renderCards(this._movieCards.slice(0, this._MOVIES_CARD_COUNT));
    this._showMoreButtonComponent.activate();
  }
  _renderSort() {
    render(this._mainContainer, this._sortComponent, BEFORE_END);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }


}

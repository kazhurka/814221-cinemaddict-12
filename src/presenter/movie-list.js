import ShowMoreButton from "../view/show-more-button";
import CardPresenter from "./card";
import MoviesContainer from "../view/movies-container";
import MoviesSection from "../view/movies-section.js";
import NoMovies from "../view/no-movies";

import {
  BEFORE_END
} from "../main";
import {
  render
} from "../view/utils/render";
import Sort from "../view/sort";
import {
  SortTypes,
  MOVIES_CARD_COUNT
} from "../view/const";
import {
  sortCardsByDate,
  sortCardsByRate,
  updateItem
} from "../view/utils/common";


export default class MovieList {
  constructor(mainContainer) {
    this._mainContainer = mainContainer;
    this._moviesSectionComponent = new MoviesSection();
    this._moviesContainerComponent = new MoviesContainer();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._sortComponent = new Sort();
    this._MOVIES_CARD_COUNT = MOVIES_CARD_COUNT;
    this._currentSortType = SortTypes.DEFAULT;
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handlePopup = this._handlePopup.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleChangeMode = this._handleChangeMode.bind(this);
    this._cardPresenter = {};

  }

  init(cards) {
    this._renderSort();
    this._movieCards = cards.slice();
    this._sourcedMovieCards = cards.slice();
    render(this._mainContainer, this._moviesSectionComponent, BEFORE_END);
    render(this._moviesSectionComponent, this._moviesContainerComponent, BEFORE_END);
    this._renderShowMoreButton();
    this._renderCards(0, this._MOVIES_CARD_COUNT);
  }

  _renderCard(card) {
    const cardPresenter = new CardPresenter(this._moviesContainerComponent, this._handlePopup, this._handleCardChange, this._handleChangeMode);
    cardPresenter.init(card);
    this._cardPresenter[card.id] = cardPresenter;
  }

  _renderCards(from, to) {
    let cardsData = this._movieCards.slice(from, to);
    for (let i = 0; i < cardsData.length; i++) {
      this._renderCard(cardsData[i]);
    }
  }
  _renderNoCards() {
    if (this._movieCards.length === 0) {
      render(this._moviesContainerComponent, new NoMovies(), BEFORE_END);
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
    this._renderCards(quantity, this._MOVIES_CARD_COUNT + quantity);
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
    this._renderCards(0, this._MOVIES_CARD_COUNT);
    this._showMoreButtonComponent.activate();
  }

  _renderSort() {
    render(this._mainContainer, this._sortComponent, BEFORE_END);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handlePopup(card) {
    this._cardPresenter[card.id].openPopupCard();
  }

  _handleCardChange(updatedCard) {
    this._movieCards = updateItem(this._movieCards, updatedCard);
    this._sourcedMovieCards = updateItem(this._sourcedMovieCards, updatedCard);
    this._cardPresenter[updatedCard.id].init(updatedCard);
  }

  _handleChangeMode() {
    Object
      .values(this._cardPresenter).forEach((presenter) => presenter.resetView());
  }


}

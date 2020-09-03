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
} from "../view/utils.js/render";


export default class MovieList {
  constructor(mainContainer) {
    this._mainContainer = mainContainer;
    this._moviesSectionComponent = new MoviesSection();
    this._moviesContainerComponent = new MoviesContainer();
    this._showMoreButtonComponent = new ShowMoreButton();
    this._MOVIES_CARD_COUNT = 5;
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(sortedCards) {
    this._movieCards = sortedCards.slice();
    render(this._mainContainer, this._moviesSectionComponent, BEFORE_END);
    render(this._moviesSectionComponent, this._moviesContainerComponent, BEFORE_END);
    this._renderShowMoreButton();
    this._renderCards(this._movieCards.slice(0, this._MOVIES_CARD_COUNT));
  }

  _renderCards(cardsData) {
    const removePopup = () => {
      document.querySelector(`.film-details__close`).removeEventListener(`click`, byClickClosePopupHandler);
      document.querySelector(`.film-details__close`).removeEventListener(`keydown`, byKeyClosePopupHandler);
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
}

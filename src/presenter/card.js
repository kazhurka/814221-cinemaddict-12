import CardInfoView from "../view/card-info";
import CardView from "../view/card";
import {
  render,
  remove,
  replace
} from "../view/utils/render.js";
import {
  BEFORE_END
} from "../main";

const Mode = {
  CARD: `CARD`,
  POPUP: `POPUP`
};

export default class Card {
  constructor(cardsListContainer, handleOpenPopup, handleCardChange, handleChangeMode) {
    this._cardsListContainer = cardsListContainer;
    this._cardComponent = null;
    this._cardInfoComponent = null;
    this._handleOpenPopup = handleOpenPopup;
    this._handleCardChange = handleCardChange;
    this._handleChangeMode = handleChangeMode;
    this._mode = Mode.CARD;

    this._openPopupCardHandler = this._openPopupCardHandler.bind(this);
    this._handleAddToFavorite = this._handleAddToFavorite.bind(this);
    this._handleAddToWatch = this._handleAddToWatch.bind(this);
    this._handleWatched = this._handleWatched.bind(this);
    this._removePopup = this._removePopup.bind(this);


  }

  init(card) {
    this._card = card;
    const prevCardComponent = this._cardComponent;
    const prevCardInfoComponent = this._cardInfoComponent;
    this._cardComponent = new CardView(card);
    this._cardInfoComponent = new CardInfoView(card);

    this._cardComponent.setAddToWatchToggleHandler(this._handleAddToWatch);
    this._cardComponent.setFavoriteToggleHandler(this._handleAddToFavorite);
    this._cardComponent.setMarkAsWatchedToggleHandler(this._handleWatched);
    this._cardComponent._setCardInfoOpenHandlers(this._openPopupCardHandler);

    this._cardInfoComponent.setAddToWatchToggleHandler(this._handleAddToWatch);
    this._cardInfoComponent.setFavoriteToggleHandler(this._handleAddToFavorite);
    this._cardInfoComponent.setMarkAsWatchedToggleHandler(this._handleWatched);
    this._cardInfoComponent.setCloseByClickHandler(this._removePopup);


    if ((prevCardComponent === null) || (prevCardInfoComponent === null)) {
      render(this._cardsListContainer, this._cardComponent, BEFORE_END);
      return;
    }
    if (this._mode === Mode.CARD) {
      replace(this._cardComponent, prevCardComponent);
    }
    if (this._mode === Mode.POPUP) {
      replace(this._cardInfoComponent, prevCardInfoComponent);
    }

    remove(prevCardInfoComponent);
    remove(prevCardComponent);
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._cardInfoComponent);
  }

  _removePopup() {
    this._cardInfoComponent.reset();
    this._cardInfoComponent.getElement().remove();
    this._cardInfoComponent.removeCloseByEscHandler();
    this._mode = Mode.CARD;
  }

  _openPopupCardHandler() {
    this._handleOpenPopup(this._card);
  }

  openPopupCard() {
    const bodyElement = document.querySelector(`body`);
    let popup = this._cardInfoComponent.getElement();
    bodyElement.appendChild(popup);
    this._cardInfoComponent.setCloseByEscHandler(this._removePopup);
    this._handleChangeMode();
    this._mode = Mode.POPUP;
  }
  resetView() {
    if (this._mode !== Mode.CARD) {
      this._removePopup();
    }
  }

  _handleAddToWatch() {
    this._handleCardChange(
        Object.assign({}, this._card, {
          toWatch: !this._card.toWatch
        })
    );
  }
  _handleAddToFavorite() {
    this._handleCardChange(Object.assign({}, this._card, {
      isFavorite: !this._card.isFavorite
    }));
  }

  _handleWatched() {
    this._handleCardChange(
        Object.assign({}, this._card, {
          isWatched: !this._card.isWatched
        })
    );
  }
}

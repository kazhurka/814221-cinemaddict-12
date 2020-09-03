import AbstractView from "./abstract.js";
import {
  createElement
} from "./utils.js/render.js";

const createSortButtonTemplate = () => {
  return (
    `<li><a href="#" class="sort__button"></a></li>`
  );
};

export class SortButtonAbstract extends AbstractView {

  constructor() {
    super();
    this._title = `Sort by`;
    this._clickHandler = this._clickHandler.bind(this);
  }

  makeActive() {
    this._element.firstChild.classList.add(`sort__button--active`);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      this._element.querySelector(`.sort__button`).textContent = this._title;
    }

    return this._element;
  }
  getTemplate() {
    return createSortButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(evt);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}

export class SortButtonDefault extends SortButtonAbstract {

  constructor() {
    super();
    this._title = `Sort by default`;
  }

}

export class SortButtonByDate extends SortButtonAbstract {

  constructor() {
    super();
    this._title = `Sort by date`;
  }


}

export class SortButtonByRating extends SortButtonAbstract {

  constructor() {
    super();
    this._title = `Sort by rating`;
  }

}

import AbstractView from "./abstract.js";
import {
  SortTypes

} from "./const.js";
const createSortTemplate = () => {
  return (

    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortTypes.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortTypes.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortTypes.BY_RATE}">Sort by rating</a></li>
  </ul>`
  );
};

export default class Sort extends AbstractView {

  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

  setActiveSortButton(sortType) {
    const sortButtonsEls = document.querySelectorAll(`.sort__button`);
    let activeButton = document.querySelector(`.sort__button--active`);
    activeButton.classList.remove(`sort__button--active`);
    sortButtonsEls.forEach((item) => {
      if (item.dataset.sortType === sortType) {
        item.classList.add(`sort__button--active`);
      }
    });
  }
}

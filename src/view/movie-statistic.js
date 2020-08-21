import {
  createElement
} from "../utils.js";

const createMovieStatisticsTemplate = (numberOfCards) => {
  return (
    `<p>${numberOfCards} movies inside</p>`
  );
};

export default class MovieStatistics {
  constructor(quantity) {
    this._element = null;
    this._quantity = quantity;
  }

  getTemplate() {
    return createMovieStatisticsTemplate(this._quantity);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

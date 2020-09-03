import AbstractView from "./abstract.js";

const createMovieStatisticsTemplate = (numberOfCards) => {
  return (
    `<p>${numberOfCards} movies inside</p>`
  );
};

export default class MovieStatistics extends AbstractView {
  constructor(quantity) {
    super();
    this._quantity = quantity;
  }

  getTemplate() {
    return createMovieStatisticsTemplate(this._quantity);
  }

}

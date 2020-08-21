
import {
  createElement,
} from "../utils.js";


const createMoviesListTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
      </section>
    <section>`
  );
};

export default class MoviesList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMoviesListTemplate();
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

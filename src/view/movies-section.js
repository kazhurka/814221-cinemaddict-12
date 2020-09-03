
import AbstractView from "./abstract.js";

const createMoviesListTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
      </section>
    <section>`
  );
};

export default class MoviesSection extends AbstractView {

  getTemplate() {
    return createMoviesListTemplate();
  }
}

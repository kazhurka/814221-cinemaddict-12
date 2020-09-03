

import AbstractView from "./abstract.js";

const createMoviesContainerTemplate = () => {
  return (
    `<div class="films-list__container">
      </div>`
  );
};

export default class MoviesContainer extends AbstractView {

  getTemplate() {
    return createMoviesContainerTemplate();
  }
}


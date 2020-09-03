import AbstractView from "./abstract.js";
const createSortTemplate = () => {
  return (
    `<ul class="sort">
  </ul>`
  );
};

export default class Sort extends AbstractView {

  getTemplate() {
    return createSortTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

}

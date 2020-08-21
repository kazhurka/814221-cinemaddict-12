import {
  createElement
} from "../utils.js";

const createUserRankTemplate = (rank) => {

  let userRank;
  if (rank >= 1 && rank <= 10) {
    userRank = `novice`;
  } else if (rank > 10 && rank <= 20) {
    userRank = `fan`;
  } else if (rank > 20) {
    userRank = `movie buff`;
  }
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${userRank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35"></img>
  </section>`
  );
};

export default class UserRank {

  constructor(rank) {
    this._element = null;
    this._rank = rank;
  }

  getTemplate() {
    return createUserRankTemplate(this._rank);
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

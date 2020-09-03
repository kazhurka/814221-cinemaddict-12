import AbstractView from "./abstract.js";

const createCommentTemplate = (comment) => {
  const {
    emotion,
    text,
    author,
    date
  } = comment;
  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${emotion}" width="55" height="55" alt="emoji-angry"></img>
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );
};

export default class Comment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

}

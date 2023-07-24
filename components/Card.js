export default class Card {
  // Метод позволяющий принимать параметры и записывать их в экземпляр класса
  constructor(name, link, selectorTemplate, handleCardClick) {
    this.name = name;
    this.link = link;
    this.templateElement = document
      .querySelector(selectorTemplate)
      .content.querySelector(".element");
    this._createCard();
    this.handleCardClick = handleCardClick;
  }
  // Работа с DOM карточки
  _createCard() {
    this.cardElement = this.templateElement.cloneNode(true);
    const textElement = this.cardElement.querySelector(".element__title");
    this.imgElement = this.cardElement.querySelector(".element__image");
    this.buttonDelElement = this.cardElement.querySelector(".element__delete");
    this.cardLike = this.cardElement.querySelector(".element__heart");
    textElement.textContent = this.name;
    this.imgElement.src = this.link;
    this.imgElement.alt = this.name;
    this._addCardEvent();
    return this.cardElement;
  }
  // Добавление DOM элемента на страницу

  // Удаление карточки
  _removeCard() {
    this.cardElement.remove();
  }
  // Лайки карточки
  _likeCard(evt) {
    const like = evt.target;
    like.classList.toggle("element__heart_color_black");
  }
  // Добавление слушателей на карточку
  _addCardEvent() {
    this.buttonDelElement.addEventListener(
      "click",
      this._removeCard.bind(this)
    );
    this.imgElement.addEventListener("click", () =>
      this.handleCardClick(this.link, this.name)
    );
    this.cardLike.addEventListener("click", this._likeCard.bind(this));
  }
  // Возвращает карточку
  returnCard() {
    return this.cardElement;
  }
}

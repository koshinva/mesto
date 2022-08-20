class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const placeTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.place__element')
      .cloneNode(true);
    return placeTemplate;
  }

  _changeLike = () => {
    this._card
      .querySelector('.place__like')
      .classList.toggle('place__like_active');
  };

  _deleteCard = () => {
    this._card.remove();
    this._card = null;
  };

  _setEventListener(elementImage) {
    this._card
      .querySelector('.place__like')
      .addEventListener('click', this._changeLike);
    this._card
      .querySelector('.place__button-remove')
      .addEventListener('click', this._deleteCard);
    elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _createCard() {
    this._card = this._getTemplate();
    const placeElementImage = this._card.querySelector('.place__image');
    const placeElementName = this._card.querySelector('.place__name-city');
    this._setEventListener(placeElementImage);
    placeElementName.textContent = this._name;
    placeElementImage.src = this._link;
    placeElementImage.alt = this._name;
  }

  getCard() {
    this._createCard();
    return this._card;
  }
}

export default Card;

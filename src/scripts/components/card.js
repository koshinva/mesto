class Card {
  constructor(
    data,
    templateSelector,
    idUser,
    { handleCardClick, removeCard, deleteCardServer, likeCardServer, disLikeCardServer }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._idCard = data._id;
    this._idOwner = data.owner._id;
    this._idUser = idUser;
    this._countLike = data.likes.length;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._removeCard = removeCard;
    this._deleteCardServer = deleteCardServer;
    this._likeCardServer = likeCardServer;
    this._disLikeCardServer = disLikeCardServer;
  }
  _getTemplate() {
    const placeTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.place__element')
      .cloneNode(true);
    return placeTemplate;
  }

  _changeLike = (evt) => {
    if (!evt.currentTarget.classList.contains('place__like_active')) {
      evt.currentTarget.classList.add('place__like_active');
      this._likeCardServer(this._idCard).then((data) => {
        this._card.querySelector('.place__count-like').textContent = data.likes.length;
      });
    } else {
      evt.currentTarget.classList.remove('place__like_active');
      this._disLikeCardServer(this._idCard).then((data) => {
        this._card.querySelector('.place__count-like').textContent = data.likes.length;
      });
    }
  };

  _deleteCard = () => {
    this._removeCard().then(() => {
      this._card.remove();
      this._deleteCardServer(this._idCard);
    });
  };

  _setEventListener(elementImage, placeElementIconLike, placeElementIconDelete) {
    placeElementIconLike.addEventListener('click', this._changeLike);
    placeElementIconDelete.addEventListener('click', this._deleteCard);
    elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
  _changeCountLike(placeCountLike) {
    placeCountLike.textContent = this._countLike;
  }
  _checkIconDelete(placeElementIconDelete) {
    if (this._idOwner == this._idUser) {
      placeElementIconDelete.classList.add('place__button-remove_visible');
    }
  }
  _checkIconLike(placeElementIconLike) {
    if (this._likes.some((like) => like._id === this._idUser)) {
      placeElementIconLike.classList.add('place__like_active');
    }
  }
  _createCard() {
    this._card = this._getTemplate();
    const placeElementImage = this._card.querySelector('.place__image');
    const placeElementName = this._card.querySelector('.place__name-city');
    const placeElementIconLike = this._card.querySelector('.place__like');
    const placeElementIconDelete = this._card.querySelector('.place__button-remove');
    let placeCountLike = this._card.querySelector('.place__count-like');
    this._checkIconDelete(placeElementIconDelete);
    this._checkIconLike(placeElementIconLike);
    this._setEventListener(placeElementImage, placeElementIconLike, placeElementIconDelete);
    this._changeCountLike(placeCountLike);
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

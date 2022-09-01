class Card {
  constructor(
    data,
    templateSelector,
    idUser,
    { handleCardClick, removeCard, likeCardServer, disLikeCardServer }
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

  _changeLike = () => {
    if (!this._placeElementIconLike.classList.contains('place__like_active')) {
      this._likeCardServer(this._idCard)
        .then((data) => {
          this._renderIconLike(true, data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._disLikeCardServer(this._idCard)
        .then((data) => {
          this._renderIconLike(false, data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  _renderIconLike = (isLike, data) => {
    if (isLike) {
      this._placeElementIconLike.classList.add('place__like_active');
    } else {
      this._placeElementIconLike.classList.remove('place__like_active');
    }
    this._placeCountLike.textContent = data.likes.length;
  };

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _setEventListener = (elementImage) => {
    this._placeElementIconLike.addEventListener('click', this._changeLike);
    this._placeElementIconDelete.addEventListener('click', () =>
      this._removeCard()
    );
    elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };
  _changeCountLike = () => {
    this._placeCountLike.textContent = this._countLike;
  };
  _checkIconDelete = () => {
    if (this._idOwner == this._idUser) {
      this._placeElementIconDelete.classList.add(
        'place__button-remove_visible'
      );
    }
  };
  _checkIconLike = () => {
    if (this._likes.some((like) => like._id === this._idUser)) {
      this._placeElementIconLike.classList.add('place__like_active');
    }
  };
  _createCard() {
    this._card = this._getTemplate();
    this._placeElementIconLike = this._card.querySelector('.place__like');
    this._placeElementIconDelete = this._card.querySelector(
      '.place__button-remove'
    );
    this._placeCountLike = this._card.querySelector('.place__count-like');
    const placeElementImage = this._card.querySelector('.place__image');
    const placeElementName = this._card.querySelector('.place__name-city');
    this._checkIconDelete();
    this._checkIconLike();
    this._setEventListener(placeElementImage);
    this._changeCountLike();
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

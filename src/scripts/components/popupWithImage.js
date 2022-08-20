import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, selectorPopupImage, selectorPopupImageDescription) {
    super(popupSelector);
    this._imagePopupImage = document.querySelector(selectorPopupImage);
    this._descriptionPopupImage = document.querySelector(selectorPopupImageDescription);
  }
  open(name, link) {
    this._imagePopupImage.src = link;
    this._imagePopupImage.alt = name;
    this._descriptionPopupImage.textContent = name;
    super.open();
  }
}

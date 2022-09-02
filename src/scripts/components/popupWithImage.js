import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, selectorPopupImage, selectorPopupImageDescription) {
    super(popupSelector);
    this._imagePopupImage = this._popup.querySelector(selectorPopupImage);
    this._descriptionPopupImage = this._popup.querySelector(selectorPopupImageDescription);
  }
  open(name, link) {
    this._imagePopupImage.src = link;
    this._imagePopupImage.alt = name;
    this._descriptionPopupImage.textContent = name;
    super.open();
  }
}

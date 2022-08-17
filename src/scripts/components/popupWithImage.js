import Popup from './popup.js';
import {
  popupViewImageCardImage,
  popupViewImageDescription,
} from '../constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(name, link) {
    popupViewImageCardImage.src = link;
    popupViewImageCardImage.alt = name;
    popupViewImageDescription.textContent = name;
    super.open();
  }
}

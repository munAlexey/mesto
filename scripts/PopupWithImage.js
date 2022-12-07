import Popup from './popup.js';
import {cardsFullImg, cardsFullTitle} from './utils/constants.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(data) {
    super.open();
    cardsFullImg.src = data.link;
    cardsFullTitle.alt = data.name || data.title;
    cardsFullTitle.textContent = data.name || data.title;
  }
}

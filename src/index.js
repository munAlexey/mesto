import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js'
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import '../pages/index.css';
import { buttonEditProfile, formProfile, inputName, inputText,
  popupProfile, popupFullCards,
  cardsList, cardsListSelector, objUserInfo, iconProfile, titleProfile, subtitleProfile, inputTitle, inputLink, profileAddBtn, popupAddCard,
  formSubmitButton, configValidation, apiConfig, cardsCount, formAddCard } from './utils/constants.js';
import UserInfo from './components/UserInfo.js';
import {API} from './components/API.js';

const api = new API(apiConfig);

api.getProfileInfo().then((result) => {
  titleProfile.textContent = result.name;
  subtitleProfile.textContent = result.about;
  iconProfile.src = result.avatar;
});

const popupEditProfile = new Popup(popupProfile);
const popupAdd = new Popup(popupAddCard);
const popupFullOpen = new PopupWithImage(popupFullCards);
const formValidatorCard = new FormValidator(configValidation, formAddCard);
const formValidatorProfile = new FormValidator(configValidation, formProfile);

const initialCard = function (item) {
  const card = new Card(item, '#item', (item) => {
    popupFullOpen.setEventListeners();
    popupFullOpen.open(item);
  });
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
}

api.getCardsList().then(cards=> {
  const defaultCardList = new Section({items: cards, renderer: (item) => {
    initialCard(item);
  }}, cardsListSelector);
  defaultCardList.renderItems();
  cards.map((likes) => ({like: likes.likes})).forEach(element => {
    console.log(element.like.length);
    console.log(cardsCount)
  });
});

const profileInfo = new UserInfo(objUserInfo);

const popupProfileEdit = new PopupWithForm(popupProfile, (inputs) => {
  const profileEdit = new UserInfo(objUserInfo);
  profileEdit.setUserInfo();
  const profileUserInfo = profileInfo.getUserInfo();
  api.editProfileInfo(profileUserInfo); 
  popupEditProfile.setEventListeners();
  popupEditProfile.close();
}, formProfile);

popupProfileEdit.setEventListeners();

const popupWithForm = new PopupWithForm(popupAddCard, (inputs) => {
  api.createCard(inputs);
  initialCard(inputs);
  popupAdd.close();
}, formAddCard);

popupWithForm.setEventListeners();

formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();

buttonEditProfile.addEventListener('click', function () {
  const profileUserInfo = profileInfo.getUserInfo();
  popupEditProfile.setEventListeners();
  popupEditProfile.open();

  inputName.value = profileUserInfo.name;
  inputText.value = profileUserInfo.info;
});

profileAddBtn.addEventListener('click', function () {
  popupAdd.setEventListeners();
  popupAdd.open();
  formSubmitButton.setAttribute('disabled', 'disabled');
  formValidatorCard.disableButton();
  inputTitle.value = '';
  inputLink.value = '';
});
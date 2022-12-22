import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js'
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import '../pages/index.css';
import { buttonEditProfile, formProfile, inputName, inputText,
  popupProfile, popupFullCards,
  cardsList, cardsListSelector, objUserInfo, inputTitle, inputLink, profileAddBtn, popupAddCard,
  formSubmitButton, configValidation, initialCards, count, formAddCard } from './utils/constants.js';
import UserInfo from './components/UserInfo.js';

console.log(count)

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

const defaultCardList = new Section({items: initialCards, renderer: (item) => {
  initialCard(item);
}}, cardsListSelector);

defaultCardList.renderItems();

const profileInfo = new UserInfo(objUserInfo);

const popupProfileEdit = new PopupWithForm(popupProfile, (inputs) => {
  const profileEdit = new UserInfo(objUserInfo);
  profileEdit.setUserInfo();
  popupEditProfile.setEventListeners();
  popupEditProfile.close();
}, formProfile);

popupProfileEdit.setEventListeners();

const popupWithForm = new PopupWithForm(popupAddCard, (inputs) => {
  initialCard(inputs);
  popupAdd.close();
}, formAddCard);

popupWithForm.setEventListeners();

formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();

buttonEditProfile.addEventListener('click', function () {
  popupEditProfile.setEventListeners();
  popupEditProfile.open();

  const profileUserInfo = profileInfo.getUserInfo();
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

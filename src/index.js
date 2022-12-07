import Card from './components/card.js';
import FormValidator from './components/validate.js'
import Section from './components/Section.js';
import Popup from './components/popup.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import '../pages/index.css';
import { buttonEditProfile, formProfile, inputName, inputText,
  popupProfile, popupFullCards,
  cardsList, inputTitle, inputLink, profileAddBtn, popupAddCard,
  formSubmitButton, configValidation, initialCards, formAddCard } from './utils/constants.js';
import UserInfo from './components/UserInfo.js';

const popupEditProfile = new Popup(popupProfile);
const popupAdd = new Popup(popupAddCard);
const popupFullOpen = new PopupWithImage(popupFullCards);
const formValidatorCard = new FormValidator(configValidation, formAddCard);
const formValidatorProfile = new FormValidator(configValidation, formProfile);

const defaultCardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, '#item', (data) => {
    popupFullOpen.setEventListeners();
    popupFullOpen.open(data);
  });
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
}}, '.cards__list');

defaultCardList.renderItems();

const profileInfo = new UserInfo({userName: '#pop-up__name', userInfo: '#pop-up__text'});

const popupProfileEdit = new PopupWithForm(popupProfile, (inputs) => {
  const profileEdit = new UserInfo({userName: '#pop-up__name', userInfo: '#pop-up__text'});
  profileEdit.setUserInfo();
  popupEditProfile.setEventListeners();
  popupEditProfile.close();
}, formProfile);

popupProfileEdit.setEventListeners();

const popupWithForm = new PopupWithForm(popupAddCard, (inputs) => {
  const card = new Card(inputs, '#item', () => {
    popupFullOpen.open(inputs);
  });
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
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

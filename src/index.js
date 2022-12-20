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
  formSubmitButton, configValidation, formAddCard } from './utils/constants.js';
import UserInfo from './components/UserInfo.js';

fetch('https://mesto.nomoreparties.co/v1/cohort-56/users/me', {
  headers: {
      authorization: '9be9cc24-8f1f-4506-ba7e-99001911a764'
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result)
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

fetch('https://mesto.nomoreparties.co/v1/cohort-56/cards', {
  headers: {
    authorization: '9be9cc24-8f1f-4506-ba7e-99001911a764'
  }
})
.then(res => {
  return res.json();
})
.then((result) => {
  const defaultCardList = new Section({items: result, renderer: (item) => {
    initialCard(item);
  }}, cardsListSelector);
  defaultCardList.renderItems();
}); 

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
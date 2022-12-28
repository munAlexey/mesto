import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js'
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import '../pages/index.css';
import { PopupConfirm } from './components/PopupConfirm.js';
import { buttonEditProfile, formProfile, inputName, inputText,
  popupProfile, popupFullCards, formEditAva, profileBtnEditAva, popupEditAvatar, objAva,
  cardsList, cardsListSelector, objUserInfo, iconProfile, titleProfile, subtitleProfile, inputTitle, inputLink, profileAddBtn, popupAddCard,
  formSubmitButton, configValidation, apiConfig, popupDeleteCard, formAddCard } from './utils/constants.js';
import UserInfo from './components/UserInfo.js';
import {API} from './components/API.js';
import UserAvatarInfo from './components/UserAvatarInfo.js';

const api = new API(apiConfig);

api.getProfileInfo().then((result) => {
  window.userInfo = result;
  iconProfile.src = result.avatar;
  titleProfile.textContent = result.name;
  subtitleProfile.textContent = result.about;
}).catch(rej => {
  console.log(rej)
});

const popupEditProfile = new Popup(popupProfile);
const popupEditAva = new Popup(popupEditAvatar);
const popupAdd = new Popup(popupAddCard);
const popupFullOpen = new PopupWithImage(popupFullCards);
const formAvatarValidator = new FormValidator(configValidation, formEditAva);
const formValidatorCard = new FormValidator(configValidation, formAddCard);
const formValidatorProfile = new FormValidator(configValidation, formProfile);
const popupConfirmBtn = new PopupConfirm(popupDeleteCard);

const initialCard = function (item) {
  const card = new Card(item, '#item', (item) => {
    popupFullOpen.setEventListeners();
    popupFullOpen.open(item);
  },
    async (card) => {
      popupConfirmBtn.setEventListeners(() => {
        api.deleteCard(card._data._id).catch(rej => {
          console.log(rej)
        });
        card.handleDeleteBtn();
        popupConfirmBtn.close();
      });
      popupConfirmBtn.open();
    },
    async (isLike, card) => {
      if(!isLike) {
        api.getCardLike(card._data._id).then(res => {
          card.getNewLikes(res);
          card.addLike();
        })
      } else {
        api.deleteLike(card._data._id).then(res => {
          card.getNewLikes(res);
          card.removeLike();
        })
      }
    }
  );
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
}

const defaultCardList = new Section((item) => {
  initialCard(item);
}, cardsListSelector);

api.getCardsList().then(cards=> {
  defaultCardList.renderItems(cards);
}).catch(rej => {
  console.log(rej)
});

const popupAvatarEdit = new PopupWithForm(popupEditAvatar, (input, popup) => {
  const avatarEdit = new UserAvatarInfo(input);
  api.editProfileAvatar(avatarEdit._data)
  .catch(rej => {
    console.log(rej)
  })
  .finally(() => {
    popup.renderLoading(false, 'Сохранить')
  })
  
  iconProfile.src = input.link;
  popupEditAva.setEventListeners();
}, formEditAva);

popupAvatarEdit.setEventListeners()

 
const profileInfo = new UserInfo(objUserInfo); 

const popupProfileEdit = new PopupWithForm(popupProfile, (inputs, popup) => {
  const profileEdit = new UserInfo(objUserInfo);
  profileEdit.setUserInfo();
  const profileUserInfo = profileInfo.getUserInfo();
  api.editProfileInfo(profileUserInfo)
  .catch(rej => {
    console.log(rej)
  })
  .finally(() => {
    popup.renderLoading(false, 'Сохранить')
  });
}, formProfile);

popupProfileEdit.setEventListeners();

const popupCardForm = new PopupWithForm(popupAddCard, (inputs, popup) => {
  api.createCard(inputs).then((res) => {
    initialCard(res);
    popupAdd.close();
  }).catch(rej => {
    console.log(rej)
  }).finally(() => {
    popup.renderLoading(false, 'Создать');
  })
}, formAddCard);

popupCardForm.setEventListeners();

formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();
formAvatarValidator.enableValidation();

profileBtnEditAva.addEventListener('click', () => {
  popupEditAva.setEventListeners();
  popupEditAva.open();
  formSubmitButton.setAttribute('disabled', 'disabled');
  formAvatarValidator.disableButton();
})

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
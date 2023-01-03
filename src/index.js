import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js'
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import '../pages/index.css';
import { PopupConfirm } from './components/PopupConfirm.js';
import { buttonEditProfile, formProfile, inputName, inputText,
  popupProfile, popupFullCards, formEditAva, profileBtnEditAva, popupEditAvatar,
   cardsListSelector, objUserInfo, iconProfile, titleProfile, subtitleProfile, inputTitle, inputLink, profileAddBtn, 
  popupAddCard, configValidation, apiConfig, popupDeleteCard, formAddCard } from './utils/constants.js';
import UserInfo from './components/UserInfo.js';
import {API} from './components/API.js';
import UserAvatarInfo from './components/UserAvatarInfo.js';

const api = new API(apiConfig);
const profileInfo = new UserInfo(objUserInfo); 


Promise.all([api.getCardsList(), api.getProfileInfo()])
.then(([cards, result]) => {
  let userInfo = result._id;
  const defaultCardList = new Section((item) => {
    defaultCardList.addItem(initialCard(item, userInfo))
  }, cardsListSelector);
  defaultCardList.renderItems(cards);
  iconProfile.src = result.avatar;
  titleProfile.textContent = result.name;
  subtitleProfile.textContent = result.about;

  const popupCardForm = new PopupWithForm(popupAddCard, (inputs, popup) => {
    api.createCard(inputs).then((res) => {
      defaultCardList.addItem(initialCard(res, userInfo));
      popupAdd.close();
    }).catch(rej => {
      console.log(rej)
    }).finally(() => {
      popup.renderLoading(false, 'Создать');
    })
  }, formAddCard);
  popupCardForm.setEventListeners();
});


const popupEditProfile = new Popup(popupProfile);
const popupEditAva = new Popup(popupEditAvatar);
const popupAdd = new Popup(popupAddCard);
const popupFullOpen = new PopupWithImage(popupFullCards);
const formAvatarValidator = new FormValidator(configValidation, formEditAva);
const formValidatorCard = new FormValidator(configValidation, formAddCard);
const formValidatorProfile = new FormValidator(configValidation, formProfile);
const popupConfirmBtn = new PopupConfirm(popupDeleteCard, (card) => {
  api.deleteCard(card._data._id)
  .then(() => {
    card.handleDeleteBtn();
    popupConfirmBtn.close();
  })
  .catch(rej => {
    console.log(rej)
  });
});

const initialCard = function (item, userInfo) {
  const card = new Card(item, '#item', (item) => {
    popupFullOpen.setEventListeners();
    popupFullOpen.open(item);
  },
    async (card) => {
      popupConfirmBtn.open(card);
      popupConfirmBtn.setEventListeners();
    },
    async (isLike, card) => {
      if(!isLike) {
        api.getCardLike(card._data._id)
        .then(res => {
          card.getNewLikes(res);
          card.addLike();
        })
        .catch(rej => {
          console.log(rej);
        })
      } else {
        api.deleteLike(card._data._id)
        .then(res => {
          card.getNewLikes(res);
          card.removeLike();
        }).catch(rej => {
          console.log(rej)
        });
      }
    }, userInfo
  );
  return card.generateCard();
}

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

popupAvatarEdit.setEventListeners();

const popupProfileEdit = new PopupWithForm(popupProfile, (inputs, popup) => {
  profileInfo.setUserInfo();
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

formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();
formAvatarValidator.enableValidation();

profileBtnEditAva.addEventListener('click', () => {
  popupEditAva.open();
  formAvatarValidator.disableButton();
});
popupEditAva.setEventListeners();

buttonEditProfile.addEventListener('click', function () {
  const profileUserInfo = profileInfo.getUserInfo();
  popupEditProfile.open();

  inputName.value = profileUserInfo.name;
  inputText.value = profileUserInfo.info;
});
popupEditProfile.setEventListeners();

profileAddBtn.addEventListener('click', function () {
  popupAdd.open();
  formValidatorCard.disableButton();
  inputTitle.value = '';
  inputLink.value = '';
});
popupAdd.setEventListeners();
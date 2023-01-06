import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js'
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import '../pages/index.css';
import { PopupConfirm } from './components/PopupConfirm.js';
import { buttonEditProfile, formProfile, inputName, inputText,
  popupProfile, popupFullCards, formEditAva, profileBtnEditAva, popupEditAvatar,
  cardsListSelector, objUserInfo, iconProfile, objAva, inputTitle, inputLink, profileAddBtn, 
  popupAddCard, configValidation, apiConfig, popupDeleteCard, formAddCard } from './utils/constants.js';
import UserInfo from './components/UserInfo.js';
import {API} from './components/API.js';
import UserAvatarInfo from './components/UserAvatarInfo.js';

const api = new API(apiConfig);
const profileInfo = new UserInfo(objUserInfo); 
const avatarEdit = new UserAvatarInfo(objAva);

let userInfo;

const popupCardForm = new PopupWithForm(popupAddCard, (inputs, popup) => {
  api.createCard(inputs).then((res) => {
    defaultCardList.addItem(initialCard(res));
  })
  .then(() => {
    popupCardForm.close();
  })
  .catch(rej => {
    console.log(rej)
  }).finally(() => {
    popup.renderLoading(false, 'Создать');
  });
}, formAddCard);


const defaultCardList = new Section((item) => {
  defaultCardList.addItem(initialCard(item));
}, cardsListSelector);

Promise.all([api.getCardsList(), api.getProfileInfo()])
.then(([cards, result]) => {
  userInfo = result._id;
  defaultCardList.renderItems(cards.reverse());
  profileInfo.setUserInfo({
    name: result.name,
    info: result.about
  })
  avatarEdit.setAvatarInfo({avatar: result.avatar});
  }).catch(rej => {
    console.log(rej)
});
popupCardForm.setEventListeners();

const popupFullOpen = new PopupWithImage(popupFullCards);
const formAvatarValidator = new FormValidator(configValidation, formEditAva);
const formValidatorCard = new FormValidator(configValidation, formAddCard);
const formValidatorProfile = new FormValidator(configValidation, formProfile);
const popupConfirmBtn = new PopupConfirm(popupDeleteCard, (card) => {
  api.deleteCard(card._data._id)
  .then(() => {
    card.handleDeleteBtn();
  })
  .then(() => {
    popupConfirmBtn.close();
  })
  .catch(rej => {
    console.log(rej)
  });
});
popupConfirmBtn.setEventListeners();

const initialCard = function (item) {
  const card = new Card(item, '#item', (item) => {
    popupFullOpen.open(item);
  },
    (card) => {
      popupConfirmBtn.open(card);
    },
    (isLike, card) => {
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
popupFullOpen.setEventListeners();

const popupAvatarEdit = new PopupWithForm(popupEditAvatar, (input, popup) => {
  api.editProfileAvatar(input)
  .then(res => {
    avatarEdit.setAvatarInfo({avatar: res.avatar});
  })
  .then(() => {
    popupAvatarEdit.close();
  })
  .catch(rej => {
    console.log(rej)
  })
  .finally(() => {
    popup.renderLoading(false, 'Сохранить')
  });
}, formEditAva);
popupAvatarEdit.setEventListeners();

const popupProfileEdit = new PopupWithForm(popupProfile, (inputs, popup) => {
  profileInfo.setUserInfo({
    name: inputs.name,
    info: inputs.profession
  })
  api.editProfileInfo(inputs)
  .then(() => {
    popupProfileEdit.close();
  })
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
  popupAvatarEdit.open();
  formAvatarValidator.disableButton();
});

buttonEditProfile.addEventListener('click', function () {
  const profileUserInfo = profileInfo.getUserInfo();
  popupProfileEdit.open();

  inputName.value = profileUserInfo.name;
  inputText.value = profileUserInfo.info;
});

profileAddBtn.addEventListener('click', function () {
  popupCardForm.open();
  formValidatorCard.disableButton();
  inputTitle.value = '';
  inputLink.value = '';
});
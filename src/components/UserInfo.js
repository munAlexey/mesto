import { titleProfile, subtitleProfile} from '../utils/constants.js';

export default class UserInfo {
  constructor({userName, userInfo}) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
  }

  getUserInfo() {
    return {
      name: titleProfile.textContent,
      info: subtitleProfile.textContent,
    }
  }

  setUserInfo(res) {   
    titleProfile.textContent = res.name;
    subtitleProfile.textContent = res.info;
  }
}
import {iconProfile} from '../utils/constants.js';

export default class UserAvatarInfo {
  constructor(data){
    this._data = data;
  }

  setAvatarInfo(result) {   
    iconProfile.src = result.avatar;
  }
}
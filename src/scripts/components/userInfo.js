export default class UserInfo {
  constructor({ selectorName, selectorProfession, selectorAvatar }) {
    this._profileName = document.querySelector(selectorName);
    this._profileProfession = document.querySelector(selectorProfession);
    this._profileAvatar = document.querySelector(selectorAvatar);
    this._id = '';
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      profession: this._profileProfession.textContent,
    };
  }
  getUserAvatar() {
    return this._profileAvatar.src;
  }
  setUserId(id) {
    this._id = id;
  }
  setUserInfo(name, profession) {
    this._profileName.textContent = name;
    this._profileProfession.textContent = profession;
  }
  setUserAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }
  getUserId() {
    return this._id;
  }
}

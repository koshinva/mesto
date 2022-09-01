export default class UserInfo {
  constructor({ selectorName, selectorProfession, selectorAvatar }) {
    this._profileName = document.querySelector(selectorName);
    this._profileProfession = document.querySelector(selectorProfession);
    this._profileAvatar = document.querySelector(selectorAvatar);
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
  setUserInfo(name, about) {
    this._profileName.textContent = name;
    this._profileProfession.textContent = about;
  }
  setUserAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }
  setUserId(id) {
    this._id = id;
  }
  getUserId() {
    return this._id;
  }
}

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
  setUserInfo({ name, about, avatar, _id }) {
    this._profileName.textContent = name;
    this._profileProfession.textContent = about;
    this._profileAvatar.src = avatar;
    this._id = _id;
  }
  getUserId() {
    return this._id;
  }
}

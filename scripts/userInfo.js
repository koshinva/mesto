export default class UserInfo {
  constructor({ selectorName, selectorProfession }) {
    this._selectorName = document.querySelector(selectorName);
    this._selectorProfession = document.querySelector(selectorProfession);
  }
  getUserInfo() {
    return {
      name: this._selectorName.textContent,
      profession: this._selectorProfession.textContent,
    };
  }
  setUserInfo(name, profession) {
    this._selectorName.textContent = name;
    this._selectorProfession.textContent = profession;
  }
}

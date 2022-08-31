export default class UserInfo {
  constructor({ selectorName, selectorProfession }) {
    this._profileName = document.querySelector(selectorName);
    this._profileProfession = document.querySelector(selectorProfession);
    this._id = '';
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      profession: this._profileProfession.textContent,
    };
  }
  setUserInfo(name, profession, id) {
    this._profileName.textContent = name;
    this._profileProfession.textContent = profession;
    this._id = id;
  }
  getUserId() {
    console.log(this._id);
  }
}

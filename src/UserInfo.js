import Api from './Api.js';

export default class UserInfo {
  constructor() {
    this.nameElement = document.querySelector('.profile__name');
    this.titleElement = document.querySelector('.profile__title');
    this.avatarElement = document.querySelector('.profile__image > img');
    this.api = new Api();

    this.getUserInfoFromApi();
  }

  getUserInfoFromApi() {
    this.api.getUserInfo().then((data) => {
      this._setUserInfo(data.name, data.avatar, data.about);
      document.body.id = data._id;
    });
  }

  getUserInfo() {
    return {
      nama: this.nameElement.textContent,
      title: this.titleElement.textContent,
    };
  }

  async setUserInfo(formData) {
    return await this.api
      .setUserInfo(formData)
      .then((data) => {
        this._setUserInfo(data.name, data.avatar, data.about);
        return data;
      })
      .catch(() => {
        throw new Error('Failed to set user info');
      });
  }

  _setUserInfo(name, avatar, about) {
    if (this.nameElement) {
      this.nameElement.textContent = name;
    }
    if (this.avatarElement) {
      this.avatarElement.src = avatar;
      this.avatarElement.alt = 'Profile Image';
    }
    if (this.titleElement) {
      this.titleElement.textContent = about;
    }
  }
}

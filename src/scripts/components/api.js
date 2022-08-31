export default class Api {
  constructor() {}
  async getUserInfo() {
    try {
      const resp = await fetch(
        'https://nomoreparties.co/v1/cohort-49/users/me',
        {
          headers: {
            authorization: 'eca0b75c-d6e7-4d32-8bb7-efde9f6a94ee',
          },
        }
      );
      const info = await resp.json();
      return info;
    } catch (err) {
      console.log(err);
    }
  }
  
  async getCardInfo() {
    try {
      const resp = await fetch(
        'https://mesto.nomoreparties.co/v1/cohort-49/cards',
        {
          headers: { authorization: 'eca0b75c-d6e7-4d32-8bb7-efde9f6a94ee' },
        }
      );
      const data = await resp.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async editProfile(name, about) {
    try {
      await fetch('https://mesto.nomoreparties.co/v1/cohort-49/users/me', {
        method: 'PATCH',
        headers: {
          authorization: 'eca0b75c-d6e7-4d32-8bb7-efde9f6a94ee',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  }

  async addNewCard(name, link) {
    try {
      const resp = await fetch(
        'https://mesto.nomoreparties.co/v1/cohort-49/cards',
        {
          method: 'POST',
          headers: {
            authorization: 'eca0b75c-d6e7-4d32-8bb7-efde9f6a94ee',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            link: link,
          }),
        }
      );
      const newCard = resp.json();
      return newCard;
    } catch (err) {
      console.error(err);
    }
  }

  async deleteCard(id) {
    try {
      await fetch(`https://mesto.nomoreparties.co/v1/cohort-49/cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: 'eca0b75c-d6e7-4d32-8bb7-efde9f6a94ee',
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async likeCard(id) {
    try {
      const resp = await fetch(
        `https://mesto.nomoreparties.co/v1/cohort-49/cards/${id}/likes`,
        {
          method: 'PUT',
          headers: {
            authorization: 'eca0b75c-d6e7-4d32-8bb7-efde9f6a94ee',
          },
        }
      );
      const data = await resp.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async disLikeCard(id) {
    try {
      const resp = await fetch(
        `https://mesto.nomoreparties.co/v1/cohort-49/cards/${id}/likes`,
        {
          method: 'DELETE',
          headers: {
            authorization: 'eca0b75c-d6e7-4d32-8bb7-efde9f6a94ee',
          },
        }
      );
      const data = await resp.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async apdateAvatar(urlAvatar) {
    try {
      await fetch(
        'https://mesto.nomoreparties.co/v1/cohort-49/users/me/avatar',
        {
          method: 'PATCH',
          headers: {
            authorization: 'eca0b75c-d6e7-4d32-8bb7-efde9f6a94ee',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            avatar: urlAvatar,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
}

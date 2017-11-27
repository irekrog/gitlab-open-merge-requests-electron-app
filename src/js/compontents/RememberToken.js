const Store = require('electron-store');
const store = new Store();

const createElement = require('../helpers/CreateElement');

class RememberToken {
  getToken(token) {
    this.token = token;
    this.showPopup();
  }

  showPopup() {
    const div = createElement('div', 'Save token?', 'opened-popup');
    const buttonYes = createElement('button', 'Yes', 'button', div);
    const buttonNo = createElement('button', 'No', 'button', div);

    buttonYes.addEventListener('click', () => {
      store.set('token', this.token);
      div.remove();
    });

    buttonNo.addEventListener('click', () => {
      div.remove();
    });
  }
}

module.exports = RememberToken;

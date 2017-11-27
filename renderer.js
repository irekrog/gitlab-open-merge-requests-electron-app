const Store = require('electron-store');

const MergeRequests = require('./src/js/compontents/MergeRequests');
const Settings = require('./src/js/compontents/Settings');
const RefreshApp = require('./src/js/compontents/RefreshApp');
const SomethingWentWrong = require('./src/js/compontents/SomethingWentWrong');

const store = new Store();

class Login {
  constructor() {
    const storedToken = store.get('token');
    storedToken ? new MergeRequests(storedToken) : this.getValue();
  }

  getValue() {
    const tokenInput = document.getElementById('token');
    const submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', e => {
      e.preventDefault();
      new MergeRequests(tokenInput.value);
      SomethingWentWrong.hide();  // TODO
    })
  }
}

new Login();
new Settings();
new RefreshApp();

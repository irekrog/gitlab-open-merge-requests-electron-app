const createElement = require('../helpers/CreateElement');

class SomethingWentWrong {
  static show() {
    this.el = createElement('div', 'Something went wrong. Try again later.', 'something-went-wrong');
  }

  static hide() {
    this.el.remove();
  }
}

module.exports = SomethingWentWrong;

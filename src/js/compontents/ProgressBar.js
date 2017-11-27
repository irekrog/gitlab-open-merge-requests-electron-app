const createElement  = require('../helpers/CreateElement');

class ProgressBar {
    static show() {
        this.div = createElement('div', '', 'overlay');
        createElement('div', 'Loading...', 'active-progress', this.div);
    }

    static hide() {
        this.div.remove();
    }
}

module.exports = ProgressBar;
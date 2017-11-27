const createElement = require('../helpers/CreateElement');

class Legend {
  static show() {
    const bottomMenu = document.getElementById('bottom-menu');
    const legend = createElement('div', '', 'legend', bottomMenu);

    legend.innerHTML = `
      <span>Legend:</span>
      <span class="user-can-approve">You can approve this</span>
      <span class="user-has-approved">You have approved this</span>
    `;
  }
}

module.exports = Legend;

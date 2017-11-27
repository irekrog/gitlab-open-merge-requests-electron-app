const Store = require('electron-store');
const store = new Store();
const CreateElement = require('../helpers/CreateElement');

class Settings {
    constructor() {
        this.root = document.getElementById('root');
        document.getElementById('settings').addEventListener('click', () => {
            this.show();
        });
    }

    show() {
        const content = `
            <div class="settings-popup" role="dialog" aria-labelledby="titlePopup" tabindex="0">
                <header>
                    <h2 id="titlePopup">Application settings</h2>
                </header>
                <button id="clear-local-memory" class="clear-local-memory button" ${store.get('token')? '' : `disabled`}>Clear local memory</button>
                <button id="close-popup" class="close-popup" aria-label="Close settings popup">X</button>
            </div>
        `;

        this.el = CreateElement('div', content, 'settings-container', document.body);
        this.root.classList.add('blurred');

        document.getElementById('clear-local-memory').addEventListener('click', () => {
            store.delete('token');
        });

        document.getElementById('close-popup').addEventListener('click', () => {
            this.hide();
        });
    }

    hide() {
        this.el.remove();
        this.root.classList.remove('blurred');
    }
}

module.exports = Settings;
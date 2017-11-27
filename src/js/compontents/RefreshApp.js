class RefreshApp {
  constructor() {
    document.getElementById('refresh').addEventListener('click', () => {
      location.reload();
    })
  }
}

module.exports = RefreshApp;

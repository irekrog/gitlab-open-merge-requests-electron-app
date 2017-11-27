const root = document.getElementById('root');

const CreateElement = (element, textContent = '', className = '', append = root) => {
  const el = document.createElement(element);
  el.innerHTML = textContent;
  className ? el.classList.add(className) : '';
  append.appendChild(el);
  return el;
};

module.exports = CreateElement;

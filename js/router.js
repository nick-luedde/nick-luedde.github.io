import { attach } from "./utils.js";
import { Bio } from "../pages/bio.js";
import { Projects } from "../pages/projects.js";

const notFound = () => {

  const root = document.createElement('section');
  root.textContent = 'Not found!';

  return {
    attach: attach(root),
    render: () => {}
  };
};

const pageRoot = document.querySelector('#app');

export const routes = (function() {
  
  /** @type {Map<string, () => AppPage>} */
  const map = new Map();
  map.set('#bio', Bio);
  map.set('#projects', Projects);

  return map;
})();

/**
 * @param {string} hash 
 */
const goToHash = (hash) => {

  const fn = routes.get(hash) || notFound;
  
  if (fn && pageRoot) {
    pageRoot.innerHTML = '';
    const page = fn();
    page.attach(pageRoot);
    window.history.pushState(null, '', window.location.href);
  }
};

/**
 * @param {string} hash 
 */
export const navigate = (hash) => {
  const current = window.location.hash;
  if (current !== hash) {
    window.location.hash = hash;
  } else {
    goToHash(hash);
  }
};

export const listen = () => window.addEventListener('hashchange', e => {
  const hash = window.location.hash;
  goToHash(hash);
});
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
  const bio = Bio();
  const projects = Projects();

  /** @type {Map<string, AppPage>} */
  const map = new Map();
  map.set('#bio', bio);
  map.set('#projects', projects);

  return map
})();

/**
 * @param {string} hash 
 */
const goToHash = (hash) => {

  const page = routes.get(hash) || notFound();
  
  if (page && pageRoot) {
    pageRoot.innerHTML = '';
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
  console.log('hashchange:event', e); //DEBUG
  console.log('hash', hash); //DEBUG
  goToHash(hash);
});
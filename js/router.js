import { attach } from "./utils.js";
import { Bio } from "../pages/bio.js";
import { Projects } from "../pages/projects.js";
import { Contact } from "../pages/contact.js";
import { Asv } from "../components/projects/asv.js";
import { AppsServerProject } from "../components/projects/appsserver.js";
import { DIP } from "../components/projects/dip.js";
import { Sda } from "../components/projects/sda.js";

const notFound = () => {

  const root = document.createElement('section');
  root.className = 'container max-w-screen-lg text-center m-auto p-2';
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
  map.set('#contact', Contact);

  map.set('#project/asv', Asv);
  map.set('#project/appsserver', AppsServerProject);
  map.set('#project/dip', DIP);
  map.set('#project/sda', Sda);

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
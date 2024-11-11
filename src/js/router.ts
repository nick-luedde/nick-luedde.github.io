import { attach } from "./utils";
import { Bio } from "../pages/bio";
import { Projects } from "../pages/projects";
import { Contact } from "../pages/contact";
import { Asv } from "../components/projects/asv";
import { AppsServerProject } from "../components/projects/appsserver";
import { DIP } from "../components/projects/dip";
import { Sda } from "../components/projects/sda";
import { Ipt } from "../components/projects/ipt";

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

  map.set('#project/ipt', Ipt);
  map.set('#project/asv', Asv);
  map.set('#project/appsserver', AppsServerProject);
  map.set('#project/dip', DIP);
  map.set('#project/sda', Sda);

  return map;
})();

const goToHash = (hash: string) => {

  const fn = routes.get(hash) || notFound;
  
  if (fn && pageRoot) {
    pageRoot.innerHTML = '';
    const page = fn();
    page.attach(pageRoot);
  }
};

export const navigate = (hash: string) => {
  const current = window.location.hash;
  if (current !== hash) {
    window.location.hash = hash;
  } else {
    goToHash(hash);
  }
};

export const listen = () => window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  goToHash(hash);
});
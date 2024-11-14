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

const _menus: { bio: Element | null, projects: Element | null, contact: Element | null } = {
  bio: null,
  projects: null,
  contact: null
};

// clunky and not my favorite implementation...
const menus = {
  bio: () => {
    if (!_menus.bio)
      _menus.bio = document.querySelector('#bio-menu');
    
    return _menus.bio;
  },
  projects: () => {
    if (!_menus.projects)
      _menus.projects = document.querySelector('#projects-menu');
    
    return _menus.projects;
  },
  contact: () => {
    if (!_menus.contact)
      _menus.contact = document.querySelector('#contact-menu');
    
    return _menus.contact;
  }
};

export const routes = (function() {
  
  const map = new Map<string, { menu: () => Element | null, page: AppPageRenderFunction }>();
  map.set('#bio', { menu: menus.bio, page: Bio});
  map.set('#projects', { menu: menus.projects, page: Projects});
  map.set('#contact', { menu: menus.contact, page: Contact });

  map.set('#project/ipt', { menu: menus.projects, page: Ipt });
  map.set('#project/asv', { menu: menus.projects, page: Asv });
  map.set('#project/appsserver', { menu: menus.projects, page: AppsServerProject });
  map.set('#project/dip', { menu: menus.projects, page: DIP });
  map.set('#project/sda', { menu: menus.projects, page: Sda });

  return map;
})();

const goToHash = (hash: string) => {

  const opt = routes.get(hash) || { menu: null, page: notFound };
  
  console.log(opt); //DEBUG
  
  if (opt && pageRoot) {
    pageRoot.innerHTML = '';
    const page = opt.page();
    page.attach(pageRoot);

    const activeClasses = [
      'text-sky-200',
      'underline'
    ];

    console.log(menus); //DEBUG

    Object.values(menus).forEach(mn => {
      const el = mn();
      if (el)
        el.classList.remove(...activeClasses);
    });
    if (opt.menu) {
      opt.menu()?.classList.add(...activeClasses);
    }
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
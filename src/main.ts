import { listen, navigate } from "./js/router.js";
import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";

listen();

const app = document.querySelector('#app');
const header = document.querySelector('#header');
const footer = document.querySelector('#footer');

if (!app || !header || !footer)
  throw new Error('Missing app element!');

Header().attach(header);
Footer().attach(footer);

navigate(window.location.hash || '#bio');
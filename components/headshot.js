import { attach } from "../js/utils.js";

/**
 * @param {{ classes: string[] }} props 
 */
export const Headshot = (props) => {

  const template = `
    <img class="rounded-full transition-opacity delay-150 duration-1000 opacity-0" src="./assets/headshot.jpg" alt="My headshot, I look great!"/>
  `;

  const root = document.createElement('figure');
  root.innerHTML = template;

  props.classes.forEach(cls => root?.classList.add(cls));
  
  const img = root.querySelector('img');

  const render = () => {
    if (!img) return;
    console.log('headshot rendering', img.className);

    img.classList.remove('opacity-0');
    img.classList.add('opacity-1');
  };

  return {
    attach: attach(root),
    render
  };
};
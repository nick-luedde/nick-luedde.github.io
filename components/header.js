import { attach } from "../js/utils.js";

export const Header = () => {

  const template = `
    <ul class="flex">
      <li class="px-3">
        <a href="#bio">Bio</a>
      </li>
      <li class="px-3">
        <a href="#projects">Projects</a>
      </li>
      <li class="px-3">
        <a href="#contact">Contact</a>
      </li>
    </ul>
  `;

  const root = document.createElement('nav');
  root.innerHTML = template;

  const render = () => {
  };

  return {
    attach: attach(root),
    render
  };
};
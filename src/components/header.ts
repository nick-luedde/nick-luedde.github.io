import { attach } from "../js/utils";

export const Header = () => {

  const template = `
    <ul class="flex">
      <li class="px-3">
        <a class="text-lg text-gray-300 outline-none focus:text-sky-200 focus:underline hover:text-sky-200 hover:underline " href="#bio">Bio</a>
      </li>
      <li class="px-3">
        <a class="text-lg text-gray-300 outline-none focus:text-sky-200 focus:underline hover:text-sky-200 hover:underline " href="#projects">Projects</a>
      </li>
      <li class="px-3">
        <a class="text-lg text-gray-300 outline-none focus:text-sky-200 focus:underline hover:text-sky-200 hover:underline " href="#contact">Contact</a>
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
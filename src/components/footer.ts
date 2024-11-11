import { attach } from "../js/utils";

export const Footer = () => {

  const template = `
    <p class="text-center">Built by me, with help from Tailwind.css</p>
  `;

  const root = document.createElement('article');
  root.innerHTML = template;

  const render = () => {
  };

  return {
    attach: attach(root),
    render
  };
};
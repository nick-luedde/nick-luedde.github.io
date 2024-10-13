import { attach } from "../js/utils.js";

export const Footer = () => {

  const template = `
    <p>Footer</p>
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
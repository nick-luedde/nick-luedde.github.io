import { attach } from "../../js/utils.js";

export const AppsServer = () => {

  const template = `
    
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  const render = () => {
  };

  return {
    attach: attach(root),
    render
  };
};
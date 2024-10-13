import { attach } from '../js/utils.js';

export const Projects = () => {

  const template = `
    <h1>Projects</h1>
    <ul>
      <li>GoogleSheetsDataAccess (AppsScript)</li>
      <li>AppsSchemaValidation (Javascript)</li>
      <li>Project tracking app (classic right?)</li>
      <li>Document import process (DIP)</li>
    </ul>
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
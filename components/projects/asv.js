import { attach } from "../../js/utils.js";
import AppsSchemaValidation from "../../js/AppsSchemaValidation.js";

export const Asv = () => {

  const template = `
    <p>
      Needed validation! Used this as an opportunity to write a bit of a validation tool from the ground up.
    </p>

    <article>

      <textarea id="input"></textarea>

      <button>Run validation!</button>

      <p id="result"></p>

    </article>

    <p>
    
    </p>
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  const input = root.querySelector('#input');
  const validate = root.querySelector('button');
  const result = root.querySelector('#result');

  const asv = AppsSchemaValidation.asv();

  //TODO: make this runnable!!

  input?.addEventListener('change', e => {

  });

  const render = () => {
  };

  return {
    attach: attach(root),
    render
  };
};
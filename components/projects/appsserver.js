import { attach } from "../../js/utils.js";

export const AppsServer = () => {

  const template = `
    <p>
      Apps started getting bigger.
      Always liked how Express (and other libraries like it) apps looked and felt, and wanted to have a tool that let me do some similar things.
    </p>

    <hr class="w-2/4 m-auto my-8" />

    <p>
      Here's an example...
    </p>

    <p>
    
    </p>
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  root.className = 'container max-w-screen-lg m-auto p-2 mt-4';

  const render = () => {
  };

  return {
    attach: attach(root),
    render
  };
};
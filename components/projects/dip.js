import { attach } from "../../js/utils.js";

export const DIP = () => {

  const template = `
    <p>
      Co-worker had a bit of a process for manually compiling a folder full of documents into a spreadsheet of metadata and a .zip directory.
      It was all mapped out in their step-by-step guide document, took the oportunity to translate those steps into a cool little C# Console Application
      to automate some of the tedium! 
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
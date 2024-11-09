import { attach } from "../../js/utils.js";

export const Ipt = () => {

  const template = `
    <section class="container max-w-screen-lg m-auto">
      <h1 class="text-green-400 text-xl mb-4">ProjectsTrackingApp</h1>
      <p>
        This has been a great sandbox project for ideas. Started as a way to keep track of daily tasks in a way that was better that docs and spreadsheets.
        Have had so much fun working on it, building new features and testing out new updates to the library of tools I'm using on it.
        <br>
        <br>
        <a href="https://github.com/nick-luedde/ipt" target="_blank" rel="noopener noreferrer" class="text-sky-200 underline focus:text-sky-300 hover:text-sky-300">It's worth a look at the source code.</a>
      </p>

      <hr class="w-2/4 m-auto my-8" />

      <p class="mb-11">
        Here is a sample app running all client side with a mock server. In an AppsScript deployment it has a complete server component.
      </p>
    </section>
    
    <section class="w-full h-[calc(100vh-70px)] px-2">
      <div class="border w-full h-full border-white">
        <iframe class="w-full h-full" src="./components/projects/ipt.html"></iframe>
      <div>
    </section>
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  root.className = 'px-2 mt-4 transition-opacity duration-1000 opacity-0';

  setTimeout(() => {
    root.classList.remove('opacity-0');
    root.classList.add('opacity-1');
  }, 150);

  const render = () => {
  };

  return {
    attach: attach(root),
    render
  };
};
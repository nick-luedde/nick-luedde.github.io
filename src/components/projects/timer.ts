import { attach } from "../../js/utils";

export const Apptimer = () => {

  const template = `
    <section class="container max-w-screen-lg m-auto">
      <h1 class="text-green-400 text-xl mb-4">AppTimerComponent</h1>
      <p>
        Cool set of Vue.js components. One lets you dock the element to any corner of the browser window. The other is a stopwatch/timer. Put them together and you've got timer overlay that you can keep around, but outta the way.
        <br>
        <br>
        <a href="https://github.com/nick-luedde/app-timer" target="_blank" rel="noopener noreferrer" class="text-sky-200 underline focus:text-sky-300 hover:text-sky-300">Check out the source code</a>
      </p>

      <hr class="w-2/4 m-auto my-8" />

      <p class="mb-11">
        Check it out in this sample app below.
      </p>
    </section>
    
    <section class="w-full h-[calc(100vh-70px)] px-2">
      <div class="border w-full h-full border-white">
        <iframe class="w-full h-full" src="./timer.html"></iframe>
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
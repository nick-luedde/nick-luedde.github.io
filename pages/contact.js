import { attach } from '../js/utils.js';

export const Contact = () => {

  const template = `

    <div id="links" class="transition-opacity duration-1000 opacity-0 mt-40">

      <p class="mt-20 mb-4 text-center text-3xl">
        Get in touch!
      </p>

      <div class="flex items-center justify-center gap-2">
        <figure class="inline-block">
          <img src="./assets/LI-In-Bug.png" alt="LinkedIn" class="w-auto h-8"/>
        </figure>
        <a href="https://www.linkedin.com/in/nicholas-luedde" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
      
      <p class="mt-20 mb-4 text-center text-3xl">
        Check me out on GitHub
      </p>
      
      <div class="flex items-center justify-center gap-2">
        <figure class="inline-block">
          <img src="./assets/github-mark-white.svg" alt="GitHub" class="w-auto h-8"/>
        </figure>
        <a href="https://github.com/nick-luedde" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>

    <div id="blurb" class="transition-opacity duration-1000 opacity-0">

    </div>
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  root.className = 'container max-w-screen-lg m-auto p-2';
 
  const links = root.querySelector('#links');
  if (links) {
    setTimeout(() => {
      links.classList.remove('opacity-0');
      links.classList.add('opacity-1');
    }, 150);
  }

  const blurb = root.querySelector('#blurb');
  if (blurb) {
    setTimeout(() => {
      blurb.classList.remove('opacity-0');
      blurb.classList.add('opacity-1');
    }, 350);
  }

  const render = () => {
  };

  return {
    attach: attach(root),
    render
  };
};
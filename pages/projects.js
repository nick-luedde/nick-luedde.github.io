import { attach } from '../js/utils.js';
import { projects } from '../js/projectList.js';
import { ProjectCard } from '../components/projects/projectCard.js';

export const Projects = () => {

  const template = `
    <ul class="flex flex-wrap">
    </ul>
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  root.className = 'container m-auto';

  const ul = root.querySelector('ul');

  const render = () => {
    if (!ul) return;
    ul.innerHTML = '';
    const cards = projects.map(detail => ProjectCard({ detail }));
    cards.forEach((card, i) => {
      const li = document.createElement('li');
      li.className = 'w-1/2 h-80 transition-opacity duration-1000 opacity-0 p-3';

      setTimeout(() => {
        li.classList.remove('opacity-0');
        li.classList.add('opacity-1');
      }, (i + 1) * 250);
      card.attach(li);
      card.render();
      ul?.appendChild(li);
    });
  };

  render();

  return {
    attach: attach(root),
    render
  };
};

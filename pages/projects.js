import { attach } from '../js/utils.js';
import { projects } from '../js/projectList.js';
import { ProjectCard } from '../components/projects/projectCard.js';

export const Projects = () => {

  const template = `
    <h1>Projects</h1>
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
    cards.forEach(card => {
      const li = document.createElement('li');
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
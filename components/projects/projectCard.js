import { navigate } from "../../js/router.js";
import { attach } from "../../js/utils.js";

/**
 * @param {{ detail: ProjectCardDetail }} props
 */
export const ProjectCard = (props) => {

  const template = `
    <figure class="flex-none w-24">  
      <img class="rounded-lg" />
    </figure>
    
    <div class="ml-2">
      <p class=""></p>
      <p class=""></p>
    </div>
  `;

  const root = document.createElement('article');
  root.innerHTML = template;

  root.className = 'flex items-center rounded-xl bg-slate-700 p-2 my-8';
  root.tabIndex = 0;

  const img = root.querySelector('img');
  if (img)
    img.src = props.detail.img;

  //@ts-ignore
  const [title, blurb] = [...root.querySelectorAll('p')];

  root.addEventListener('click', () => navigate(props.detail.hash));

  const render = () => {
    title.textContent = props.detail.name;
    blurb.textContent = props.detail.blurb;
  };

  return {
    attach: attach(root),
    render
  };
};
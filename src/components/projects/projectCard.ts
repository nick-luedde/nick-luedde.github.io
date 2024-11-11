import { attach } from "../../js/utils";

export const ProjectCard = (props: { detail: ProjectCardDetail }) => {

  // const template = `
  //   <figure class="flex-none w-24">  
  //     <img class="rounded-lg" />
  //   </figure>
    
  //   <div class="ml-2">
  //     <p></p>
  //     <p></p>
  //   </div>
  // `;

  const template = `
    <div>
      <p>
        <span class="text-blue-400">project</span> <span id="p-title" class="text-green-400"></span> <span class="text-gray-200">{</span>
      </p>
      <p class="pl-4 my-2 border-l border-l-gray-600"></p>
      <span class="text-gray-200">}</span>
    </div>
  `;

  const root = document.createElement('a');
  root.innerHTML = template;

  root.className = 'w-full h-full flex rounded-xl p-2 my-8 outline-2 hover:outline hover:outline-blue-500 focus:outline focus:outline-blue-500';
  root.href = props.detail.hash;

  const title = root.querySelector('#p-title');
  

  //@ts-ignore
  const [_, blurb] = [...root.querySelectorAll('p')];
  
  const render = () => {
    //@ts-ignore
    title.textContent = props.detail.name;
    blurb.textContent = props.detail.blurb;
  };

  return {
    attach: attach(root),
    render
  };
};
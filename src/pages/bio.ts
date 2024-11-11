import { attach } from '../js/utils';

export const Bio = () => {

  const template = `

    <div id="pic" class="mt-6 flex flex-col-reverse md:flex-row items-center transition-opacity duration-1000 opacity-0">
      
      <p class="mt-2 md:m-0">
        Hey, I'm Nick, and I'm a developer working with JavaScript, TypeScript, HTML, CSS, SQL, and some C# here and there.
      </p>
      
      <figure class="flex-none w-36 h-auto md:w-auto md:h-80">
        <img class="border-2 border-white rounded-full h-auto md:w-auto md:h-80" src="./headshot.jpg" alt="My headshot, I look great!"/>
      </figure>
      
    </div>

    <div id="blurb" class="transition-opacity duration-1000 opacity-0">

      <hr class="w-2/4 m-auto my-8" />

      <p>
        My background is in Economics, though I'm not sure I was ever particularly good at it!
        But I was pretty good at data modeling, enjoy math and reasoning, and started applying myself to learning SQL.
        From there I got into VBA, and found out I really love programming. In the years since, I've had the opportunity to really expand the programming tools I work with,
        which led to Web Developement and C# .NET desktop apps.
        <br>
        And that leads us to now, where I want to show off some of the fun stuff I've built and worked with along the way!
      </p>
      
      <hr class="w-2/4 m-auto my-8" />
        <h2>Some skills and tools in my kit...</h2>

        <article class="flex flex-wrap justify-center">

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>Vue.js</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>BULMA.css</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>.NET</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>Accessible design</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>Responsive design</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>Design patterns</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>git</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>Agile</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>APIs</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

          <div class="w-1/2 md:w-1/4 p-3 text-center">
            <p>TDD (not as often as I should)</p>
            <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
          </div>

        </article>
    </div>
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  root.className = 'container max-w-screen-lg m-auto p-2';
 
  const pic = root.querySelector('#pic');
  if (pic) {
    setTimeout(() => {
      pic.classList.remove('opacity-0');
      pic.classList.add('opacity-1');
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
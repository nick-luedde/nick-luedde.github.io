import { attach } from '../js/utils.js';

export const Bio = () => {

  const template = `

    <div id="pic" class="pt-6 flex items-center transition-opacity duration-1000 opacity-0">
      <p>
        Hey, I'm Nick, and I'm a developer working with JavaScript, HTML, CSS, SQL, and some C# here and there.
      </p>
      <div>
        <figure class="w-36 h-36">
          <img class="rounded-full" src="./assets/headshot.jpg" alt="My headshot, I look great!"/>
        </figure>
      </div>
    </div>

    <div id="blurb" class="transition-opacity duration-1000 opacity-0">

      <hr class="w-2/4 m-auto my-8" />

      <p>
        My background is in Economics, though I'm not sure I was ever particularly good at it!
        But I was pretty good at data modeling, enjoy math and reasoning, and started applying myself to learning SQL.
        From there I got into VBA, and found out I really enjoy programming. In the years since, I've had the opportunity to really expand the programming tools I work with,
        which led to Web Developement and C# .NET desktop apps.
        <br>
        And that leads us to now, where I want to show off some of the fun stuff I've built and worked with along the way!
      </p>

      <hr class="w-2/4 m-auto my-8" />

      <p>
        <a href="#projects" class="outline-none hover:underline focus:underline">
          Check out my some of my projects...
        </a>
      </p>
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
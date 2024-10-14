import { attach } from '../js/utils.js';
import { Headshot } from '../components/headshot.js';

export const Bio = () => {

  const template = `
    <p id="pic" class="pt-6 flex justify-center"></p>

    <p>
      Hey, I'm Nick, and I'm a developer working with JavaScript, HTML, CSS, SQL, and some C# here and there.
    </p>

    <hr class="w-2/4 m-auto my-8" />

    <p>
      My background is in Economics, though I'm not sure I was ever particularly good at it!
      But I was pretty good at data modeling, enjoy math and reasoning, and started applying myself to learning SQL.
      From there I got into VBA, which led to my current job. I've had the opportunity to really expand the programming tools I work with,
      which led to Web Developement and some work with C# on desktop apps.
      <br>
      And that leads us to now, where I want to show off some of the fun stuff I've built and worked with along the way!
    </p>

    <hr class="w-2/4 m-auto my-8" />

    <p>
      <a href="#projects" class="outline-none hover:underline focus:underline">
        Check out my project library...
      </a>
    </p>

    <hr class="w-2/4 m-auto my-8" />

    <p>
      Tools I'm getting used to so far:
      <br />
      Vue.js, Bulma.css
    </p>
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  root.className = 'container m-auto';
 
  const pic = root.querySelector('#pic');
  if (pic) {
    const hs = Headshot({ classes: ['w-36', 'h-36'] });
    hs.attach(pic);
    setTimeout(() => hs.render(), 100);
  }

  const render = () => {
  };

  return {
    attach: attach(root),
    render
  };
};
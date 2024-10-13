import { attach } from '../js/utils.js';

export const Bio = () => {

  const template = `
    <p>
      Hey, I'm Nick, and I'm a developer working with JavaScript, HTML, CSS, SQL, and some C# here and there.
    </p>

    <p>
      My background is in Economics, though I'm not sure I was ever particularly good at it!
      But I was pretty good at data modeling, enjoy math and reasoning, and started applying myself to learning SQL.
      From there I got into VBA, which led me my current job. I've had the opportunity to really expand the tools I work with,
      which led to Web developement and some work with C# on desktop apps.
      <br>
      And that leads us to now, where I want to show off some of the fun stuff I've built and worked with along the way!
    </p>

    <p>
      Check out my project library...
    </p>
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  const render = () => {
  };

  return {
    attach: attach(root),
    render
  };
};
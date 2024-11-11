import { attach } from "../../js/utils";
import AppsSchemaValidation from "../../js/AppsSchemaValidation.js";

export const Asv = () => {

  const template = `
    <h1 class="text-green-400 text-xl mb-4">AppsSchemaValidation</h1>
    <p>
      Needed validation! Used this as an opportunity to write a bit of a validation tool from the ground up.
      Built it to work on the server and in the browser.
    </p>

    <hr class="w-2/4 m-auto my-8" />

    <p class="mb-2">
      Let's check it out in action...
    </p>

    <div class="flex flex-col md:flex-row gap-3">
      <p class="flex-1 break-all whitespace-pre-wrap p-3 bg-black border rounded-xl border-white">
<span class="text-blue-400">const</span> <span class="text-blue-200">asv</span> = <span class="text-green-400">AppsSchemaValidation</span>.<span class="text-yellow-200">asv</span>();

<span class="text-blue-400">const</span> <span class="text-blue-200">schema</span> = <span class="text-blue-200">asv</span>.<span class="text-yellow-200">build</span>({
  title: <span class="text-blue-400">asv</span>.<span class="text-yellow-200">string</span>().<span class="text-yellow-200">required</span>(),
  tags: <span class="text-blue-400">asv</span>.<span class="text-yellow-200">array</span>().<span class="text-yellow-200">schema</span>(<span class="text-blue-400">asv</span>.<span class="text-yellow-200">string</span>()),
  rating: <span class="text-blue-400">asv</span>.<span class="text-yellow-200">number</span>()
});

<span class="text-blue-400">const</span> <span class="text-blue-200">validResults</span> = <span class="text-blue-200">schema</span>.<span class="text-yellow-200">validate</span>({
  title: <span class="text-red-300">'Hey I'm valid!'</span>,
  tags: [<span class="text-red-300">'awesome'</span>, <span class="text-red-300">'rad'</span>],
  rating: 10
});
<span class="text-green-600">// Run the valid results to see the schema output</span>

<span class="text-blue-400">const</span> <span class="text-blue-200">errors</span> = <span class="text-blue-200">schema</span>.<span class="text-yellow-200">validate</span>({
  tags: [1],
  rating: <span class="text-red-300">'Not a number...'</span>
});
<span class="text-green-600">// Run the invalid results to see the schema output</span>
      </p>

      <article class="flex-1 rounded-xl bg-black border border-white">
        <div class="flex">
          <button id="valid" class="flex-1 rounded-tl-xl bg-blue-600 text-white p-2">Run valid</button>
          <button id="invalid" class="flex-1 rounded-tr-xl bg-red-700 text-white p-2">Run invalid</button>
        </div>
        <p id="result" class="whitespace-pre-wrap p-3 rounded-b-xl transition-colors duration-700"></p>
      </article>
    </div>
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  root.className = 'container max-w-screen-lg m-auto p-2 mt-4 transition-opacity duration-1000 opacity-0';

  setTimeout(() => {
    root.classList.remove('opacity-0');
    root.classList.add('opacity-1');
  }, 150);

  const valid = root.querySelector('#valid');
  const invalid = root.querySelector('#invalid');
  const result = root.querySelector('#result');
  
  const asv = AppsSchemaValidation.asv();

  const schema = asv.build({
    title: asv.string().required(),
    tags: asv.array().schema(asv.string()),
    rating: asv.number()
  });

  const runValid = () => {
    if (!valid || !result) return;

    const results = schema.validate({
      title: "Hey I'm valid!",
      tags: ['awesome', 'rad'],
      rating: 10
    });

    result.classList.remove('bg-red-700');
    result.classList.add('bg-blue-600');

    result.textContent = JSON.stringify(results, null, 2);
  };

  const runInvalid = () => {
    if (!invalid || !result) return;
    const errors = schema.validate({
      tags: [1],
      rating: 'Not a number...'
    });

    result.classList.remove('bg-blue-600');
    result.classList.add('bg-red-700');

    result.textContent = JSON.stringify(errors, null, 2);
  };

  valid?.addEventListener('click', () => {
    runValid();
  });

  invalid?.addEventListener('click', () => {
    runInvalid();
  });

  const render = () => {
  };

  return {
    attach: attach(root),
    render
  };
};
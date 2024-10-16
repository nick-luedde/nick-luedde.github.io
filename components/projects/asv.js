import { attach } from "../../js/utils.js";
import AppsSchemaValidation from "../../js/AppsSchemaValidation.js";

export const Asv = () => {

  const template = `
    <p>
      Needed validation! Used this as an opportunity to write a bit of a validation tool from the ground up.
    </p>

    <hr class="w-2/4 m-auto my-8" />

    <p>
      Here's an example...
    </p>

    <code class="whitespace-pre-wrap">
const asv = AppsSchemaValidation.asv();

const schema = asv.build({
  title: asv.string().required(),
  tags: asv.array().schema(asv.string()),
  rating: asv.number()
});

const validResults = schema.validate({
  title: 'Hey I'm valid!',
  tags: ['awesome', 'rad'],
  rating: 10
});
    </code>

    <button id="valid" class="bg-blue-600 text-white rounded-md p-2">Run valid</button>
    <p id="valid-result" class="whitespace-pre-wrap"></p>

    <code class="whitespace-pre-wrap">
const errors = schema.validate({
  tags: [1],
  rating: 'Not a number...'
});
    </code>

    <button id="invalid" class="bg-blue-600 text-white rounded-md p-2">Run invalid</button>
    <p id="invalid-result" class="whitespace-pre-wrap"></p>
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  root.className = 'container max-w-screen-lg m-auto p-2 mt-4';

  const valid = root.querySelector('#valid');
  const validResult = root.querySelector('#valid-result');
  const invalid = root.querySelector('#invalid');
  const invalidResult = root.querySelector('#invalid-result');

  const asv = AppsSchemaValidation.asv();

  const schema = asv.build({
    title: asv.string().required(),
    tags: asv.array().schema(asv.string()),
    rating: asv.number()
  });

  const runValid = () => {
    if (!valid || !validResult) return;

    const results = schema.validate({
      title: "Hey I'm valid!",
      tags: ['awesome', 'rad'],
      rating: 10
    });

    validResult.textContent = JSON.stringify(results, null, 2);
  };

  const runInvalid = () => {
    if (!invalid || !invalidResult) return;
    const errors = schema.validate({
      tags: [1],
      rating: 'Not a number...'
    });

    invalidResult.textContent = JSON.stringify(errors, null, 2);
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
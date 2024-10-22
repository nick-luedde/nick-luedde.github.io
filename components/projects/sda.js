import { attach } from "../../js/utils.js";
import AppsSchemaValidation from "../../js/AppsSchemaValidation.js";

export const Sda = () => {

  const template = `
    <h1 class="text-green-400 text-xl mb-4">SheetDataAccess</h1>
    <p>
      Working on the Google Apps Script platform, Google Sheets was a cheap and easy, and mostly effective choice as a backend data source for small apps.
      Wrote the SheetDataAccess class to help make the CRUD operations a bit easier/friendly to achieve.
    </p>

    <hr class="w-2/4 m-auto my-8" />

    <p class="mb-2">
      Let's see what this one looks like...
    </p>

    <div class="flex flex-col md:flex-row gap-3">
      <p class="flex-1 whitespace-pre-wrap p-3 bg-black border rounded-xl border-white">
<span class="text-blue-400">const</span> <span class="text-blue-200">ds</span> = <span class="text-blue-400">new</span> <span class="text-green-400">SheetDataAccess</span>({ id: <span class="text-red-300">'your-sheet-id'</span> });

<span class="text-blue-400">const</span> <span class="text-blue-200">tasks</span> = <span class="text-blue-200">ds</span>.<span class="text-blue-200">collections</span>.<span class="text-green-400">Task</span>.<span class="text-yellow-200">data</span>();
<span class="text-blue-400">const</span> <span class="text-blue-200">importantTask</span> = <span class="text-blue-200">tasks</span>.<span class="text-yellow-200">find</span>(<span class="text-blue-200">tsk</span> => <span class="text-blue-200">tsk</span>.<span class="text-blue-200">desc</span> === <span class="text-red-300">'Take a break'</span>);

<span class="text-blue-200">importantTask</span>.<span class="text-blue-200">done</span> = <span class="text-blue-400">true</span>;
<span class="text-blue-400">const</span> <span class="text-blue-200">updated</span> = <span class="text-blue-200">ds</span>.<span class="text-blue-200">collections</span>.<span class="text-green-400">Task</span>.<span class="text-yellow-200">updateOne</span>(<span class="text-blue-200">importantTask</span>);

<span class="text-blue-400">const</span> <span class="text-blue-200">newTask</span> = {
  id: <span class="text-red-300">'456'</span>,
  desc: <span class="text-red-300">'Save the day with a bug fix'</span>,
  done: <span class="text-blue-400">false</span>
};
<span class="text-blue-400">const</span> <span class="text-blue-200">saved</span> = <span class="text-blue-200">ds</span>.<span class="text-blue-200">collections</span>.<span class="text-green-400">Task</span>.<span class="text-yellow-200">addOne</span>(<span class="text-blue-200">task</span>);
</p>

      <article class="flex-1 rounded-xl bg-black border border-white">
        <p id="result" class="whitespace-pre-wrap p-3 rounded-b-xl transition-colors duration-700">
// This assumes you have a Google Sheet with the following structure...

Tab name:
----------
|  Task  |
----------

Columns: 
--------------------------------
|   id   |   desc   |   done   |
--------------------------------
        </p>
      </article>
    </div>
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  root.className = 'container max-w-screen-lg m-auto p-2 mt-4';

  const render = () => {
  };

  return {
    attach: attach(root),
    render
  };
};
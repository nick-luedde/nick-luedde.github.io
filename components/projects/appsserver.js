import { attach } from "../../js/utils.js";
import AppsServer from "../../js/AppsServer.js";

export const AppsServerProject = () => {

  const template = `
    <h1 class="text-green-400 text-xl mb-4">AppsServer</h1>
    <p>
      Apps started getting bigger.
      Always liked how Express.js (and other libraries like it) apps looked and felt, and wanted to have a tool that let me do some similar things.
    </p>

    <hr class="w-2/4 m-auto my-8" />

    <p class="mb-2">
      Check it out...
    </p>

    <div class="flex flex-col md:flex-row gap-3">
      <p class="flex-1 break-all whitespace-pre-wrap p-3 bg-black border rounded-xl border-white">
<span class="text-blue-400">const</span> <span class="text-blue-200">server</span> = <span class="text-green-400">AppsServer</span>.<span class="text-yellow-200">create</span>();

<span class="text-blue-200">server</span>.<span class="text-yellow-200">use</span>(<span class="text-red-300">'/.*'</span>, (<span class="text-blue-200">req</span>, <span class="text-blue-200">res</span>, <span class="text-blue-200">next</span>) => {
  <span class="text-blue-400">const</span> <span class="text-blue-200">start</span> = <span class="text-green-400">Date</span>.<span class="text-yellow-200">now</span>();
  <span class="text-yellow-200">next</span>();
  <span class="text-blue-400">const</span> <span class="text-blue-200">end</span> = <span class="text-green-400">Date</span>.<span class="text-yellow-200">now</span>();
  <span class="text-blue-200">res</span>.<span class="text-yellow-200">headers</span>({ <span class="text-red-300">'app-response-time'</span>: <span class="text-blue-200">end</span> - <span class="text-blue-200">start</span> });
});

<span class="text-blue-200">server</span>.<span class="text-yellow-200">get</span>(<span class="text-red-300">'/tasks'</span>, (<span class="text-blue-200">req</span>, <span class="text-blue-200">res</span>) => {
  <span class="text-blue-400">const</span> <span class="text-blue-200">tasks</span> = [
    { id: 1, task: <span class="text-red-300">'Build a sweet portfolio'</span>, done: <span class="text-blue-400">false</span> },
    { id: 2, task: <span class="text-red-300">'Drink coffee'</span>, done: <span class="text-blue-400">true</span> },
  ];

  <span class="text-blue-200">res</span>.<span class="text-yellow-200">status</span>(<span class="text-blue-200">server</span>.<span class="text-blue-200">STATUS_CODE</span>.<span class="text-blue-200">SUCCESS</span>).<span class="text-yellow-200">send</span>(<span class="text-blue-200">tasks</span>);
});

<span class="text-blue-200">server</span>.<span class="text-yellow-200">post</span>(<span class="text-red-300">'/task/save'</span>, (<span class="text-blue-200">req</span>, <span class="text-blue-200">res</span>) => {
  <span class="text-blue-400">const</span> <span class="text-blue-200">task</span> = <span class="text-blue-200">req</span>.<span class="text-blue-200">body</span>;
  <span class="text-blue-200">console</span>.<span class="text-yellow-200">log</span>(<span class="text-blue-200">task</span>);

  <span class="text-blue-200">res</span>.<span class="text-yellow-200">status</span>(<span class="text-blue-200">server</span>.<span class="text-blue-200">STATUS_CODE</span>.<span class="text-blue-200">SUCCESS</span>).<span class="text-yellow-200">send</span>({ message: <span class="text-red-300">'Task totally saved, and not just logged to the console!'</span> });
});


<span class="text-blue-400">const</span> <span class="text-blue-200">taskResponse</span> = <span class="text-blue-200">server</span>.<span class="text-yellow-200">request</span>({
  method: <span class="text-red-300">'get'</span>,
  route: <span class="text-red-300">'/tasks'</span>
});
<span class="text-green-600">// Run the get tasks route</span>

<span class="text-blue-400">const</span> <span class="text-blue-200">saveResponse</span> = <span class="text-blue-200">server</span>.<span class="text-yellow-200">request</span>({
  method: <span class="text-red-300">'post'</span>,
  route: <span class="text-red-300">'/task/save'</span>,
  body: { id: 2, task: <span class="text-red-300">'Build a sweet portfolio'</span>, done: <span class="text-blue-400">true</span> }
});
<span class="text-green-600">// Run the save task route</span>
      </p>

      <article id="runner" class="flex-1 rounded-xl bg-black border border-white transition-colors duration-700">
        <div class="flex">
          <button id="tasks" class="flex-1 rounded-tl-xl bg-blue-900 text-white p-2">GET /tasks</button>
          <button id="save" class="flex-1 rounded-tr-xl bg-indigo-800 text-white p-2">POST /task/save</button>
          </div>
        <p id="result" class="whitespace-pre-wrap p-3 rounded-b-xl"></p>
      </article>
    </div>
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  root.className = 'container max-w-screen-lg m-auto p-2 mt-4';

  const tasks = root.querySelector('#tasks');
  const save = root.querySelector('#save');
  const result = root.querySelector('#result');
  const runner = root.querySelector('#runner');

  const server = AppsServer.create();

  server.use('/.*', (req, res, next) => {
    const start = Date.now();
    next();
    const end = Date.now();
    res.headers({ 'app-response-time': end - start });
  });

  server.get('/tasks', (req, res) => {
    const tasks = [
      { id: 1, task: 'Build a sweet portfolio', done: false },
      { id: 2, task: 'Drink coffee', done: true },
    ];

    res.status(server.STATUS_CODE.SUCCESS).send(tasks);
  });

  server.post('/task/save', (req, res) => {
    const task = req.body;
    console.log(task);

    res.status(server.STATUS_CODE.SUCCESS).send({ message: 'Task totally saved, and not just logged to the console!' });
  });


  const runTasks = () => {
    if (!save || !result || !runner) return;

    const taskResponse = server.request({
      method: 'get',
      route: '/tasks'
    });

    runner.classList.remove('bg-indigo-800');
    runner.classList.add('bg-blue-900');

    result.textContent = JSON.stringify(taskResponse, null, 2);
  };

  const runSave = () => {
    if (!tasks || !result || !runner) return;

    const saveResponse = server.request({
      method: 'post',
      route: '/task/save',
      body: { id: 2, task: 'Build a sweet portfolio', done: true }
    });

    runner.classList.remove('bg-blue-900');
    runner.classList.add('bg-indigo-800');

    result.textContent = JSON.stringify(saveResponse, null, 2);
  };

  save?.addEventListener('click', () => {
    runSave();
  });
  
  tasks?.addEventListener('click', () => {
    runTasks();
  });

  const render = () => {
  };

  return {
    attach: attach(root),
    render
  };
};
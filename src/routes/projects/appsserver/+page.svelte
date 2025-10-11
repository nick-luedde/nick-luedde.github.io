<script lang="ts">
  import AppsServer from "$lib/AppsServer";
  import { fade } from "svelte/transition";

  interface AppsRequest {
    method: "get" | "post" | "delete";
    headers?: { [key: string]: string };
    by?: string;
    auth?: object;
    rawRoute?: string;
    route: string;
    params?: { [key: string]: string };
    body?: object | null;
  }

  interface AppsResponse {
    status: number;
    type: string;
    headers: { [key: string]: string };
    body?: object | null;
    toType: () => string | object | null | undefined | AppsResponse;
  }

  interface AppsInternalResponse {
    // Internal request structure....
    res: AppsResponse;
    locals?: object;
    isSuccess: () => boolean;
    send: (body: object) => AppsResponse;
    render: (
      { html, file }: { html: string; file: string },
      props: object,
    ) => AppsResponse;
    type: (ty: string) => AppsInternalResponse;
    status: (code: number) => AppsInternalResponse;
    headers: (hdrs: { [key: string]: string }) => AppsInternalResponse;
  }

  type AppsNextMw = (i?: number) => void;

  const server = AppsServer.create();

  server.use(
    "/.*",
    (_req: AppsRequest, res: AppsInternalResponse, next: AppsNextMw) => {
      const start = Date.now();
      next();
      const end = Date.now();
      res.headers({ "app-response-time": String(end - start) });
    },
  );

  server.get("/tasks", (_req: AppsRequest, res: AppsInternalResponse) => {
    const tasks = [
      { id: 1, task: "Build a sweet portfolio", done: false },
      { id: 2, task: "Drink coffee", done: true },
    ];

    res.status(server.STATUS_CODE.SUCCESS).send(tasks);
  });

  server.post("/task/save", (req: AppsRequest, res: AppsInternalResponse) => {
    const task = req.body;
    console.log(task);

    res.status(server.STATUS_CODE.SUCCESS).send({
      message: "Task totally saved, and not just logged to the console!",
    });
  });

  let runningColor: "bg-blue-900" | "bg-indigo-800" | "" = $state("");
  let result = $state("");

  const runTasks = () => {
    const taskResponse = server.request({
      method: "get",
      route: "/tasks",
    });

    runningColor = "bg-blue-900";

    result = JSON.stringify(taskResponse, null, 2);
  };

  const runSave = () => {
    const saveResponse = server.request({
      method: "post",
      route: "/task/save",
      body: { id: 2, task: "Build a sweet portfolio", done: true },
    });

    runningColor = "bg-indigo-800";

    result = JSON.stringify(saveResponse, null, 2);
  };
</script>

<section in:fade class="container max-w-screen-lg m-auto pt-3">
  <h1 class="text-green-400 text-xl mb-4">AppsServer</h1>
  <p>
    Apps started getting bigger. Always liked how Express.js (and other
    libraries like it) apps looked and felt, and wanted to have a tool that let
    me do some similar things.
    <br />
    <br />
    <a
      href="https://github.com/nick-luedde/appsserver"
      target="_blank"
      rel="noopener noreferrer"
      class="text-sky-200 underline focus:text-sky-300 hover:text-sky-300"
      >Check out the source code</a
    >
  </p>

  <hr class="w-2/4 m-auto my-8" />

  <p class="mb-2">Check it out...</p>

  <div class="flex flex-col md:flex-row gap-3">
    <article
      class="flex-1 break-all whitespace-pre-wrap p-3 bg-black border rounded-xl border-white"
    >
      <p>
        <span class="text-blue-400">const</span>
        <span class="text-blue-200">server</span>
        = <span class="text-green-400">AppsServer</span>.<span
          class="text-yellow-200">create</span
        >();
      </p>

      <p>
        <span class="text-blue-200">server</span>.<span class="text-yellow-200"
          >use</span
        >(<span class="text-red-300">'/.*'</span>, (<span class="text-blue-200"
          >req</span
        >, <span class="text-blue-200">res</span>,
        <span class="text-blue-200">next</span>) => {"{"}
        <br />

        <span class="text-blue-400">&nbsp;&nbsp; const</span>
        <span class="text-blue-200">start</span>
        = <span class="text-green-400">Date</span>.<span class="text-yellow-200"
          >now</span
        >();
        <br />

        <span class="text-yellow-200">&nbsp;&nbsp; next</span>();
        <br />

        <span class="text-blue-400">&nbsp;&nbsp; const</span>
        <span class="text-blue-200">end</span>
        = <span class="text-green-400">Date</span>.<span class="text-yellow-200"
          >now</span
        >();
        <br />

        <span class="text-blue-200">&nbsp;&nbsp; res</span>.<span
          class="text-yellow-200">headers</span
        >({"{"}
        <br />

        <span class="text-red-300"
          >&nbsp;&nbsp;&nbsp;&nbsp; 'app-response-time'</span
        >:
        <span class="text-blue-200">end</span>
        - <span class="text-blue-200">start</span>
        <br />

        &nbsp;&nbsp; {"}"});
        <br />

        {"}"});
      </p>

      <p>
        <span class="text-blue-200">server</span>.<span class="text-yellow-200"
          >get</span
        >(<span class="text-red-300">'/tasks'</span>, (<span
          class="text-blue-200">req</span
        >, <span class="text-blue-200">res</span>) => {"{"}
        <br />

        &nbsp;&nbsp; <span class="text-blue-400">const</span>
        <span class="text-blue-200">tasks</span>
        = [
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp; {"{"}
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; id: 1,
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; task:
        <span class="text-red-300">'Build a sweet portfolio'</span>,
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; done:
        <span class="text-blue-400">false</span>
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp; {"}"},
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp; {"{"}
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; id: 2,
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; task:
        <span class="text-red-300">'Drink coffee'</span>,
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; done:
        <span class="text-blue-400">true</span>
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp; {"}"}
        <br />

        &nbsp;&nbsp;];
        <br />

        &nbsp;&nbsp; <span class="text-blue-200">res</span>.<span
          class="text-yellow-200">status</span
        >(<span class="text-blue-200">server</span>.<span class="text-blue-200"
          >STATUS_CODE</span
        >.<span class="text-blue-200">SUCCESS</span>).<span
          class="text-yellow-200">send</span
        >(<span class="text-blue-200">tasks</span>);
        <br />

        {"}"});
      </p>

      <p>
        <span class="text-blue-200">server</span>.<span class="text-yellow-200"
          >post</span
        >(<span class="text-red-300">'/task/save'</span>, (<span
          class="text-blue-200">req</span
        >, <span class="text-blue-200">res</span>) => {"{"}
        <br />

        &nbsp;&nbsp;<span class="text-blue-400">const</span>
        <span class="text-blue-200">task</span>
        = <span class="text-blue-200">req</span>.<span class="text-blue-200"
          >body</span
        >;
        <br />

        &nbsp;&nbsp; <span class="text-blue-200">console</span>.<span
          class="text-yellow-200">log</span
        >(<span class="text-blue-200">task</span>);
        <br />

        &nbsp;&nbsp; <span class="text-blue-200">res</span>.<span
          class="text-yellow-200">status</span
        >(<span class="text-blue-200">server</span>.<span class="text-blue-200"
          >STATUS_CODE</span
        >.<span class="text-blue-200">SUCCESS</span>).<span
          class="text-yellow-200">send</span
        >({"{"}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp; message:
        <span class="text-red-300"
          >'Task totally saved, and not just logged to the console!'</span
        >
        <br />

        &nbsp;&nbsp;{"}"});
        <br />

        {"}"});
      </p>

      <p>
        <span class="text-blue-400">const</span>
        <span class="text-blue-200">taskResponse</span>
        = <span class="text-blue-200">server</span>.<span
          class="text-yellow-200">request</span
        >({"{"}
        <br />

        &nbsp;&nbsp; method: <span class="text-red-300">'get'</span>,
        <br />

        &nbsp;&nbsp; route:
        <span class="text-red-300">'/tasks'</span>
        <br />

        {"}"});
        <br />

        <span class="text-green-600">// Run the get tasks route</span>
      </p>

      <p>
        <span class="text-blue-400">const</span>
        <span class="text-blue-200">saveResponse</span>
        = <span class="text-blue-200">server</span>.<span
          class="text-yellow-200">request</span
        >({"{"}
        <br />

        &nbsp;&nbsp; method: <span class="text-red-300">'post'</span>,
        <br />

        &nbsp;&nbsp; route:
        <span class="text-red-300">'/task/save'</span>,
        <br />

        &nbsp;&nbsp; body: {"{"}
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp; id: 2,
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp; task:
        <span class="text-red-300">'Build a sweet portfolio'</span>,
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp; done:
        <span class="text-blue-400">true</span>
        <br />

        &nbsp;&nbsp; {"}"}
        <br />

        {"}"});
        <br />

        <span class="text-green-600">// Run the save task route</span>
      </p>
    </article>

    <article
      class="flex-1 rounded-xl bg-black border border-white transition-colors duration-700 {runningColor}"
    >
      <div class="flex">
        <button
          class="flex-1 rounded-tl-xl bg-blue-900 text-white p-2"
          onclick={runTasks}>GET /tasks</button
        >
        <button
          class="flex-1 rounded-tr-xl bg-indigo-800 text-white p-2"
          onclick={runSave}>POST /task/save</button
        >
      </div>
      <p class="whitespace-pre-wrap p-3 rounded-b-xl">{result}</p>
    </article>
  </div>
</section>

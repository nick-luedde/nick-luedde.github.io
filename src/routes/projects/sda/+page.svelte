<script>
  import { fade } from "svelte/transition";
</script>

<section in:fade class="container max-w-screen-lg m-auto p-2">
  <h1 class="text-sky-400 text-xl mb-4">SheetDataAccess</h1>
  <p>
    Working on the Google Apps Script platform, Google Sheets was a cheap, easy,
    and mostly effective choice as a backend data source for small apps. Wrote
    the SheetDataAccess class to help make the CRUD operations a bit
    easier/friendlier to achieve.
    <br />
    <br />
    <a
      href="https://github.com/nick-luedde/sda"
      target="_blank"
      rel="noopener noreferrer"
      class="text-sky-200 underline focus:text-sky-300 hover:text-sky-300"
      >Check out the source code</a
    >
  </p>

  <hr class="w-2/4 m-auto my-8" />

  <p class="mb-2">Let's see what this one looks like...</p>

  <div class="flex flex-col md:flex-row gap-3">
    <article
      class="flex-1 break-all whitespace-pre-wrap p-3 bg-black border rounded-xl border-white"
    >
      <p>
        <span class="text-blue-400">const</span>
        <span class="text-blue-200">ds</span>
        = <span class="text-green-400">SheetDataAccess</span>.<span
          class="text-yellow-200">create</span
        >({"{"} id: <span class="text-red-300">'your-sheet-id'</span>
        {"}"});
      </p>
      <p>
        <span class="text-blue-400">const</span>
        <span class="text-blue-200">tasks</span>
        = <span class="text-blue-200">ds</span>.<span class="text-blue-200"
          >collections</span
        >.<span class="text-green-400">Task</span>.<span class="text-yellow-200"
          >data</span
        >();
        <br />

        <span class="text-blue-400">const</span>
        <span class="text-blue-200">importantTask</span>
        = <span class="text-blue-200">tasks</span>.<span class="text-yellow-200"
          >find</span
        >(<span class="text-blue-200">tsk</span> =>
        <span class="text-blue-200">tsk</span>.<span class="text-blue-200"
          >desc</span
        >
        === <span class="text-red-300">'Take a break'</span>);
      </p>

      <p>
        <span class="text-blue-200">importantTask</span>.<span
          class="text-blue-200">done</span
        >
        = <span class="text-blue-400">true</span>;
      </p>

      <p>
        <span class="text-blue-400">const</span>
        <span class="text-blue-200">updated</span>
        = <span class="text-blue-200">ds</span>.<span class="text-blue-200"
          >collections</span
        >.<span class="text-green-400">Task</span>.<span class="text-yellow-200"
          >upsertOne</span
        >(<span class="text-blue-200">importantTask</span>);
      </p>

      <p>
        <span class="text-blue-400">const</span>
        <span class="text-blue-200">newTask</span>
        = {"{"}
        <br />
        &nbsp;&nbsp; id: <span class="text-red-300">'456'</span>,
        <br />
        &nbsp;&nbsp; desc:
        <span class="text-red-300">'Save the day with a bug fix'</span>,
        <br />
        &nbsp;&nbsp; done: <span class="text-blue-400">false</span>
        <br />
        {"}"};
      </p>

      <p>
        <span class="text-blue-400">const</span>
        <span class="text-blue-200">saved</span>
        = <span class="text-blue-200">ds</span>.<span class="text-blue-200"
          >collections</span
        >.<span class="text-green-400">Task</span>.<span class="text-yellow-200"
          >addOne</span
        >(<span class="text-blue-200">task</span>);
      </p>
    </article>

    <article class="flex-1 rounded-xl bg-black border border-white">
      <p
        id="result"
        class="break-words whitespace-pre-wrap p-3 rounded-b-xl transition-colors duration-700"
      >
        // This assumes you have a Google Sheet with the following structure...
        {`
Tab name:
----------
|  Task  |
----------

Columns: 
--------------------------------
|   id   |   desc   |   done   |
--------------------------------
      `}
      </p>
    </article>
  </div>
</section>

<script>
  import { fade } from "svelte/transition";
</script>

<section class="container max-w-screen-lg m-auto p-2">
  <div
    in:fade={{ delay: 150 }}
    class="mt-6 p-2 flex flex-col-reverse md:flex-row items-center"
  >
    <p class="flex-1 mt-2 md:m-0">
      Hey, I'm Nick.
      <br />
      Economist by training. Engineer by design.
    </p>

    <figure
      class="relative inline-flex items-center justify-center w-36 h-auto md:w-auto md:h-80"
    >
      <div
        class="absolute -inset-1 rounded-xl bg-gradient-to-br from-sky-500 to-slate-500 opacity-40 blur-lg"
      ></div>

      <img
        src="./headshot.jpg"
        alt="Developer Headshot"
        class="relative z-10 block h-auto md:w-auto md:h-80 rounded-3xl rounded-bl-none object-cover
           border border-slate-700/80 bg-slate-900 p-1
           shadow-sm"
      />
    </figure>
  </div>

  <div in:fade={{ delay: 350 }}>
    <hr class="w-2/4 m-auto my-8 border-sky-400" />

    <p class="p-2">
      I got my start in Economics, which provided me a deep foundation in data
      modeling and mathematical reasoning. Programming gave me the power to
      build with it. I was initially drawn to SQL and VBA, where I discovered a
      near endless passion for bringing complex logic to life with code.

      <br />
      <br />

      Today, I've evolved from automating workflows to architecting systems and
      libraries.

      <br />

      Whether im building C# desktop apps, Rust CLI tools, or full-stack
      JavaScript/TypeScript web applications, I'm a software engineer driven by
      logic, refined by data, and always looking for the next challenge to push
      my limits.
    </p>

    <hr class="w-2/4 m-auto my-8 border-sky-400" />
    <h2 class="p-2">Some skills and tools in my kit...</h2>

    <article class="p-2 flex flex-wrap justify-center">
      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>TypeScript</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>C#</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>Rust</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>SQL (SQL Server, MySQL)</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>Vue.js</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>Svelte</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>BULMA CSS</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>Tailwind</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>.NET</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>API design</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>System architecture</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>Design patterns</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>Digital accessibility</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>Responsive design</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>Git</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>Azure DevOps</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>

      <div class="w-1/2 md:w-1/4 p-3 text-center">
        <p>Agile project management</p>
        <p class="max-w-16 mt-1 m-auto border-b border-gray-600"></p>
      </div>
    </article>
  </div>
</section>

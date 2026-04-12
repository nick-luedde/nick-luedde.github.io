<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";

  let bioActive = $derived(page.route.id === "/");
  let projectsActive = $derived(page.route.id?.startsWith("/projects"));
  let contactActive = $derived(page.route.id === "/contact");

  let { children } = $props();
</script>

<!-- Animated underline - Editorial -->
<nav class="w-full border-b border-slate-800 bg-slate-950 px-8 py-4">
  <ul class="flex gap-8">
    <li>
      <a
        href="/"
        class="group relative text-sm font-medium text-slate-400 transition-colors hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 rounded-sm
                 {bioActive
          ? 'text-slate-50'
          : 'text-slate-400 hover:text-slate-50'}"
      >
        Bio
        <span
          class="absolute -bottom-1 left-0 h-[2px] bg-sky-400 transition-all duration-300 ease-out
                   {bioActive ? 'w-full' : 'w-0 group-hover:w-full'}"
        ></span>
      </a>
    </li>
    <li>
      <a
        href="/projects"
        class="group relative text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 rounded-sm
                 {projectsActive
          ? 'text-slate-50'
          : 'text-slate-400 hover:text-slate-50'}"
      >
        Projects
        <span
          class="absolute -bottom-1 left-0 h-[2px] bg-sky-400 transition-all duration-300 ease-out
                   {projectsActive ? 'w-full' : 'w-0 group-hover:w-full'}"
        ></span>
      </a>
    </li>
    <li>
      <a
        href="/contact"
        class="group relative text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 rounded-sm
                 {contactActive
          ? 'text-slate-50'
          : 'text-slate-400 hover:text-slate-50'}"
      >
        Contact
        <span
          class="absolute -bottom-1 left-0 h-[2px] bg-sky-400 transition-all duration-300 ease-out
                   {contactActive ? 'w-full' : 'w-0 group-hover:w-full'}"
        ></span>
      </a>
    </li>
  </ul>
</nav>

<main class="h-full w-full">
  {@render children()}
</main>

<footer class="p-1 text-xs border-t border-t-gray-600">
  <article class="text-center">
    Built by me, with help from Svelte & Tailwind.css
  </article>
</footer>

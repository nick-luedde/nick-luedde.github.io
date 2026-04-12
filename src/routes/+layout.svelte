<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<nav class="p-2 border-b border-gray-600">
  <ul class="flex">
    <li class="px-3">
      <a
        class="text-lg text-gray-300 outline-none focus:text-sky-200 focus:underline hover:text-sky-200 hover:underline"
        href="/">Bio</a
      >
    </li>
    <li class="px-3">
      <a
        class="text-lg text-gray-300 outline-none focus:text-sky-200 focus:underline hover:text-sky-200 hover:underline"
        href="/projects">Projects</a
      >
    </li>
    <li class="px-3">
      <a
        class="text-lg text-gray-300 outline-none focus:text-sky-200 focus:underline hover:text-sky-200 hover:underline"
        href="/contact">Contact</a
      >
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

<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";
  import { onMount } from "svelte";

  let bioActive = $derived(page.route.id === "/");
  let projectsActive = $derived(page.route.id?.startsWith("/projects"));
  let contactActive = $derived(page.route.id === "/contact");

  let scrollY = $state(0);
  let prevY = 0;

  let innerHeight = $state(0);
  let documentHeight = $state(0);

  const handleRecomputeHeight = () => {
    documentHeight = document.documentElement.scrollHeight;
    console.log('documentHeight', documentHeight);
  };

  onMount(() => {
    handleRecomputeHeight();

    const observer = new ResizeObserver(handleRecomputeHeight);

    observer.observe(document.body);

    return () => observer.disconnect();
  });

  let navHidden = $derived.by(() => {
    const maxScroll = documentHeight - innerHeight;

    const hasEnoughScrollToHide = maxScroll >= 50;
    const scrollingDown = scrollY > prevY && scrollY > 50;
    const isAtBottom = scrollY >= maxScroll - 10;

    return (hasEnoughScrollToHide && isAtBottom) || scrollingDown;
  });

  $effect(() => {
    prevY = scrollY;
  });

  let { children } = $props();
</script>

<svelte:window bind:scrollY bind:innerHeight onresize={handleRecomputeHeight} />

<!-- Animated underline - Editorial -->
<nav
  class="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-8 py-4 transition-transform duration-300 ease-in-out
         {navHidden ? ' -translate-y-full' : ' translate-y-0'}"
>
  <ul class="flex gap-8">
    <li>
      <a
        href="/"
        class="group relative text-sm font-medium text-slate-400 transition-colors hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 rounded-sm
                 {bioActive
          ? ' text-slate-50'
          : ' text-slate-400 hover:text-slate-50'}"
      >
        Bio
        <span
          class="absolute -bottom-1 left-0 h-[2px] bg-sky-400 transition-all duration-300 ease-out
                   {bioActive ? ' w-full' : ' w-0 group-hover:w-full'}"
        ></span>
      </a>
    </li>
    <li>
      <a
        href="/projects"
        class="group relative text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 rounded-sm
                 {projectsActive
          ? ' text-slate-50'
          : ' text-slate-400 hover:text-slate-50'}"
      >
        Projects
        <span
          class="absolute -bottom-1 left-0 h-[2px] bg-sky-400 transition-all duration-300 ease-out
                   {projectsActive ? ' w-full' : ' w-0 group-hover:w-full'}"
        ></span>
      </a>
    </li>
    <li>
      <a
        href="/contact"
        class="group relative text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 rounded-sm
                 {contactActive
          ? ' text-slate-50'
          : ' text-slate-400 hover:text-slate-50'}"
      >
        Contact
        <span
          class="absolute -bottom-1 left-0 h-[2px] bg-sky-400 transition-all duration-300 ease-out
                   {contactActive ? ' w-full' : ' w-0 group-hover:w-full'}"
        ></span>
      </a>
    </li>
  </ul>
</nav>

<main class="h-full w-full mt-14">
  {@render children()}
</main>

<footer class="p-1 text-xs border-t border-t-gray-600">
  <article class="text-center">
    Built by me, with help from Svelte & Tailwind.css
  </article>
</footer>

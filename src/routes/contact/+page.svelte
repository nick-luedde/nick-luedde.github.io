<script>
    import { fade } from "svelte/transition";
</script>

<section class="container max-w-screen-lg m-auto p-2">
  <div in:fade={{ delay: 150 }} class="mt-40">
    <p class="mt-20 mb-4 text-center text-3xl">Get in touch!</p>

    <div class="flex items-center justify-center gap-2">
      <figure class="inline-block">
        <img src="./LI-In-Bug.png" alt="LinkedIn" class="w-auto h-8" />
      </figure>
      <a
        href="https://www.linkedin.com/in/nicholas-luedde"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline focus:underline focus:text-sky-300 hover:text-sky-300"
        >LinkedIn</a
      >
    </div>

    <p class="mt-20 mb-4 text-center text-3xl">Check me out on GitHub</p>

    <div class="flex items-center justify-center gap-2">
      <figure class="inline-block">
        <img src="./github-mark-white.svg" alt="GitHub" class="w-auto h-8" />
      </figure>
      <a
        href="https://github.com/nick-luedde"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline focus:underline focus:text-sky-300 hover:text-sky-300"
        >GitHub</a
      >
    </div>
  </div>

  <div id="blurb" class="transition-opacity duration-1000 opacity-0"></div>
</section>

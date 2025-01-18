<script>
  import { fade } from "svelte/transition";
</script>

<section in:fade>
  <h1 class="text-green-400 text-xl mb-4">DIP C# Console Application</h1>
  <p>
    Co-worker had a bit of a process for manually compiling a folder full of
    documents into a spreadsheet of metadata and a .zip directory. It was all
    mapped out in their step-by-step guide document, took the oportunity to
    translate those steps into a cool little C# Console Application to automate
    some of the tedium!
  </p>

  <hr class="w-2/4 m-auto my-8" />

  <p class="mb-2">Here's a bit of what it looks like in action...</p>

  <div class="bg-black border rounded-xl border-white">
    <div class="flex">
      <button id="reset" class="flex-1 rounded-t-xl bg-blue-600 text-white p-2"
        >Reset</button
      >
    </div>
    <p class="break-all whitespace-pre-wrap p-3">
      <span id="entry"></span><span class="animate-pulse">|</span>
    </p>
  </div>
</section>

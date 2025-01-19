<script lang="ts">
  import { fade } from "svelte/transition";

  const commands = [
    'Enter DIP process type...',
    '[1] - FILES - Registrations',
    '[2] - FILES - Inspections',
    '[3] - DOCS - Annual Reports',
    '[4] - DOCS - License',
    '>> 1',
    { pause: 3 },
    'Enter the directory path for the [1] - FILES - Registrations',
    '[Enter] - to use the default path - [c:\\users\\default]',
    '    [R] - to restart',
    '>> ',
    { pause: 3 },
    'Cleaning file names...',
    'Getting file names...',
    'Setting up...',
    'Creating index file...',
    'Writing compressed folder...',
    '\n----------\nDIP file process complete, do another if you want...\n----------\n',
    '[Any key] - Run another',
    '    [Esc] - Exit',
    '>> '
  ];

  let entry = $state('');
  let i = $state(0);
  let looping = false;

  const reset = () => {
    entry = '';
    if (looping) {
      i = -1;
    } else {
      i = 0;
      loop();
    }
  };

  const loop = async () => {
    looping = true;
    for (i = 0; i < commands.length; i++) {
      const cmd = commands[i];

      console.log(`command #${i} = [${cmd}]`)
      
      if (typeof cmd === 'object') {
        const { pause } = cmd;
        await new Promise(resolve => setTimeout(resolve, 1000 * pause));
      } else {        
        await new Promise(resolve => setTimeout(() => {
          entry += `\n${cmd}`;
          resolve(true);
        }, 150));
      }
    }
    looping = false;
  };

  setTimeout(() => loop(), 1250);
</script>

<section in:fade class="container max-w-screen-lg m-auto">
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
      <button class="flex-1 rounded-t-xl bg-blue-600 text-white p-2"
      onclick={reset}  
      >Reset</button
      >
    </div>
    <p class="break-all whitespace-pre-wrap p-3">
      <span id="entry">{entry}</span><span class="animate-pulse">|</span>
    </p>
  </div>
</section>

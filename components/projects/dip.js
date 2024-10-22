import { attach } from "../../js/utils.js";

export const DIP = () => {

  const template = `
    <h1 class="text-green-400 text-xl mb-4">DIP C# Console Application</h1>
    <p>
      Co-worker had a bit of a process for manually compiling a folder full of documents into a spreadsheet of metadata and a .zip directory.
      It was all mapped out in their step-by-step guide document, took the oportunity to translate those steps into a cool little C# Console Application
      to automate some of the tedium! 
    </p>

    <hr class="w-2/4 m-auto my-8" />

    <p class="mb-2">
      Here's a bit of what it looks like in action...
    </p>

      <div class="bg-black border rounded-xl border-white">
        <div class="flex">
            <button id="reset" class="flex-1 rounded-t-xl bg-blue-600 text-white p-2">Reset</button>
        </div>
        <p class="whitespace-pre-wrap p-3"><span id="entry"></span><span class="animate-pulse">|</span></p>
      </div>
    
  `;

  const root = document.createElement('section');
  root.innerHTML = template;

  root.className = 'container max-w-screen-lg m-auto p-2 mt-4';

  const entry = root.querySelector('#entry');
  const reset = root.querySelector('#reset');

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
    '>> ',
    { pause: 7 },
  ];

  const loop = async () => {
    if (!entry) return;
    
    entry.textContent = '';

    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i];
      
      if (typeof cmd === 'object') {
        const { pause } = cmd;
        await new Promise(resolve => setTimeout(resolve, 1000 * pause));
      } else {        
        await new Promise(resolve => setTimeout(() => {
          entry.textContent += `\n${cmd}`;
          resolve(true);
        }, 150));
      }
    }
  };

  if (reset)
    reset.addEventListener('click', loop);

  setTimeout(() => loop(), 1250);

  const render = () => {
  };

  return {
    attach: attach(root),
    render
  };
};
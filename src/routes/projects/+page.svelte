<script lang="ts">
  import ProjectCard from "$lib/ProjectCard.svelte";
  import { fade } from "svelte/transition";

  type ProjectInfo = { name: string, stack: string, blurb: string, route: string };

  const projects: ProjectInfo[] = [
    {
      name: "ProjectsTrackingApp",
      stack: "Vue.js, Bulma CSS, JavaScript",
      blurb:
        "Project tracking app that brings together a lot of the little elements I've worked on. Inspired by DevOps and other apps like it.",
      route: "/projects/ipt" 
    },
    {
      name: "AppsServer",
      stack: "TypeScript",
      blurb:
        "Lightweight Google Apps Script/TypeScript library modelled on Express.",
      route: "/projects/appsserver" 
    },
    {
      name: "AppsSchemaValidation",
      stack: "JavaScript",
      blurb:
        "Google Apps Script/JavaScript library for applying a schema to data objects. Most helpful when using Google Sheets as a zero-cost and easy backend for Apps Script apps :)",
      route: "/projects/asv" 
    },
    {
      name: "SheetDataAccess",
      stack: "TypeScript, Google Apps Script",
      blurb:
        "CRUD operations (and more) for Google Apps Script apps using a Google Sheet as a data source. (Sometimes a spreadsheet can be a database!)",
      route: "/projects/sda" 
    },
    {
      name: "AppTimerComponent",
      stack: "Vue.js, TypeScript",
      blurb:
        "Vue timer component that you can set up in any corner of the browser window. Kinda neat",
      route: "/projects/apptimer" 
    },
  ];

  const delay = 150;

</script>

<section class="container max-w-screen-lg m-auto p-2">
  <ul class="md:flex md:flex-wrap md:justify-center">
    {#each projects as project, i (project.name)}
      <li in:fade|global={{ delay: (i * delay) }} class="p-3 md:w-1/2 md:h-60">
        <ProjectCard
          route={project.route}
          project={project.name}
          stack={project.stack}
          description={project.blurb}
        />
      </li>
    {/each}
  </ul>
</section>

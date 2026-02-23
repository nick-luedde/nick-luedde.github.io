<script lang="ts">
  let { route, project, description } = $props();
</script>

<a href={route}>
  <p>
    <span class="text-blue-400">project</span>
    <span id="p-title" class="text-green-400">{project}</span>
    <span class="text-gray-200">{"{"}</span>
  </p>
  <p class="pl-4 my-2 border-l border-l-gray-600">
    <span class="text-yellow-600 hover:text-yellow-400 transition-colors duration-200">"{description}"</span>
  </p>
  <span class="text-gray-200">{"}"}</span>
</a>

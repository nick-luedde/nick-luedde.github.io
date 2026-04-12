<script lang="ts">
  import { fade } from "svelte/transition";
  import AppsSchemaValidation from "$lib/AppsSchemaValidation";

  const asv = AppsSchemaValidation.asv();

  const schema = asv.build({
    title: asv.string().required(),
    tags: asv.array().schema(asv.string()),
    rating: asv.number(),
  });

  let runningColor: "bg-red-700" | "bg-blue-600" | "" = $state("");
  let result = $state("");

  const runValid = () => {
    const results = schema.validate({
      title: "Hey I'm valid!",
      tags: ["awesome", "rad"],
      rating: 10,
    });

    runningColor = "bg-blue-600";

    result = JSON.stringify(results, null, 2);
  };

  const runInvalid = () => {
    const errors = schema.validate({
      tags: [1],
      rating: "Not a number...",
    });

    runningColor = "bg-red-700";

    result = JSON.stringify(errors, null, 2);
  };
</script>

<section in:fade class="container max-w-screen-lg m-auto p-2">
  <h1 class="text-sky-400 text-xl mb-4">AppsSchemaValidation</h1>
  <p>
    Needed validation! Used this as an opportunity to write a bit of a
    validation tool from the ground up. Built it to work on the server and in
    the browser.
    <br />
    <br />
    <a
      href="https://github.com/nick-luedde/asv"
      target="_blank"
      rel="noopener noreferrer"
      class="text-sky-200 underline focus:text-sky-300 hover:text-sky-300"
      >Check out the source code</a
    >
  </p>

  <hr class="w-2/4 m-auto my-8" />

  <p class="mb-2">Let's check it out in action...</p>

  <div class="flex flex-col md:flex-row gap-3">
    <article
      class="flex-1 break-all whitespace-pre-wrap p-3 bg-black border rounded-xl border-white"
    >
      <p>
        <span class="text-blue-400">const</span>
        <span class="text-blue-200">asv</span>
        = <span class="text-green-400">AppsSchemaValidation</span>.<span
          class="text-yellow-200">asv</span
        >();
      </p>

      <p>
        <span class="text-blue-400">const</span>
        <span class="text-blue-200">schema</span>
        = <span class="text-blue-200">asv</span>.<span class="text-yellow-200"
          >build</span
        >({"{"}
        <br />

        &nbsp;&nbsp; title: <span class="text-blue-400">asv</span>.<span
          class="text-yellow-200">string</span
        >().<span class="text-yellow-200">required</span>(),
        <br />

        &nbsp;&nbsp; tags:
        <span class="text-blue-400">asv</span>.<span class="text-yellow-200"
          >array</span
        >().<span class="text-yellow-200">schema</span>(<span
          class="text-blue-400">asv</span
        >.<span class="text-yellow-200">string</span>()),
        <br />

        &nbsp;&nbsp; rating:
        <span class="text-blue-400">asv</span>.<span class="text-yellow-200"
          >number</span
        >()
        <br />

        {"}"});
      </p>

      <p>
        <span class="text-blue-400">const</span>
        <span class="text-blue-200">validResults</span>
        = <span class="text-blue-200">schema</span>.<span
          class="text-yellow-200">validate</span
        >({"{"}
        <br />

        &nbsp;&nbsp; title: <span class="text-red-300">'Hey I'm valid!'</span>,
        <br />

        &nbsp;&nbsp; tags: [
        <span class="text-red-300">'awesome'</span>,
        <span class="text-red-300">'rad'</span>],
        <br />

        &nbsp;&nbsp; rating: 10
        <br />

        {"}"});
        <br />

        <span class="text-green-600"
          >// Run the valid results to see the schema output</span
        >
      </p>

      <p>
        <span class="text-blue-400">const</span>
        <span class="text-blue-200">errors</span>
        = <span class="text-blue-200">schema</span>.<span
          class="text-yellow-200">validate</span
        >({"{"}
        <br />

        &nbsp;&nbsp; tags: [1],
        <br />

        &nbsp;&nbsp; rating: <span class="text-red-300">'Not a number...'</span>
        <br />

        {"}"});
        <br />

        <span class="text-green-600"
          >// Run the invalid results to see the schema output</span
        >
      </p>
    </article>

    <article class="flex-1 rounded-xl bg-black border border-white">
      <div class="flex">
        <button
          class="flex-1 rounded-tl-xl bg-blue-600 text-white p-2"
          onclick={runValid}>Run valid</button
        >
        <button
          class="flex-1 rounded-tr-xl bg-red-700 text-white p-2"
          onclick={runInvalid}>Run invalid</button
        >
      </div>
      <p
        class="whitespace-pre-wrap p-3 rounded-b-xl transition-colors duration-700 {runningColor}"
      >
        {result}
      </p>
    </article>
  </div>
</section>

<script>
  import { onMount } from 'svelte';
  export let params = {};

  let data;
  onMount(async () => {
    const res = await fetch(`/data/counties/${params.id}.json`);
    data = await res.json();
    console.log(data);
  });
</script>

{#if data}
  <h1>{data.county_name}</h1>
{/if}
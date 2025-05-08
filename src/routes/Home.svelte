<script>
  import { onMount } from 'svelte';
  import countiesMeta from  '../counties.store.js';

  import Search from "./../components/Search.svelte";
  import TableMetrics from './../components/TableMetrics.svelte';
  
  const url = import.meta.env.BASE_URL;
  $: data = [];
  onMount(async () => {
    const res = await fetch(`${url}/data/latest.json`);
    data = await res.json();
  });
</script>

{#if data.length}
  <Search { countiesMeta } />
  <TableMetrics latestData={ data } />
{/if}

<style lang="scss">
  p {
    font-size: 14px;
  }
</style>
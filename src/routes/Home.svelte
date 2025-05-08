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
  <p>Latest month: April 2025</p>
  <Search { countiesMeta } />
  <TableMetrics latestData={ data } maxWidth={ 500 }/>
{/if}

<style lang="scss">
  p {
    font-size: 14px;
  }
</style>
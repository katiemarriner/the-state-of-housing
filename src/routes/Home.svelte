<script>
  import countiesMeta from  '../counties.store.js';

  import Search from "./Search.svelte";
  import TableMetrics from './TableMetrics.svelte';
</script>

<Search { countiesMeta } />
<!-- <TableMetrics { countiesData }/> -->

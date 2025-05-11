<script>
  export let dataState;

  import TableBodyDesktop from "./TableBodyDesktop.svelte";
  import TableHeaderDesktop from "./TableHeaderDesktop.svelte";

  $: width = 0;

  let sortedData = dataState
    .filter(d => {
      return d.active_listing_count > 10;
    });
  
  let selectedData = sortedData;

  let currentValue = 'median_listing_price';
  let direction = 'desc';
  let latestMonth;

  function sortData(sortValue, dir) {
    currentValue = sortValue;
    if(dir) {
      direction = dir;
    } else {
      direction = direction === 'asc' ? 'desc' : 'asc';
    }
    selectedData = selectedData.sort((a, b) => {
      if(direction === 'desc') {
        return b[sortValue] - a[sortValue];
      } else {
        return a[sortValue] - b[sortValue];
      }
    });
  }

</script>

<div class="container-table" bind:clientWidth={ width }>
  <table>
    <TableHeaderDesktop { sortData } { currentValue } { direction } { latestMonth }/>
    <TableBodyDesktop paginatedItems={ selectedData } />
  </table>
</div>

<style lang="scss">
  .container-table, table {
    width: 100%;
  }

  table {
    border-collapse: collapse;
  }
</style>
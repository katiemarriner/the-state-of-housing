<script>
  let { dataState, selectedFIPs, updateData } = $props();

  import TableBodyDesktop from "./TableBodyDesktop.svelte";
  import TableHeaderDesktop from "./TableHeaderDesktop.svelte";
  import TableBodyMobile from "./TableBodyMobile.svelte";
  import TableHeaderMobile from "./TableHeaderMobile.svelte";

  let width = $state(0);

  let sortedData = dataState.data
    .filter(d => {
      return d.active_listing_count > 10;
    });
  
  let selectedData = $state(sortedData);

  let currentValue = $state('median_listing_price');
  let direction = $state('desc');
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

  sortData(currentValue, 'desc');
</script>

<div class="container-table" bind:clientWidth={ width }>
  {#if width >= 550}
    <table>
      <TableHeaderDesktop { sortData } { currentValue } { direction } { latestMonth } />
      <TableBodyDesktop paginatedItems={ selectedData } { selectedFIPs } { updateData } />
    </table>
  {:else}
    <div class="container-table-mobile">
      <TableHeaderMobile { sortData } { currentValue } { direction } />
      <TableBodyMobile { updateData } paginatedItems={ selectedData } { selectedFIPs } />
    </div>
  {/if}
</div>

<style lang="scss">
  .container-table, table {
    width: 100%;
  }

  table {
    border-collapse: collapse;
  }
</style>
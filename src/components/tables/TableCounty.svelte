<script>
  export let tableData, selectedFIPs, updateData, latestMonth;

  import TableBodyDesktop from "./TableBodyDesktop.svelte";
  import TableHeaderDesktop from "./TableHeaderDesktop.svelte";
  import TableBodyMobile from "./TableBodyMobile.svelte";
  import TableHeaderMobile from "./TableHeaderMobile.svelte";

  $: selectedComparison = 'states';

  $: width = 300;

  $: filteredData = null;
  $: selectedData = null;
  
  $: currentValue = 'median_listing_price';
  $: direction = 'desc';

  function sortData(sortValue, dir) {
    currentValue = sortValue;
    if(dir) {
      direction = dir;
    } else {
      direction = direction === 'asc' ? 'desc' : 'asc';
    }
    selectedData = filteredData.sort((a, b) => {
      if(direction === 'desc') {
        return b[sortValue] - a[sortValue];
      } else {
        return a[sortValue] - b[sortValue];
      }
    });
  }

  function changeTableView(value) {
    selectedComparison = value;
    filteredData = tableData[value]
    sortData(currentValue, direction);
  }

  $: changeTableView(selectedComparison);
  $: sortData(currentValue, 'desc');
</script>

<h3>Compare to counties 
  <button onclick={() => changeTableView('states')}>in </button>
  <button onclick={() => changeTableView('households')}>to similar households.</button>
</h3>
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
<script>
  export let tableData, selectedFIPs, latestMonth, selectedState;

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
<button name="compareCounties" class="inline {selectedComparison === 'states' ? 'active' : ''}" onclick={() => changeTableView('states')}>in { selectedState['state_name'] }</button>
<button name="compareCounties" class="inline {selectedComparison === 'households' ? 'active' : ''}" onclick={() => changeTableView('households')}>to similar households.</button>
</h3>
<div class="container-table" bind:clientWidth={ width }>
  {#if width >= 550}
    <table>
      <TableHeaderDesktop { sortData } { currentValue } { direction } { latestMonth } />
      <TableBodyDesktop paginatedItems={ selectedData } { selectedFIPs } />
    </table>
  {:else}
    <div class="container-table-mobile">
      <TableHeaderMobile { sortData } { currentValue } { direction } />
      <TableBodyMobile paginatedItems={ selectedData } { selectedFIPs } />
    </div>
  {/if}
</div>

<style lang="scss">
  @use './../../lib/style/variables';

  h3 {
    line-height: 40px;
  }

  .container-table, table {
    width: 100%;
  }

  table {
    border-collapse: collapse;
  }

  button.inline {
    background: none;
    border: none;
    font-size: inherit;
    opacity: 0.5;
    line-height: initial;
    padding: 0;
  }

  button.active {
    text-decoration-thickness: 5px;
    text-underline-offset: 5px;
    text-decoration-line: underline;
    text-decoration-color: variables.$teal-text;
    color: variables.$gray-darkest;
    opacity: 1;
    font-weight: 700;
  }
</style>
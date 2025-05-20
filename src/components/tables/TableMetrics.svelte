<script>
  export let dataLatest, dataStates, latestMonth;

  import { paginate, LightPaginationNav } from 'svelte-paginate';
  
  import TableHeaderDesktop from './TableHeaderDesktop.svelte';
  import TableBodyDesktop from './TableBodyDesktop.svelte';
  import TableHeaderMobile from './TableHeaderMobile.svelte';
  import TableBodyMobile from './TableBodyMobile.svelte';

  $: width = 0;
  // Default sort and filter;
  let currentValue = 'median_listing_price';
  let direction = 'desc';
  let selectedSize = '';
  let selectedState = '';

  let sortedData = dataLatest;
  let selectedData = sortedData;

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

  function filterCountiesBySize({ upper, lower, key }) {
    // reset if the active button is clicked on;
    selectedState = '';
    if(selectedSize === key) {
      selectedData = sortedData;  
      selectedSize = '';
    } else {
      selectedSize = key;
      selectedData = sortedData.filter(d => {
        return d['population'] >= lower && d['population'] < upper;
      });
    }
  }

  function filterCountiesByState({ target }) {
    const value = target.value;
    selectedSize = '';
    if(value && value !== '000') {
      selectedData = sortedData.filter(d => {
        return d['county_fips'].substring(0, 2) === value;
      });
    } else {
      selectedData = sortedData;
    }
  }

  sortData('median_listing_price', 'desc');
  let currentPage = 1
  let pageSize = 10
  $: paginatedItems = paginate({ items: selectedData, pageSize, currentPage });

  const buttonCountySize = [
    {
      label: 'Metro',
      key: 'metro',
      upper: Infinity,
      lower: 500000
    },  
    {
      label: 'Large',
      key: 'large',
      upper: 500000,
      lower: 100000
    },
    {
      label: 'Medium',
      key: 'medium',
      upper: 100000,
      lower: 25000,
    },
    {
      label: 'Small',
      key: 'small',
      upper: 25000,
      lower: 10000
    },
    {
      label: 'Extra small',
      key: 'extra',
      upper: 10000,
      lower: 0
    },
  ];
</script>

<div class="container-table" bind:clientWidth={ width }>
  <div class="container-header">
    <div class="filter-dropdown">
      <label for="dropdown-states" class="label">Filter by state</label>
      <select name="dropdown-states" bind:value={ selectedState } onchange={ filterCountiesByState }>
        <option value="" selected={selectedState === ''}>All</option>
        {#each dataStates as state}
          <option value={state.fips} selected={selectedState === state.fips}>{state.state_name}</option>
        {/each}
      </select>
    </div>
    <div class="filter-buttons">
      <div class="label">Filter by county size</div>
      {#each buttonCountySize as btn, i}
        <button
          data-upper={btn.upper}
          data-lower={btn.lower}
          class="filter-button {i === 0 ? 'filter-button-first' : ''} { selectedSize === btn.key ? 'active' : ''}"
          onclick={ (e) => filterCountiesBySize(btn) }>
            {btn.label}
        </button>
      {/each}
    </div>
  </div>
  {#if width >= 550}
  <table>
    <TableHeaderDesktop { sortData } { currentValue } { direction } { latestMonth } />
    <TableBodyDesktop { paginatedItems } selectedFIPs={ null } />
  </table>
  {:else}
  <div class="container-table-mobile">
    <TableHeaderMobile { sortData } { currentValue } { direction } />
    <TableBodyMobile { paginatedItems } selectedFIPs={ null } />
  </div>
  {/if}
  <div class="table-pagination">
    <LightPaginationNav
      totalItems="{selectedData.length}"
      pageSize="{pageSize}"
      currentPage="{currentPage}"
      limit="{1}"
      showStepOptions="{true}"
      on:setPage="{(e) => currentPage = e.detail.page}"
    />
  </div>
</div>

<style lang="scss">
  @use './../../lib/style/variables';

  label.label, .label {
    display: block;
    margin-bottom: 2.5px;
  }

  .filter-button {
    border-left: none;
    padding: 5px 10px;

    &.active {
      background-color: variables.$teal-light;
    }
  }

  .filter-button-first {
    border-left: variables.$selector-border;
  }

  .container-header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding: 10px 0;

    @media screen and (max-width: 550px) {
      flex-direction: column;
      align-items: start;
    }
  }

  .container-table, table {
    width: 100%;
  }

  table {
    border-collapse: collapse;
  }

  .container-table-mobile {
    .num {
      font-family: "Lekton", monospace;
    }
  }

  .table-pagination :global(.light-pagination-nav .pagination-nav) {
    box-shadow: none;
    font-size: 14px;
    justify-content: center;
  }

  .table-pagination :global(.option) {
    color: variables.$teal-text;
  }

  .table-pagination :global(.option.active.number) {
    color: variables.$teal-text;
    font-weight: 700;
  }
  
  .table-pagination :global(.option.number) {
    color: variables.$gray;
  }

  .table-pagination :global(.option.prev),
  .table-pagination :global(.option.next) {
    width: 20px;
  }
</style>
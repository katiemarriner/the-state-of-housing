<script>
  export let dataLatest;

  import { push } from 'svelte-spa-router';
  import { paginate, LightPaginationNav } from 'svelte-paginate';

  import helpers from './../lib/js/helpers';
  import SortArrows from "./SortArrows.svelte";

  const formats = helpers.formats;
  $: width = 0;

  $: currentValue = 'median_listing_price';
  $: direction = 'asc';
  let sortedData = dataLatest
    .filter(d => {
      return d.active_listing_count > 10;
    });
  
  let selectedData = sortedData;
  let selectedSize = '';

  function sortData(sortValue) {
    currentValue = sortValue;
    direction = direction === 'asc' ? 'desc' : 'asc';
    selectedData = selectedData.sort((a, b) => {
      if(direction === 'desc') {
        return a[sortValue] - b[sortValue]
      } else {
        return b[sortValue] - a[sortValue]
      }
    });
  }

  function filterCounties({ upper, lower, key }) {
    // reset if the active button is clicked on;
    if(selectedSize === key) {
      selectedData = sortedData;  
      selectedSize = '';
    } else {
      selectedSize = key;
      selectedData = sortedData.filter(d => {
        return d['population_2024'] >= lower && d['population_2024'] < upper;
      });
    }
  }

  sortData('median_listing_price')
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
    <div class="label">Latest month: April 2025</div>
    <div class="buttons-filter">
      <div class="label">Filter by county size</div>
      {#each buttonCountySize as btn, i}
        <button
          data-upper={btn.upper}
          data-lower={btn.lower}
          class="button-filter {i === 0 ? 'button-filter-first' : ''} { selectedSize === btn.key ? 'active' : ''}"
          on:click={ (e) => filterCounties(btn) }>
            {btn.label}
        </button>
      {/each}
    </div>
  </div>
  {#if width >= 550}
  <table>
    <thead>
      <tr>
        <th class="name" on:click={() => sortData('county_name')}>
          <SortArrows label='County' active={currentValue === 'county_name'} { direction } />
        </th>
        <th class="num" on:click={() => sortData('median_listing_price')}>
          <SortArrows label='Median home price' active={currentValue === 'median_listing_price'} { direction } />
        </th>
        <th class="num" on:click={() => sortData('median_listing_price_yoy')}>
          <SortArrows label='Change year-over-year' active={currentValue === 'median_listing_price_yoy'} { direction } />
        </th>
        <th class="num" on:click={() => sortData('active_listing_count')}>
          <SortArrows label='Inventory' active={currentValue === 'active_listing_count'} { direction } />
        </th>
        <th class="num" on:click={() => sortData('active_listing_count_yoy')}>
          <SortArrows label='Change year-over-year' active={currentValue === 'active_listing_count_yoy'} { direction } />
        </th>
      </tr>
    </thead>
    <tbody>
      {#each paginatedItems as row }
        <tr on:click={() => push(`#/county/${row.county_fips}`)}>
          <td class="name">{ row.county_name }</td>
          <td class="num">{ formats.currency(row.median_listing_price) }</td>
          <td class="num {row.median_listing_price_yoy > 0 ? 'pink' : row.median_listing_price_yoy < 0 ? 'green' : ''}">
            <span class="arrow {row.median_listing_price_yoy > 0 ? 'arrow-up-negative' : row.median_listing_price_yoy < 0 ? 'arrow-down-positive' : ''}"></span>
            { formats.percent(Math.abs(row.median_listing_price_yoy)) }
          </td>
          <td class="num">{ formats.number(row.active_listing_count) }</td>
          <td class="num {row.active_listing_count_yoy > 0 ? 'green' : row.active_listing_count_yoy < 0 ? 'pink' : ''}">
            <span class="arrow {row.active_listing_count_yoy > 0 ? 'arrow-up-positive' : row.active_listing_count_yoy < 0 ? 'arrow-down-negative' : ''}"></span>
            { formats.percent(Math.abs(row.active_listing_count_yoy)) }
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  {:else}
  <div class="container-table-mobile">
    <div class="table-mobile-header">
      <div class="label">Sort by</div>
      <button class="name" on:click={() => sortData('county_name')}>
        <SortArrows label='County' active={currentValue === 'county_name'} { direction } />
      </button>
      <button class="num" on:click={() => sortData('median_listing_price')}>
        <SortArrows label='Median home price' active={currentValue === 'median_listing_price'} { direction } />
      </button>
      <button class="num" on:click={() => sortData('median_listing_price_yoy')}>
        <SortArrows label='Change year-over-year' active={currentValue === 'median_listing_price_yoy'} { direction } />
      </button>
      <button class="num" on:click={() => sortData('active_listing_count')}>
        <SortArrows label='Inventory' active={currentValue === 'active_listing_count'} { direction } />
      </button>
      <button class="num" on:click={() => sortData('active_listing_count_yoy')}>
        <SortArrows label='Change year-over-year' active={currentValue === 'active_listing_count_yoy'} { direction } />
      </button>
    </div>
    <div class="table-mobile-body">
      {#each paginatedItems as row }
        <div class="table-mobile-row">
          <div class="table-mobile-text">{ row['county_name'] }</div>
          <div class="table-mobile-cell-half">
            <div class="table-mobile-number">
              <div class="label-number">Median listing price</div>
              <div class="num">{ formats.currency(row.median_listing_price) }</div>
            </div>
            <div class="table-mobile-number">
              <div class="label-number">Change year-over-year</div>
              <div class="num {row.median_listing_price_yoy > 0 ? 'pink' : row.median_listing_price_yoy < 0 ? 'green' : ''}">
                <span class="arrow {row.median_listing_price_yoy > 0 ? 'arrow-up-negative' : row.median_listing_price_yoy < 0 ? 'arrow-down-positive' : ''}"></span>
                { formats.percent(Math.abs(row.median_listing_price_yoy)) }</div>
            </div>
          </div>
          <div class="table-mobile-cell-half">
            <div class="table-mobile-number">
              <div class="label-number">Inventory</div>
              <div class="num">{ formats.number(row.active_listing_count) }</div>
            </div>
            <div class="table-mobile-number">
              <div class="label-number">Change year-over-year</div>
              <div class="num {row.active_listing_count_yoy > 0 ? 'green' : row.active_listing_count_yoy < 0 ? 'pink' : ''}">
                <span class="arrow {row.active_listing_count_yoy > 0 ? 'arrow-up-positive' : row.active_listing_count_yoy < 0 ? 'arrow-down-negative' : ''}"></span>
                { formats.percent(Math.abs(row.active_listing_count_yoy)) }
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
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
  @use './../lib/style/variables';
  
  .label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2px;
    margin: 10px 0;
    text-transform: uppercase;
  }

  .button-filter {
    border-left: none;
    padding: 5px 10px;

    &.active {
      background-color: variables.$teal-light;
    }
  }

  .button-filter-first {
    border-left: 1px solid variables.$gray-dark;
  }

  .container-header {
    display: flex;
    justify-content: space-between;
    align-items: end;

    @media screen and (max-width: 550px) {
      flex-direction: column;
      align-items: start;
    }
  }

  .container-table {
    width: 100%;
  }

  table {
    border-collapse: collapse;
  }

  thead tr {
    border-bottom: 1px solid variables.$gray-grid;
  }

  tbody tr {
    cursor: pointer;
    border-bottom: 0.5px solid variables.$gray-grid;

    &:hover {
      background: variables.$gray-lightest;
    }
  }

  th, td {
    padding: 10px 5px;

    &:first-child {
      padding-left: 0px;
    }
  }

  th, th span {
    text-transform: uppercase; 
    font-size: 12px;
    font-weight: 600;
  }

  th {
    cursor: pointer;
    text-align: left;
    width: 150px;

    &.num {
      text-align: right;
      width: initial;
    }
  }

  td {
    font-size: 14px;
    font-family: "Lato", sans-serif;

    &.name {
      color: variables.$gray-dark;
    }

    &.num {
      text-align: right;
      font-family: "Lekton", monospace;
      min-width: 100px;
    }
  }

  .label-number {
    font-size: 10px;
    letter-spacing: 0.2;
    margin: 2.5px 0;
    text-transform: uppercase;
  }

  .container-table-mobile {
    .table-mobile-header {
      .label {
        margin-bottom: 0;
      }
      
      button {
        border: none;
        display: block;
        padding: 2.55px 0;
      }
    }
    .table-mobile-row {
      padding: 15px 0;
      border-bottom: 1px solid variables.$gray-grid;
    }

    .table-mobile-cell-half {
      display: flex;
      justify-content: space-between;
      margin: 5px 0;

      font-size: 16px;
    }

    .num {
      font-family: "Lekton", monospace;
    }
  }

  .purple {
    color: variables.$purple;
  }

  .green {
    color: variables.$green-text;
  }

  .pink {
    color: variables.$pink-text;
  }

  .arrow {
    display: inline-block;
    width: 0; 
    height: 0; 
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  }

  .arrow-up-negative {
    border-bottom: 6px solid variables.$pink-text;
  }

  .arrow-up-positive {
    border-bottom: 6px solid variables.$green-text;
  }

  .arrow-down-positive {
    border-top: 6px solid variables.$green-text;
  }

  .arrow-down-negative {
    border-top: 6px solid variables.$pink-text;
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
<script>
  export let latestData;

  import { format } from "d3-format";
  import { push } from "svelte-spa-router";
  import { paginate, LightPaginationNav } from 'svelte-paginate'

  import SortArrows from "./SortArrows.svelte";

  const percentFormat = format(".2%");
  const currencyFormat = format("$,");
  const numberFormat = format(",");

  $: currentValue = 'median_listing_price';
  $: direction = 'asc';
  let sortedData = latestData
    .filter(d => {
      return d.active_listing_count > 10;
    });

  function sortData(sortValue) {
    console.log(sortValue);
    currentValue = sortValue;
    direction = direction === 'asc' ? 'desc' : 'asc';
    sortedData = sortedData.sort((a, b) => {
      if(direction === 'desc') {
        return a[sortValue] - b[sortValue]
      } else {
        return b[sortValue] - a[sortValue]
      }
    });
    console.log(sortedData)
  }

  sortData('median_listing_price')
  let currentPage = 1
  let pageSize = 10
  $: paginatedItems = paginate({ items: sortedData, pageSize, currentPage });

</script>

<div class="container-table">
  <div class="label">Latest month: April 2025</div>
  <table>
    <thead>
      <tr>
        <th class="name" on:click={() => sortData('county_name')}>County</th>
        <th class="num" on:click={() => sortData('median_listing_price')}>
          <SortArrows label='Median home price' active={currentValue === 'median_listing_price'} { direction } />
        </th>
        <th class="num" on:click={() => sortData('median_listing_price_yoy')}>
          <SortArrows label='Change year-over-year' active={currentValue === 'median_listing_price_yoy'} { direction } />
        </th>
        <th class="num" on:click={() => sortData('active_listing_count')}>
          <SortArrows label='Inventory' active={currentValue === 'active_listing_count'} { direction } />
        </th>
        <th class="num" on:click={() => sortData('active_listing_yoy')}>
          <SortArrows label='Change year-over-year' active={currentValue === 'active_listing_yoy'} { direction } />
        </th>
      </tr>
    </thead>
    <tbody>
      {#each paginatedItems as row }
        <tr on:click={() => push(`#/county/${row.county_fips}`)}>
          <td class="name">{ row.county_name }</td>
          <td class="num">{ currencyFormat(row.median_listing_price) }</td>
          <td class="num {row.median_listing_price_yoy > 0 ? 'pink' : row.median_listing_price_yoy < 0 ? 'green' : ''}">
            <span class="arrow {row.median_listing_price_yoy > 0 ? 'arrow-up-negative' : row.median_listing_price_yoy < 0 ? 'arrow-down-positive' : ''}"></span>
            { percentFormat(Math.abs(row.median_listing_price_yoy)) }
          </td>
          <td class="num">{ numberFormat(row.active_listing_count) }</td>
          <td class="num {row.active_listing_yoy > 0 ? 'green' : row.active_listing_yoy < 0 ? 'pink' : ''}">
            <span class="arrow {row.active_listing_yoy > 0 ? 'arrow-up-positive' : row.active_listing_yoy < 0 ? 'arrow-down-negative' : ''}"></span>
            { percentFormat(Math.abs(row.active_listing_yoy)) }
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="table-pagination">
    <LightPaginationNav
      totalItems="{sortedData.length}"
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

  .purple {
    color: variables.$purple;
  }

  .green {
    color: variables.$green-text;
  }

  .pink {
    color: variables.$pink-text;
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

  .table-pagination :global(.pagination-nav) {
    box-shadow: none;
    font-size: 14px;
    justify-content: space-between;
  }

  .table-pagination :global(.option) {
    color: variables.$orange;
  }

  .table-pagination :global(.option.active.number) {
    color: variables.$orange;
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
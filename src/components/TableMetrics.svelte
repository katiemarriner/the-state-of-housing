<script>
  export let latestData, maxWidth;

  import { format } from "d3-format";
  import { push } from "svelte-spa-router";
  import { paginate, LightPaginationNav } from 'svelte-paginate'

  const percentFormat = format(".2%");
  const currencyFormat = format("$,");
  const numberFormat = format(",");

  $: sortValue = 'median_listing_price';
  $: direction = 'desc';

  $: sortedData = latestData.sort((a, b) => {
    return b[sortValue] - a[sortValue]
  }).filter(d => {
    return d.active_listing_count > 10;
  });

  let currentPage = 1
  let pageSize = 10
  $: paginatedItems = paginate({ items: sortedData, pageSize, currentPage })
</script>

<div style="max-width:{maxWidth}px;">
  <table>
    <thead>
      <tr>
        <th class="name">County</th>
        <th class="num">
          <span>Median home price</span>
          <span class="arrow arrow-down"></span>
        </th>
        <th class="num">Change year-over-year</th>
        <th class="num">Inventory</th>
        <th class="num">change year-over-year</th>
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
    max-width: 200px;
    padding: 10px 5px;
  }

  th, th span {
    text-transform: uppercase; 
    font-size: 12px;
    font-weight: 600;
  }

  th {
    text-align: left;
  }

  th.num {
    text-align: right;
  }

  td.name {
    color: variables.$gray-dark;
  }

  td {
    font-size: 14px;
    font-family: "Lato", sans-serif;
  }

  td.num {
    text-align: right;
    font-family: "Lekton", monospace;
  }

  .currency {
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

  .arrow-up {
    border-bottom: 6px solid variables.$gray-grid;
  }

  .arrow-down {
    border-top: 6px solid variables.$gray-grid;
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
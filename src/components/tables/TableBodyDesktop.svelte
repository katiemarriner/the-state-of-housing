<script>
  export let paginatedItems, selectedFIPs;

  import { blur } from 'svelte/transition';
  import { push } from 'svelte-spa-router';
  import { loadPageData, resetPageData } from '../../counties.store';

  import helpers from './../../lib/js/helpers';

  const { formats, arrows } = helpers;

  function navigateToNewPage(fips) {
    push(`#/county/${fips}`);
    resetPageData();
    loadPageData(fips);
  }
</script>

<tbody >
  {#each paginatedItems as row }
    {#key row['county_fips']}
      <tr
        class="{selectedFIPs === row.county_fips ? 'active' : ''}"
        onclick={() => navigateToNewPage(row['county_fips'])}
        ontouchend={() => navigateToNewPage(row['county_fips'])}
        in:blur
      >
        <td class="name">{ row.county_name }</td>
        <td class="num">{ formats.currency(row.median_listing_price) }</td>
        <td class="num {row.median_listing_price_yoy > 0 ? 'pink' : row.median_listing_price_yoy < 0 ? 'green' : ''}">
          <span class="{arrows.classes(row.median_listing_price_yoy, 'negative')}"></span>
          { formats.percent(Math.abs(row.median_listing_price_yoy)) }
        </td>
        <td class="num">{ formats.number(row.active_listing_count) }</td>
        <td class="num {row.active_listing_count_yoy > 0 ? 'green' : row.active_listing_count_yoy < 0 ? 'pink' : ''}">
          <span class="{arrows.classes(row.active_listing_count_yoy)}"></span>
          { formats.percent(Math.abs(row.active_listing_count_yoy)) }
        </td>
      </tr>
    {/key}
  {/each}
</tbody>

<style lang="scss">
  @use './../../lib/style/variables';
  
  tbody tr {
    cursor: pointer;
    border-bottom: 0.5px solid variables.$gray-grid;

    &.active td {
      font-weight: 900;
    }

    &:hover {
      background: variables.$gray-lightest;
    }
  }

  td {
    font-size: 14px;
    font-family: "Lato", sans-serif;
    padding: 10px 5px;

    &:first-child {
      padding-left: 0px;
    }

    &.name {
      color: variables.$gray-dark;
    }

    &.num {
      text-align: right;
      font-family: "Lekton", monospace;
    }
  }

  .pink {
    color: variables.$pink-text
  }

  .purple {
    color: variables.$purple-text
  }

.green {
    color: variables.$green-text
  }
</style>
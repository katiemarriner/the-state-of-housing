<script>
  export let paginatedItems, selectedFIPs;

  import { push } from 'svelte-spa-router';
  import helpers from './../../lib/js/helpers';
  import { loadPageData, resetPageData } from '../../counties.store';

  const { formats, arrows } = helpers;

  function navigateToNewPage(fips) {
    push(`#/county/${fips}`)
    resetPageData();
    loadPageData(fips);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="table-mobile-body">
  {#each paginatedItems as row, index}
    <div class="table-mobile-row {selectedFIPs === row['county_fips'] ? 'active' : ''}"
      onclick={() => navigateToNewPage(row['county_fips'])}
      tabindex={ index }
      role="button"
    >
      <div class="table-mobile-text">{ row['county_name'] }</div>
      <div class="table-mobile-row-contents">
        <div class="table-mobile-body-half">
          <div class="table-mobile-number">
            <div class="label-number">Median listing price</div>
            <div class="num">{ formats.currency(row.median_listing_price) }</div>
          </div>
          <div class="table-mobile-number">
            <div class="label-number">Change year-over-year</div>
            <div class="num {row.median_listing_price_yoy > 0 ? 'pink' : row.median_listing_price_yoy < 0 ? 'green' : ''}">
              <span class="{arrows.classes(row.median_listing_price_yoy, 'negative')}"></span>
              { formats.percent(Math.abs(row.median_listing_price_yoy)) }</div>
          </div>
        </div>
        <div class="table-mobile-body-half">
          <div class="table-mobile-number">
            <div class="label-number">Inventory</div>
            <div class="num">{ formats.number(row.active_listing_count) }</div>
          </div>
          <div class="table-mobile-number">
            <div class="label-number">Change year-over-year</div>
            <div class="num {row.active_listing_count_yoy > 0 ? 'green' : row.active_listing_count_yoy < 0 ? 'pink' : ''}">
              <span class="{arrows.classes(row.active_listing_count_yoy)}"></span>
              { formats.percent(Math.abs(row.active_listing_count_yoy)) }
            </div>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
@use './../../lib/style/variables';

.table-mobile-row {
  padding: 15px 0;
  border-bottom: 1px solid variables.$gray-grid;
  cursor: pointer;

  &.active {
    background-color: variables.$gray-lightest;

    div {
      font-weight: 700;
    }
  }
}

.table-mobile-row-contents {
  display: flex;
  justify-content: space-between;
  font-size: 16px;

  .table-mobile-body-half {
    margin: 5px 0;
    width: 50%;
  }
}

.table-mobile-number {
  margin: 7.5px 0px;
}

.label-number {
  font-size: 10px;
  letter-spacing: 0.2;
  margin: 2.5px 0;
  text-transform: uppercase;
}

.num {
  font-family: "Lekton", monospace;
}

.arrow {
  display: inline-block;
  width: 0; 
  height: 0; 
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;

  &.arrow-zero {
    display: none;
  }
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
</style>
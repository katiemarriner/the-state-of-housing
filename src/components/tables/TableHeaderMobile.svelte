<script>
  let { sortData, currentValue, direction } = $props();

  import SortArrows from "./SortArrows.svelte";
</script>

<div class="table-mobile-header">
  <div class="label">Sort by</div>
  <div class="table-mobile-header-contents">
    <div class="table-mobile-header-half">
      <button class="num"
        onclick={() => sortData('median_listing_price')}>
        <SortArrows label='Median home price' active={currentValue === 'median_listing_price'} { direction } />
      </button>
      <button class="num"
        onclick={() => sortData('median_listing_price_yoy')}>
        <SortArrows label='Change year-over-year' active={currentValue === 'median_listing_price_yoy'} { direction } />
      </button>
    </div>
    <div class="table-mobile-header-half">
      <button class="num"
        onclick={() => sortData('active_listing_count')}>
        <SortArrows label='Inventory' active={currentValue === 'active_listing_count'} { direction } />
      </button>
      <button class="num"
        onclick={() => sortData('active_listing_count_yoy')}>
        <SortArrows label='Change year-over-year' active={currentValue === 'active_listing_count_yoy'} { direction } />
      </button>
    </div>
  </div>
</div>

<style lang="scss">
  @use './../../lib/style/variables';

  span {
    text-transform: uppercase; 
    font-size: 12px;
    font-weight: 600;
  }
  
  .label {
    margin-bottom: 0;
  }

  button {
    border: none;
    display: block;
    // resets the padding on buttons
    padding: 0;
  }

  .table-header-mobile {
    background-color: #fff;
    position: sticky;
    top: 0;
  }

  .table-mobile-header-contents {
    display: flex;
    justify-content: space-between;

    .table-mobile-header-half {
      width: 50%;
    }
  }
</style>
<script>
  let { sortData, currentValue, direction } = $props();

  import SortArrows from "./SortArrows.svelte";
</script>

<div class="table-mobile-header">
  <div class="label">Sort by</div>
  <button class="name">
    <span>County</span>
  </button>
  <button class="num"
    onclick={() => sortData('median_listing_price')}
    ontouchend={() => sortData('median_listing_price')}>
    <SortArrows label='Median home price' active={currentValue === 'median_listing_price'} { direction } />
  </button>
  <button class="num"
    onclick={() => sortData('median_listing_price_yoy')}
    ontouchend={() => sortData('median_listing_price_yoy')}>
    <SortArrows label='Change year-over-year' active={currentValue === 'median_listing_price_yoy'} { direction } />
  </button>
  <button class="num"
    onclick={() => sortData('active_listing_count')}
    ontouchend={() => sortData('active_listing_count')}>
    <SortArrows label='Inventory' active={currentValue === 'active_listing_count'} { direction } />
  </button>
  <button class="num"
    onclick={() => sortData('active_listing_count_yoy')}
    ontouchend={() => sortData('active_listing_count_yoy')}>
    <SortArrows label='Change year-over-year' active={currentValue === 'active_listing_count_yoy'} { direction } />
  </button>
</div>

<style lang="scss">
  @use './../../lib/style/variables';
  
  .label {
    margin-bottom: 0;
  }

  button {
    border: none;
    display: block;
    padding: 2.55px 0;
  }
</style>
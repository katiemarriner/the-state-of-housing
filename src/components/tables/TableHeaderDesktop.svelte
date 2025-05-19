<script>
  export let sortData, currentValue, direction, latestMonth;

  import SortArrows from "./SortArrows.svelte";
</script>

<thead>
  <tr>
    <th class="name">
      <span>County</span>
    </th>
    <th
      class="num"
      onclick={() => sortData('median_listing_price')}>
      <SortArrows label='Median home price for { latestMonth }' active={currentValue === 'median_listing_price'} { direction } />
    </th>
    <th class="num"
      onclick={() => sortData('median_listing_price_yoy')}>
      <SortArrows label='Change year-over-year' active={currentValue === 'median_listing_price_yoy'} { direction } />
    </th>
    <th class="num"
      onclick={() => sortData('active_listing_count')}>
      <SortArrows label='Inventory' active={currentValue === 'active_listing_count'} { direction } />
    </th>
    <th class="num"
      onclick={() => sortData('active_listing_count_yoy')}>
      <SortArrows label='Change year-over-year' active={currentValue === 'active_listing_count_yoy'} { direction } />
    </th>
  </tr>
</thead>

<style lang="scss">
  @use './../../lib/style/variables';

  th {
    cursor: pointer;
    text-align: left;
    text-transform: uppercase; 
    font-size: 12px;
    font-weight: 600;
    padding: 10px 5px;

    &:first-child {
      padding-left: 0px;
    }

    &.name {
      text-align: left;
    }

    &.num {
      text-align: right;
    }
  }

  thead tr {
    border-bottom: variables.$selector-border;
  }
</style>
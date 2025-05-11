<script>
  import { onMount } from "svelte";
  import { dataStore, loadNationalData } from "../counties.store";
  import helpers from "../lib/js/helpers";
  import { timeYear } from 'd3-time';

  const { formats, time } = helpers;

  $: dataNational = null;
  dataStore.subscribe(res => {
    dataNational = res.national;
  });

  function getOneYearAgo(date_) {
    return time.monthYearFormat(timeYear.offset(time.parseTime(date_), -1));
  }

  onMount(async () => {
    loadNationalData();
  });
</script>

{#if dataNational}
<div class="container-banner-national">
  <marquee><h4>National metrics: Median listing price: { formats.currency(dataNational.latest['median_listing_price']) }  |  Change in inventory from { getOneYearAgo(dataNational.latest['month_date']) } is { formats.percent(dataNational.latest['active_listing_count_yoy']) }  |  The median amount of days on the market is { dataNational.latest['median_days_on_market'] }</h4></marquee>
</div>
{/if}

<style lang="scss">
  h4 {
    font-size: 12px;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }
</style>
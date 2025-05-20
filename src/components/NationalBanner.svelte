<script>
  import { dataStoreCommon } from "../counties.store";
  import helpers from "../lib/js/helpers";
  import { timeYear } from 'd3-time';

  const { formats, time } = helpers;

  $: national = $dataStoreCommon.historicalNational;

  function getOneYearAgo(date_) {
    return time.monthYearFormat(timeYear.offset(time.parseTime(date_), -1));
  }
</script>

{#if national}
<div class="container-banner-national">
  <marquee><h4><span class="purple">National metrics: Median listing price: { formats.currency(national.latest['median_listing_price']) }</span>  |  <span class="orange">Change in inventory from { getOneYearAgo(national.latest['month_date']) } is { formats.percent(national.latest['active_listing_count_yoy']) }</span>  |  The median amount of days on the market is { national.latest['median_days_on_market'] }</h4></marquee>
  <div class="label">Last update: { time.monthYearFormat(time.parseTime(national['latest']['month_date'])) }</div>
</div>
{/if}

<style lang="scss">
  @use './../lib/style/variables';

  h4 {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.2px;
    text-transform: uppercase;

    span {
      font-weight: 700;
    }
  }

  .label {
    color: variables.$red;
    text-transform: uppercase;
    font-weight: 700;
  }
</style>
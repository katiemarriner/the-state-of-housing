<script>
  export let data;

  import helpers from './../lib/js/helpers';

  const { percent, currency } = helpers.formats;
  const { parseTime, monthYearFormat } = helpers.time;

  function rollingAverageDifference(key) {
    return data.latest[key] > data.latest[`${key}_rolling`]
    ? 'higher than' : data.latest[key] < data.latest[`${key}_rolling`]
    ? 'lower than' : 'the same as';
  }

  function upOrDown(key) {
    return data.latest[`${key}_yoy`] > 0 ? 'an increase in' 
      : data.latest[`${key}_yoy`] < 0
      ? 'a decrease in'
      : 'the same'
  }
  
  let diffActiveListings = rollingAverageDifference('active_listing_count')
  let diffMedianListing = rollingAverageDifference('median_listing_price');

  let changeActiveListings = upOrDown('active_listing_count');
  let changeMedianListing = upOrDown('median_listing_price');

</script>

<p>The national housing market shows { changeMedianListing } the <span class="purple">median listing price</span> of homes year-over-year. The latest month's median is <span class="purple">{ currency(data.latest['median_listing_price'] )}</span>, which is { diffMedianListing } the 12-month moving average, <span class="purple">{ currency(data.latest['median_listing_price_rolling']) }</span>.</p>
<p>As for housing supply, the amount of <span class="orange">active listings</span> for { monthYearFormat(parseTime(data.latest['month_date'])) } is { diffActiveListings } the 12-month rolling average for the same month. It's { changeActiveListings } of <span class="{data.latest['active_listing_count_yoy'] > 0 ? 'green' : 'pink'}">{ percent(data.latest['active_listing_count_yoy']) }</span> from one year ago.</p>

<style lang="scss">
  @use './../lib/style/variables';
  
  p span {
    font-weight: 600;
  }

  .purple {
    color: variables.$purple;
  }

  .orange {
    color: variables.$orange;
  }

  .pink {
    color: variables.$pink;
  }

  .green {
    color: variables.$green;
  }
</style>
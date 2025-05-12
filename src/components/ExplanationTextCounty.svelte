<script>
  export let dataNational, dataCounty;
  import helpers from './../lib/js/helpers';

  const formats = helpers.formats;

  // NOTE: find a better way to do this. Data may not always be sorted descending
  const currentMonth = dataCounty['median_listing_price'].map(d => d[0])[0];
  let medianListing = {
    national: dataNational.latest['median_listing_price'],
    county: dataCounty.latest['median_listing_price'],
    countyAverage: dataCounty['median_listing_price_rolling'].find(d => d[0] === currentMonth)[1]
  } 

  let activeListing = {
    national: dataNational.latest['active_listing_count'],
    county: dataCounty.latest['active_listing_count'],
    countyAverage: dataCounty['active_listing_count_rolling'].find(d => d[0] === currentMonth)[1]
  }

  console.log(medianListing)

  // let medianDiff = (medianListing.county - medianListing.national) / medianListing.national;
  let movingAverageMedianDiff = (medianListing.county - medianListing.countyAverage) / medianListing.countyAverage;
  let movingAverageActiveDiff = (activeListing.county - activeListing.countyAverage) / activeListing.countyAverage;

  function formatHigherLower(num) {
    return num > 0 ? `<span class="green">${formats.percent(num) } higher than</span>` : num < 0 ? `<span class="pink">${formats.percent(Math.abs(num))} lower than</span>` : 'about the same as';
  }
</script>

<p>The <span class="purple">median listing price</span> for a home in { dataCounty['county_name'] } is {@html formatHigherLower(movingAverageMedianDiff)} the 12-month moving average, which is <span class="purple">{ formats.currency(medianListing.countyAverage )}</span>. <span class="orange">Inventory</span> is {@html formatHigherLower(movingAverageActiveDiff)} than the 12-month moving average of { formats.number(activeListing.county) } active listings.</p>

<style lang="scss">
  @use './../lib/style/_variables';
</style>
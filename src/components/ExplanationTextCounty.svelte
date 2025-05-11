<script>
  export let dataNational, dataCounty;
  import helpers from './../lib/js/helpers';

  const formats = helpers.formats;

  let medianListing = {
    national: dataNational.latest['median_listing_price'],
    county: dataCounty.latest['median_listing_price']
  } 

  let medianDiff = (medianListing.county - medianListing.national) / medianListing.national;
</script>

<p>The median listing price for a home in { dataCounty['county_name'] } is {@html medianDiff > 0.03 ? `<span class="green">${formats.percent(medianDiff) } higher than</span>` : medianDiff < -0.03 ? `<span class="pink">${formats.percent(Math.abs(medianDiff))} lower than</span>` : 'about the same as'} the national average. </p>

<style lang="scss">
  @use './../lib/style/_variables';
</style>
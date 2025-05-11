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

<p>The median listing price for a home in { dataCounty['county_name'] } is {medianDiff > 0.03 ? `${formats.percent(medianDiff)} higher than` : medianDiff < -0.03 ? `${formats.percent(medianDiff)} lower than` : 'about the same as'} the national average. </p>
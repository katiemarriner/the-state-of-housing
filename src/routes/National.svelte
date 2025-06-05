<script>
  import { fade } from 'svelte/transition';

  import { dataStoreCommon } from '../counties.store';
  import helpers from '../lib/js/helpers';

  import Search from "../components/Search.svelte";
  import TableMetrics from '../components/tables/TableMetrics.svelte';
  import BigNumbers from '../components/BigNumbers.svelte';
  import BarChart from '../components/charts/BarChart.svelte';
  import ExplanationText from '../components/ExplanationText.svelte';

  const { time } = helpers;
  
  $: width = null;
  $: height = width / 2;

  $: national = $dataStoreCommon.historicalNational;
  $: latestCounties = $dataStoreCommon.latestCounties;
  $: metaCounties = $dataStoreCommon.metaCounties;
  $: metaStates = $dataStoreCommon.metaStates;
  $: isLoading = $dataStoreCommon.loading;
</script>

{#if !isLoading}
  <h2>National</h2>
  <ExplanationText data={ national } />
  <div class="container-national" in:fade={{duration: 500}}>
    <div class="container-national-chart national-price" bind:clientWidth={ width }>
      <BigNumbers
        data={ national['latest'] }
        metricKey="median_listing_price"
        label="Median listing price"
        labelSub=""
        formatType="currency"
        color="purple"
        positiveValue="negative"
        negativeValue="positive"
        latestDate={ time.monthYearFormat(time.parseTime(national.latest['month_date'])) }
        />
      <BarChart
        data={ national }
        metricKey="median_listing_price"
        { width }
        { height }
        margin={ null }
        formatType="currency"
        color="purple"
        showAnnotation={true}
      />
    </div>
    <div class="container-national-chart national-inventory">
      <BigNumbers
        data={ national['latest'] }
        metricKey="active_listing_count"
        label="Inventory"
        labelSub="Active listings for"
        formatType="number"
        color="orange"
        positiveValue="positive"
        negativeValue="negative"
        latestDate={ time.monthYearFormat(time.parseTime(national.latest['month_date'])) }
        />
      <BarChart
        data={ national }
        metricKey="active_listing_count"
        { width }
        { height }
        margin={ null }
        formatType="number"
        color="orange"
        showAnnotation={true}
      />
    </div>
  </div>
  <h2>Search for your county</h2>
  <Search countiesMeta={ metaCounties } />
  <TableMetrics dataLatest={ latestCounties } dataStates={ metaStates } latestMonth={ 'April 2025' } />
{/if}

<style lang="scss">
  @use './../lib/style/variables';

  h2 {
    margin: 15px 0;
  }

  .container-national {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media (max-width:900px) {
      flex-direction: column;
    }

    .container-national-chart {
      width: 50%;

      @media (max-width:900px) {
        width: 100%;
        max-width: 500px;
      }
    }
  }
</style>
<script>
  export let params = {};

  import { onMount } from 'svelte'; 
  import { fade } from 'svelte/transition'
  import { loadNationalData, loadStateData, dataNational, dataState, dataLatest, resetData, loadLatestData } from '../counties.store';
  
  import BigNumbers from '../components/BigNumbers.svelte';
  import BarChart from '../components/charts/BarChart.svelte';
  import ExplanationTextCounty from '../components/ExplanationTextCounty.svelte';
  import TableCounty from '../components/tables/TableCounty.svelte';

  import helpers from '../lib/js/helpers';

  const { time } = helpers;
  
  const url = import.meta.env.BASE_URL;
  let data, dataHouseholds, latestMonth;
  $: national = $dataNational;
  $: stateData = $dataState;
  $: latest = $dataLatest;

  async function updateData(fips) {
    fips = fips || params.id;
    resetData();
    const res = await fetch(`${url}/data/counties/${fips}.json`);
    data = await res.json();

    latestMonth = time.monthYearFormat(time.parseTime(data.latest['latest_month']));
    
    await loadLatestData();
    await loadNationalData();
    await loadStateData(fips.substring(0, 2));

    // Get similar household sizes by sorting and getting the 15 higher and 15 lower
    const sortedLatest = latest.sort((a, b) => {
      return a['households'] - b['households'];
    });
    const householdIndex = sortedLatest.map(d => d['county_fips']).indexOf(params.id);
    dataHouseholds = sortedLatest.filter((d, index) => {
      return (householdIndex <= index + 15) && (householdIndex > index - 15);
    });
  }

  onMount(updateData);

  $: width = 0;
  $: height = width / 2;
  const margin = {
    top: 25,
    right: 30,
    bottom: 10,
    left: 0
  }

  $: selectedComparison = 'state';
  // $: selectedData = stateData && selectedComparison === 'state' ? stateData.data : dataHouseholds;
  // $: console.log(selectedComparison, selectedData)
</script>

{#if national && stateData && data}
  <h2 class="countyName">{data.county_name}</h2>
  <ExplanationTextCounty dataCounty={ data } dataNational={ national } />
  <div class="container-county-charts" in:fade={{duration: 500}}>
    <div class="container-county-chart" bind:clientWidth={ width }>
      <BigNumbers
        { data }  
        metricKey="median_listing_price"
        label="Median home price"
        labelSub=""
        formatType="currency" 
        color="purple"
        positiveValue="negative"
        negativeValue="positive"
      />
      <BarChart
        { data }
        metricKey="median_listing_price"
        { width }
        { height }
        { margin }
        formatType="currency"
        color="purple"
        showAnnotation={true}
      />
    </div>
    <div class="container-county-chart">
      <BigNumbers
        { data }
        metricKey="active_listing_count"
        label="Inventory"
        labelSub="Active listings"
        formatType="number" 
        color="orange"
        positiveValue="positive"
        negativeValue="negative"
      />
      <BarChart
        { data }
        metricKey="active_listing_count"
        { width }
        { height }
        { margin }
        formatType="number"
        color="orange"
        showAnnotation={true}
      />
    </div>
  </div>
  <div class="container-county-table">
    <h3>Compare to counties 
      <button onclick={() => selectedComparison = 'state'}>in { stateData.state_name }</button>
      <button onclick={() => selectedComparison = 'household'}>to similar households.</button>
    </h3>
    <TableCounty { updateData } dataState={ stateData.data } selectedFIPs={ params.id } { latestMonth } />
  </div>
{/if}

<style lang="scss">
  @use './../lib/style/variables';

  .countyName {
    margin-bottom: 10px;
  }

  .container-county-charts {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media (max-width:900px) {
      flex-direction: column;
    }

    .container-county-chart {
      width: 50%;

      @media (max-width:900px) {
        max-width: 450px;
        width: 100%;
      }
    }
  }
</style>
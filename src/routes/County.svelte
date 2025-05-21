<script>
  export let params = {};

  import { fade } from 'svelte/transition'

  import helpers from '../lib/js/helpers';

  import { dataStoreCombined, loadPageData, resetPageData } from '../counties.store';
  
  import BigNumbers from '../components/BigNumbers.svelte';
  import BarChart from '../components/charts/BarChart.svelte';
  import ExplanationTextCounty from '../components/ExplanationTextCounty.svelte';
  import TableCounty from '../components/tables/TableCounty.svelte';
  
  const { time } = helpers;

  // store data
  $: national = $dataStoreCombined.shared?.historicalNational;
  $: county = $dataStoreCombined.route?.dataCounty;
  $: latest = $dataStoreCombined.shared.latestCounties;
  $: metaState = $dataStoreCombined.shared?.metaStates;
  $: isLoading = $dataStoreCombined?.loading;

  $: stateFIPs = params.id.substring(0, 2);

  // in-browser data formatting
  $: tableData = {
    states: null,
    households: null
  };
  $: selectedState = null
  $: latestDate = null;

  $: dataReady = !isLoading && county && national && latest && selectedState && latestDate;

  async function updateData() {
    selectedState = null;
    await loadPageData(params.id);
    
    if(latest) {
      tableData['states'] = [...latest].filter(d => {
        return d['county_fips'].substring(0, 2) === stateFIPs;
      });

      tableData['households'] = [...latest].sort((a, b) => {
        return a['households'] - b['households'];
      });

      const householdIndex = tableData.households.map(d => d['county_fips']).indexOf(params.id);
      tableData.households = tableData.households.filter((d, i) => {
        return (householdIndex - 15 <= i) && (householdIndex + 15 > i);
      });
    }

    if(national) {
      latestDate = time.monthYearFormat(time.parseTime(national['latest']['month_date']));
    }

    if(metaState) {
      // note: replace this with a way to call state data from the store
      selectedState = metaState.find(d => d['fips'] === stateFIPs);
    }
  }

  $: if(latest && national && metaState && !dataReady) {
    updateData();
  }

  $: width = 0;
  $: height = width / 2;
  const margin = {
    top: 25,
    right: 30,
    bottom: 10,
    left: 0 
  }
</script>

{#if dataReady}
  <ExplanationTextCounty dataCounty={ county } dataNational={ national } />
  <div class="container-county-charts" in:fade={{duration: 500}}>
    <div class="container-county-chart" bind:clientWidth={ width } >
      <BigNumbers
        data={ county }
        metricKey="median_listing_price"
        label="Median home price"
        labelSub=""
        formatType="currency" 
        color="purple"
        positiveValue="negative"
        negativeValue="positive"
      />
      <BarChart
        data={ county }
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
        data={ county }
        metricKey="active_listing_count"
        label="Inventory"
        labelSub="Active listings"
        formatType="number" 
        color="orange"
        positiveValue="positive"
        negativeValue="negative"
      />
      <BarChart
        data={ county }
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
    <TableCounty { tableData } { selectedState } selectedFIPs={ params.id } latestMonth={ latestDate } />
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
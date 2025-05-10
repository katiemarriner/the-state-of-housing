<script>
  import { onMount } from 'svelte';
  import countiesMeta from  '../counties.store.js';

  import Search from "../components/Search.svelte";
  import TableMetrics from '../components/tables/TableMetrics.svelte';
  import BigNumbers from '../components/BigNumbers.svelte';
  import BarChart from '../components/charts/BarChart.svelte';
  import ExplanationText from '../components/ExplanationText.svelte';

  $: width = null;
  $: height = width / 2;
  
  const url = import.meta.env.BASE_URL;
  $: dataLatest = [];
  $: dataNational = [];
  onMount(async () => {
    const resAll = await Promise.all([`${url}/data/latest.json`, `${url}/data/national.json`].map(loc => {
      return fetch(loc).then(res => {
        return res.json()
      })
    }));
    dataLatest = resAll[0];
    dataNational = resAll[1];
  });
</script>

{#if dataLatest.length > 0}
  <h2>National</h2>
  <ExplanationText data={ dataNational } />
  <div class="container-national">
    <div class="container-bar national-price" bind:clientWidth={ width }>
      <BigNumbers
        data={ dataNational }
        metricKey="median_listing_price"
        label="Median listing price"
        labelSub=""
        formatType="currency"
        color="purple"
        positiveValue="negative"
        negativeValue="positive"
        />
      <BarChart
        data={ dataNational }
        metricKey="median_listing_price"
        { width }
        { height }
        margin={ null }
        formatType="currency"
        color="purple"
        showAnnotation={false}
      />
    </div>
    <div class="container-bar national-inventory">
      <BigNumbers
        data={ dataNational }
        metricKey="active_listing_count"
        label="Inventory"
        labelSub="Active listings for"
        formatType="number"
        color="orange"
        positiveValue="positive"
        negativeValue="negative"
        />
      <BarChart
        data={ dataNational }
        metricKey="active_listing_count"
        { width }
        { height }
        margin={ null }
        formatType="number"
        color="orange"
        showAnnotation={false}
      />
    </div>
  </div>
  <h2>Search for your county</h2>
  <Search { countiesMeta } />
  <TableMetrics { dataLatest } />
{/if}

<style lang="scss">
  @use './../lib/style/variables';

  h2 {
    margin: 15px 0;
  }

  .container-national {
    max-width: 768px;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media (max-width:900px) {
      flex-direction: column;
    }

    .container-bar {
      width: 50%;

      @media (max-width:900px) {
        width: 100%;
        max-width: 500px;
      }
    }
  }
</style>
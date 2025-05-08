<script>
  import { onMount } from 'svelte';
  import countiesMeta from  '../counties.store.js';

  import Search from "./../components/Search.svelte";
  import TableMetrics from './../components/TableMetrics.svelte';
  import BigNumbers from '../components/BigNumbers.svelte';
  import BarChart from '../components/BarChart.svelte';

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

{#if dataLatest.length}
  <h2>National</h2>
  <p>The national housing market shows [INCREASING/DECREASING] prices. The latest month shows a median listing price of [LATEST], which is [HIGHER/LOWER] than the 12-month moving average.</p>
  <div class="container-national" bind:clientWidth={ width }>
    <div class="container-bar national-price">
      <BigNumbers
        data={ dataNational }
        metricKey="median_listing_price"
        label="Median listing price"
        labelSub=""
        formatType="currency"
        color="purple"
        />
      <BarChart
        data={ dataNational }
        metricKey='median_listing_price'
        width={ width / 2 }
        height={ height / 2 }
        margin={ null }
        formatType='currency'
        color='purple'
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
        color="orange"/>
      <BarChart
        data={ dataNational }
        metricKey='active_listing_count'
        width={ width / 2 }
        height={ height / 2 }
        margin={ null }
        formatType='number'
        color='orange'
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
  }
</style>
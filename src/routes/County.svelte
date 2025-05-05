<script>
  export let params = {};

  import BigNumbers from '../components/BigNumbers.svelte';
  import BarChart from '../components/BarChart.svelte';

  import { onMount } from 'svelte';
  
  const url = import.meta.env.BASE_URL;
  let data;
  let latest = 0;
  let yearAgo = 0;
  let changeYoY = 0;
  let metricKey = 'median_listing_price';

  onMount(async () => {
    const res = await fetch(`${url}/data/counties/${params.id}.json`);
    data = await res.json();
    latest = data[metricKey][0];
    yearAgo = data[metricKey][11];
    changeYoY = (latest[1] - yearAgo[1]) / latest[1];
  });

  $: width = 500;
  $: height = width / 2;
  const margin = {
    top: 25,
    right: 30,
    bottom: 10,
    left: 0
  }

  console.log('latest', latest)
  </script>

{#if data}
  <div bind:clientWidth={ width } style="max-width:500px;">
    <h1 class="countyName">{data.county_name}</h1>
    <BigNumbers { width } { latest } { changeYoY } label="Prices" />
    <BarChart { width } { height } { margin } { data } { metricKey } { latest }/>
  </div>
{/if}

<style lang="scss">
  .countyName {
    margin-bottom: 10px;
  }
</style>
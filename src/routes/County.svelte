<script>
  export let params = {};

  import BigNumbers from '../components/BigNumbers.svelte';
  import BarChart from '../components/charts/BarChart.svelte';

  import { onMount } from 'svelte'; 
  
  const url = import.meta.env.BASE_URL;
  let data;

  onMount(async () => {
    const res = await fetch(`${url}/data/counties/${params.id}.json`);
    data = await res.json();
  });

  $: width = 500;
  $: height = width / 2;
  const margin = {
    top: 25,
    right: 30,
    bottom: 10,
    left: 0
  }
</script>

{#if data}
  <div bind:clientWidth={ width } style="max-width:500px;">
    <h2 class="countyName">{data.county_name}</h2>
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
{/if}

<style lang="scss">
  @use './../lib/style/variables';

  .countyName {
    margin-bottom: 10px;
  }
</style>
<script>
  export let params = {};

  import { onMount } from 'svelte';
  import { scaleLinear, scaleBand } from 'd3-scale';

  const url = import.meta.env.BASE_URL;
  let data;

  onMount(async () => {
    const res = await fetch(`${url}/data/counties/${params.id}.json`);
    data = await res.json();
  });

  $: width = 500;
  $: height = width / 1.5;

  let maxPrice, dateRange, xScale, yScale, bandWidth;
  $: if(data) {
    maxPrice = Math.max(...data.timeseries.map(d => {
      return d.median_listing_price;
    }));
  
    dateRange = data.timeseries.map(d => {
      return d.month_date_yyyymm;
    }).reverse();

    xScale = scaleBand()
      .domain(dateRange)
      .range([0, width])
      .padding(0.1);

    bandWidth = xScale.bandwidth();

    yScale = scaleLinear()
      .domain([0, maxPrice])
      .range([height, 0]);
  }
  </script>

{#if data && xScale}
  <h1>{data.county_name}</h1>
  <div class="container-barChart" bind:clientWidth={ width } >
    <svg { width } { height }>
      <g class="g-bars">
        {#each data.timeseries as d}
          <rect
            x={xScale(d.month_date_yyyymm)}
            width={bandWidth}
            height={height - yScale(d.median_listing_price)}
            y={yScale(d.median_listing_price)}
          />
        {/each}
      </g>
      <g class="x-axis axis">

      </g>
      <g class="y-axis axis">

      </g>
    </svg>
  </div>
{/if}

<style>
  svg {
    outline: 1px solid #333;
  }

  .container-barChart {
    max-width: 500px;
  }

  .axis {
    color: #333;
    font-size: 11px;
  }
</style>
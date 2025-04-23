<script>
  export let params = {};

  import { onMount } from 'svelte';
  import { scaleLinear, scaleBand } from 'd3-scale';
  import { format } from 'd3-format';
  import { timeParse, timeFormat } from 'd3-time-format';

  const currencyFormat = format("($,");
  const percentFormat = format(".2%");
  const parseTime = timeParse('%Y-%m-%d');
  const monthYearFormat = timeFormat('%b %Y');
  const url = import.meta.env.BASE_URL;
  let data;

  onMount(async () => {
    const res = await fetch(`${url}/data/counties/${params.id}.json`);
    data = await res.json();
  });

  $: width = 500;
  $: height = width / 1.5;

  let maxPrice, dateRange, xScale, yScale, bandWidth, latest, yearAgo, changeYoY
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

    latest = data.timeseries[0];
    yearAgo = data.timeseries[11];
    changeYoY = (latest.median_listing_price - yearAgo.median_listing_price) / latest.median_listing_price;
  }
  </script>

{#if data && xScale}
  <h1 class="countyName">{data.county_name}</h1>
  <div class="container-bigNumbers">
    <div class="label">Median home price {monthYearFormat(parseTime(latest.month_date_yyyymm))}</div>
    <div class="bigNumber">{currencyFormat(latest.median_listing_price)}</div>
    <div class="label">Change from previous year</div>
    <div class="mediumNumber"><span class="">{#if changeYoY > 0} + {:else} - {/if}</span>{ percentFormat(Math.abs(changeYoY)) }</div>
  </div>
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

<style lang="scss">
  @import './../lib/style/variables';

  .countyName {
    margin-bottom: 0px;
  }

  .container-bigNumbers {
    .label {
      color: $gray-light;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .bigNumber {
      font-family: "Roboto";
      font-size: 30px;
      font-weight: 400;
      letter-spacing: 0.5;
    }

    .mediumNumber {
      font-family: "Roboto";
      font-size: 20px;
      font-weight: 400;
    }
  }
  
  svg {
    // outline: 1px solid #333;
  }

  .container-barChart {
    max-width: 500px;
  }

  .axis {
    color: #333;
    font-size: 11px;
  }

  .g-bars rect {
    fill: $purple-light;
  }
</style>
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
  $: height = width / 2;

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
      .range([0, width]);

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
  <div class="container-bigNumbers" style="width:{width}px;">
    <div class="container-label">
      <div class="bigNumber currency">{currencyFormat(latest.median_listing_price)}</div>
      <div class="label">Median home price {monthYearFormat(parseTime(latest.month_date_yyyymm))}</div>
    </div>
    <div class="container-label">
      <div class="mediumNumber change {changeYoY > 0 ? 'positive' : changeYoY < 0 ? 'negative' : 'zero'}">
        <span class="{changeYoY > 0 ? 'arrow-up' : changeYoY < 0 ? 'arrow-down' : ''}"></span>
        { percentFormat(Math.abs(changeYoY)) }
      </div>
      <div class="label">From previous year</div>
    </div>
  </div>
  <div class="container-barChart" bind:clientWidth={ width } >
    <svg { width } { height }>
      <g class="g-bars">
        {#each data.timeseries as d, i}
          <rect
            x={xScale(d.month_date_yyyymm)}
            width={bandWidth}
            height={height - yScale(d.median_listing_price)}
            y={yScale(d.median_listing_price)}
            class="{i === 0 ? 'dark-purple' : ''}"
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
    margin-bottom: 10px;
  }

  .container-bigNumbers {
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 25px;

    .label {
      color: $gray-light;
      font-family: "Lekton", monospace;
      font-size: 14px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .bigNumber {
      align-self: end;
      font-family: "Lekton", monospace;
      font-size: 30px;
      font-weight: 600;
      letter-spacing: 0.5;
    }

    .mediumNumber {
      font-family: "Lekton", monospace;
      font-size: 20px;
      font-weight: 600;
    }

    .currency {
      color: $purple;
    }

    .positive {
      color: $pink-text;
    }

    .negative {
      color: $green-text;
    }
  }

  .arrow-up {
    display: inline-block;
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 8px solid $pink-text;
  }

  .arrow-down {
    display: inline-block;
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 8px solid $green-text;
  }
  
  svg {
    .g-bars rect {
      fill: $purple-light;
      stroke: #fff;
      stroke-width: 3px;

      &.dark-purple {
        fill: $purple;
      }
    }
  }

  .container-barChart {
    max-width: 500px;
  }

  .axis {
    color: #333;
    font-size: 11px;
  }
</style>
<script>
  export let params = {};

  import { onMount } from 'svelte';
  import { scaleLinear, scaleBand } from 'd3-scale';
  import { format } from 'd3-format';
  import { timeParse, timeFormat } from 'd3-time-format';

  const currencyFormat = format("($,");
  const percentFormat = format(".2%");
  const parseTime = timeParse('%Y-%m-%d');
  const monthYearFormat = timeFormat('%B %Y');
  const url = import.meta.env.BASE_URL;
  let data;
  let metricKey = 'median_listing_price';

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
  $: innerWidth = width - margin.left - margin.right;
  $: innerHeight = height - margin.top - margin.bottom;

  let maxPrice, dateRange, yearLabels, yearTicks,
      xAxis, xScale, yScale, bandWidth,
      latest, yearAgo, changeYoY;
  $: if(data) {
    maxPrice = Math.max(...data[metricKey].map(d => {
      return d[1];
    }));
  
    dateRange = data[metricKey].map(d => {
      return d[0];
    }).reverse();

    xScale = scaleBand()
      .domain(dateRange)
      .range([margin.left, innerWidth]);

    bandWidth = xScale.bandwidth();

    yScale = scaleLinear()
      .domain([0, maxPrice])
      .range([innerHeight, margin.top]);
  
    yearLabels = dateRange.filter(d => d.substring(5, 7) === '07');
    yearTicks = dateRange.filter(d => d.substring(5, 7) === '01');

    latest = data[metricKey][0];
    yearAgo = data[metricKey][11];
    changeYoY = (latest[1] - yearAgo[1]) / latest[1];

    console.log(maxPrice, latest)

  }
  </script>

{#if data && xScale}
  <h1 class="countyName">{data.county_name}</h1>
  <div class="container-bigNumbers" style="width:{width}px;">
    <div class="container-label">
      <div class="bigNumber currency">{currencyFormat(latest[1])}</div>
      <div class="label">Median home price {monthYearFormat(parseTime(latest[0]))}</div>
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
    <svg { width } { height } >
      <g class="g-bars">
        {#each data[metricKey] as d, i}
          <rect
            x={xScale(d[0])}
            width={bandWidth}
            height={innerHeight - yScale(d[1])}
            y={yScale(d[1])}
            class="{i === 0 ? 'dark-purple' : ''}"
          />
        {/each}
      </g>
      <g 
        class="g-annotations"
        transform="translate({xScale(latest[0]) + (bandWidth/2)}, {yScale(latest[1])})">
        <line x1="0" x2="0" y1="0" y2="{-margin.top/2}"/>
        <text y="{-margin.top / 2}">{ monthYearFormat(parseTime(latest[0])) }</text>
        <text y="{-margin.top}">{ currencyFormat(latest[1]) }</text>
      </g>
      <g class="x-axis g-axis" transform="translate(0, {innerHeight})">
        {#each yearLabels as year}
          <g transform="translate({xScale(year)}, {margin.bottom})">
            <text>{year.substring(0, 4)}</text>
          </g>
        {/each}
        {#each yearTicks as year}
          <g transform="translate({xScale(year)}, {margin.bottom})">
            <line x1="0" x2="0" y1="0" y2="{-margin.bottom}"/>
          </g>
        {/each}
      </g>
      <g class="y-axis g-axis">

      </g>
    </svg>
  </div>
{/if}

<style lang="scss">
  @use './../lib/style/variables';

  .countyName {
    margin-bottom: 10px;
  }

  .container-bigNumbers {
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 25px;

    .label {
      color: variables.$gray-light;
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
      color: variables.$purple;
    }

    .positive {
      color: variables.$pink-text;
    }

    .negative {
      color: variables.$green-text;
    }
  }

  .arrow-up {
    display: inline-block;
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 8px solid variables.$pink-text;
  }

  .arrow-down {
    display: inline-block;
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 8px solid variables.$green-text;
  }
  
  svg {
    line {
      stroke: #333;
      stroke-width: 0.5px;
    }

    text {
      font-size: 12px;
      text-anchor: middle;
    }

    .g-bars rect {
      fill: variables.$purple-light;
      stroke: #fff;
      stroke-width: 3px;

      &.dark-purple {
        fill: variables.$purple;
      }
    }
  }

  .container-barChart {
    max-width: 500px;
  }

  .g-axis {
    color: #333;
    font-size: 11px;
  }
</style>
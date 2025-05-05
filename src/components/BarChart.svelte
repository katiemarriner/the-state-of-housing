<script>
  export let width, height, margin, data, metricKey, latest;

  import { format } from 'd3-format';
  import { timeParse, timeFormat } from 'd3-time-format';
  import { scaleLinear, scaleBand } from 'd3-scale';
  
  const currencyFormat = format("($,");
  const parseTime = timeParse('%Y-%m-%d');
  const monthYearFormat = timeFormat('%B %Y');

  $: innerWidth = width - margin.left - margin.right;
  $: innerHeight = height - margin.top - margin.bottom;
  
  $: maxPrice = Math.max(...data[metricKey].map(d => {
    return d[1];
  }));
  
  $: dateRange = data[metricKey].map(d => {
    return d[0];
  }).reverse();

  $: xScale = scaleBand()
    .domain(dateRange)
    .range([margin.left, innerWidth]);

  $: bandWidth = xScale.bandwidth();

  $: yScale = scaleLinear()
    .domain([0, maxPrice])
    .range([innerHeight, margin.top]);
  
  $: yearLabels = dateRange.filter(d => d.substring(5, 7) === '07');
  $: yearTicks = dateRange.filter(d => d.substring(5, 7) === '01');
  console.log(latest)
</script>

{#if xScale}
  <div class="container-barChart">
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

  svg {
    overflow: visible;

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
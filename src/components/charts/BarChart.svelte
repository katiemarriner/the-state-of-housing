<script>
  export let width, height, margin, data, metricKey, color, formatType, showAnnotation;

  import { format } from 'd3-format';
  import { timeParse, timeFormat } from 'd3-time-format';
  import { scaleLinear, scaleBand } from 'd3-scale';
  import { line } from 'd3-shape';

  import helpers from '../../lib/js/helpers';
  
  import XAxis from './XAxis.svelte';

  formatType = formatType || 'currency';
  margin = margin || {
    top: 25,
    right: 0,
    bottom: 15,
    left: 0
  };

  const formats = {
    currency: format("$,"),
    number: format(",")
  };

  const parseTime = timeParse('%Y-%m-%d');
  const monthYearFormat = timeFormat('%B %Y');

  $: innerWidth = width - margin.left - margin.right;
  $: innerHeight = height - margin.top - margin.bottom;

  let dataSorted = helpers.sortByDate(data[metricKey]);
  let dataSortedRolling = helpers.sortByDate(data[`${metricKey}_rolling`]);

  $: latest = dataSorted[0];
  
  dataSorted = dataSorted.filter(d => {
    return d[0] > '2019-01-01'
  });

  dataSortedRolling = dataSortedRolling.filter(d => {
    return d[0] > '2019-01-01';
  });

  $: maxPrice = Math.max(...dataSorted.map(d => {
    return d[1];
  }));
  
  $: dateRange = dataSorted.map(d => {
    return d[0];
  }).reverse();

  $: xScale = scaleBand()
    .domain(dateRange)
    .range([margin.left, innerWidth]);

  $: bandWidth = xScale.bandwidth();

  $: yScale = scaleLinear()
    .domain([0, maxPrice])
    .range([innerHeight, margin.top]);
  
  $: movingLine = line()
    .x(d => xScale(d[0]))
    .y(d =>  yScale(d[1]));
  
  $: yearLabels = dateRange.filter(d => d.substring(5, 7) === '07');
  $: yearTicks = dateRange.filter(d => d.substring(5, 7) === '01');

  $: console.log(latest);
</script>

{#if xScale}
  <div class="container-barChart">
    <div class="container-legend">
      <div class="legend-line line-{color}"></div>
      <div class="legend-label">12-month moving average</div>
    </div>
    <svg { width } { height } >
      <g class="g-bars">
        {#each dataSorted as d, i}
          <rect
            x={xScale(d[0])}
            width={bandWidth}
            height={innerHeight - yScale(d[1])}
            y={yScale(d[1])}
            class="{i === 0 ? `dark-${color}` : color }"
          />
        {/each}
      </g>
      <g class="g-line" transform="translate({bandWidth / 2}, 0)">
        <path d={movingLine(dataSortedRolling)} class="line-{color}"/>
      </g>
      {#if showAnnotation}
        <g 
          class="g-annotations"
          transform="translate({xScale(latest[0]) + (bandWidth/2)}, {margin.top})">
          <line x1="0" x2="0" y1="5" y2="{ yScale(latest[1]) - margin.top }"/>
          <text y="{-margin.top / 2}">{ monthYearFormat(parseTime(latest[0])) }</text>
          <text y="0">{ formats[formatType](latest[1]) }</text>
        </g>
      {/if}
      <XAxis xScale={xScale} { yearLabels } { margin } { yearTicks } { innerHeight }/>
      <g class="y-axis g-axis">

      </g>
    </svg>
  </div>
  {/if}

<style lang="scss">
  @use './../../lib/style/variables';

  .container-legend {
    display: flex;
    max-width: 200px;
    height: 0px;
    align-items: center;

    .legend-label {
      font-size: 12px;
      margin-left: 5px;
    }

    .legend-line {
      width: 20px;
    }

    .line-purple {
      border-bottom: 2px solid variables.$purple;
    }

    .line-orange {
      border-bottom: 2px solid variables.$orange;
    }
  }

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
      stroke: #fff;
      stroke-width: 3px;

      @media (max-width: 550px) {
        stroke-width: 0.5px;
      }

      &.purple {
        fill: variables.$purple-light;
      }

      &.orange {
        fill: variables.$orange-light;
      }

      &.dark-purple {
        fill: variables.$purple;
      }

      &.dark-orange {
        fill: variables.$orange;
      }
    }

    .g-line path {
      stroke-width: 2px;
      fill: none;

      &.line-purple {
        stroke: variables.$purple;
      }

      &.line-orange {
        stroke: variables.$orange;
      }
    }
  }

  .container-barChart {
    max-width: 500px;
  }
</style>
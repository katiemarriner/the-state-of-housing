<script>
  export let width,
    height,
    margin,
    data,
    metricKey,
    color,
    formatType,
    showAnnotation;

  import { fade } from "svelte/transition";

  import { scaleLinear, scaleBand } from "d3-scale";
  import { range } from "d3-array";
  import { line } from "d3-shape";

  import XAxis from "./XAxis.svelte";

  import helpers from "../../lib/js/helpers";

  const { time, formats } = helpers;

  formatType = formatType || "currency";
  margin = margin || {
    top: 25,
    right: 0,
    bottom: 15,
    left: 0,
  };

  $: innerWidth = width - margin.left - margin.right;
  $: innerHeight = height - margin.top - margin.bottom;

  let dataSorted = helpers.sortByDate(data[metricKey], "0");
  let dataSortedRolling = helpers.sortByDate(data[`${metricKey}_rolling`], "0");

  $: latest = JSON.parse(JSON.stringify(dataSorted))[dataSorted.length - 1];

  dataSorted = dataSorted.filter((d) => {
    return d[0] >= "2019-01-01";
  });

  dataSortedRolling = dataSortedRolling.filter((d) => {
    return d[0] >= "2019-01-01";
  });

  $: maxPrice = Math.max(
    ...dataSorted.map((d) => {
      return d[1];
    }),
  );

  $: dateRange = JSON.parse(JSON.stringify(dataSorted)).map((d) => {
    return d[0];
  });

  $: xScale = scaleBand().domain(dateRange).range([margin.left, innerWidth]);

  $: bandWidth = xScale.bandwidth();

  $: yScale = scaleLinear()
    .domain([0, maxPrice])
    .range([innerHeight, margin.top]);

  $: movingLine = line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));

  $: yearLabels = dateRange.filter((d) => d.substring(5, 7) === "07");
  $: yearTicks = dateRange.filter((d) => d.substring(5, 7) === "01");

  $: annotations = [latest];

  $: years = range(
    dateRange[0].substring(0, 4),
    dateRange[dateRange.length - 1].substring(0, 4) + 1,
  );
  function showHoverValues(value) {
    const hoverMonth = value[0].substring(5, 7);
    annotations = [];
    annotations = years
      .map((year) => {
        return dataSorted.find((d) => d[0] === `${year}-${hoverMonth}-01`);
      })
      .filter((d) => d !== undefined);
  }
</script>

{#if xScale}
  <div class="container-barChart">
    {#if annotations.length <= 1}
      <div class="container-legend">
        <div class="legend-line line-{color}"></div>
        <div class="legend-label">12-month moving average</div>
      </div>
    {/if}
    <svg {width} {height}>
      <g class="g-bars">
        {#each dataSorted as d, i}
          <rect
            x={xScale(d[0])}
            width={bandWidth}
            height={innerHeight - yScale(d[1])}
            y={yScale(d[1])}
            class={annotations.map((a) => a[0]).indexOf(d[0]) > -1
              ? `dark-${color}`
              : color}
            onmouseenter={() => showHoverValues(d)}
            onmouseout={() => (annotations = [latest])}
            onblur={() => (annotations = [latest])}
            role="tooltip"
          />
        {/each}
      </g>
      <g class="g-line" transform="translate({bandWidth / 2}, 0)">
        <path d={movingLine(dataSortedRolling)} class="line-{color}" />
      </g>
      {#each annotations as annotation, index}
        {#if showAnnotation}
          <g
            class="g-annotations"
            transform="translate({xScale(annotation[0]) +
              bandWidth / 2}, {margin.top})"
          >
            <rect x="-25" y="-24" width="50" height="24" style="fill:#fff;" />
            <line
              x1="0"
              x2="0"
              y1="5"
              y2={yScale(annotation[1]) - margin.top}
            />
            <text y={-margin.top / 2}>
              {index === annotations.length - 1
                ? time.monthYearFormat(time.parseTime(annotation[0]))
                : time.yearFormat(time.parseTime(annotation[0]))}
            </text>
            <text y="0">{formats[formatType](annotation[1])}</text>
          </g>
        {/if}
      {/each}
      <XAxis {xScale} {yearLabels} {margin} {yearTicks} {innerHeight} />
      <g class="y-axis g-axis"></g>
    </svg>
  </div>
{/if}

<style lang="scss">
  @use "./../../lib/style/variables";

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
      font-size: 10px;
      text-anchor: middle;
    }

    .g-bars rect {
      cursor: crosshair;
      stroke: #fff;
      stroke-width: 1.5px;

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

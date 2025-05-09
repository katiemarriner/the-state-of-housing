<script>
  export let xScale, yearLabels, margin, yearTicks, innerHeight;
</script>

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

<style lang="scss">
  line {
    stroke: #333;
    stroke-width: 0.5px;
  }

  text {
    font-size: 12px;
    text-anchor: middle;
  }

  .g-axis {
    color: #333;
    font-size: 11px;
  }
</style>
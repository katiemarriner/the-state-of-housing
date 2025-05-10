<script>
  export let label, active, direction;
</script>

<div class="flex { label === 'County' ? 'name' : '' }">
  <span>{ label }</span>
  <div class="arrows-dir">
    <span class="arrow arrow-up {active && direction === 'asc' ? 'active' : ''}"></span>
    <span class="arrow arrow-down {active && direction === 'desc' ? 'active' : ''}"></span>
  </div>
</div>

<style lang="scss">
  @use "./../../lib/style/variables";
  
  .flex {
    display: flex;
    align-items: center;
    justify-content: end;

    &.name {
      justify-content: start;
    }
  }

  span {
    text-transform: uppercase; 
    font-size: 12px;
    font-weight: 600;
  }

  .arrow {
    display: inline-block;
    width: 0; 
    height: 0; 
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  }

  .arrows-dir {
    margin-left: 3px;
    .arrow-up, .arrow-down {
      display: block;
      margin-top: 1px;
    }
  }

  .arrow-up {
    border-bottom: 6px solid variables.$gray-grid;

    &.active {
      border-bottom: 6px solid variables.$gray-dark;
    }
  }

  .arrow-down {
    border-top: 6px solid variables.$gray-grid;

    &.active {
      border-top: 6px solid variables.$gray-dark;
    }
  }
</style>
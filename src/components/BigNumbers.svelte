<script>
  export let data, metricKey, label, width, formatType, color;

  import { format } from 'd3-format';
  import { timeParse, timeFormat } from 'd3-time-format';

  formatType = formatType || 'currency';

  const formats = {
    currency: format("$,"),
    number: format(","),
    percent: format(".2%")
  }

  const parseTime = timeParse('%Y-%m-%d');
  const monthYearFormat = timeFormat('%B %Y');

  data[metricKey].reverse();

  $: latest = data[metricKey][0];
  $: yearAgo = data[metricKey][11];
  $: changeYoY = (latest[1] - yearAgo[1]) / latest[1];
</script>

<h2 class="label">{ label }</h2>
<div class="container-bigNumbers" style="width:{width}px;">
  <div class="container-label">
    <div class="bigNumber currency {color}">{formats[formatType](latest[1])}</div>
    <div class="label">{ label } {monthYearFormat(parseTime(latest[0]))}</div>
  </div>
  <div class="container-label">
    <div class="mediumNumber change {changeYoY > 0 ? 'positive' : changeYoY < 0 ? 'negative' : 'zero'}">
      <span class="{changeYoY > 0 ? 'arrow-up' : changeYoY < 0 ? 'arrow-down' : ''}"></span>
      { formats.percent(Math.abs(changeYoY)) }
    </div>
    <div class="label">From previous year</div>
  </div>
</div>

<style lang="scss">
  @use './../lib/style/variables';

  .label {
    margin-bottom: 5px;
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

    .purple {
      color: variables.$purple;
    }

    .orange {
      color: variables.$orange;
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
</style>
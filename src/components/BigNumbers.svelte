<script>
  export let data, metricKey, label, labelSub, formatType, color, positiveValue, negativeValue, latestDate;

  import helpers from './../lib/js/helpers';

  formatType = formatType || 'currency';
  positiveValue = positiveValue || 'positive';
  negativeValue = negativeValue || 'negative';
  
  const { formats, time } = helpers;

  $: latest = data[metricKey];
  $: changeYoY = data[`${metricKey}_yoy`];
  $: latestDate = data['latest_month'] ? data['latest_month']
    : data['month_date'];

  console.log(data);
</script>

<h3>{ label }</h3>
<div class="container-bigNumbers">
  <div class="container-label">
    <div class="bigNumber currency {color}">{formats[formatType](latest)}</div>
    <div class="label">{ labelSub } {time.monthYearFormat(time.parseTime(latestDate))}</div>
  </div>
  <div class="container-label">
    <div class="mediumNumber change {changeYoY > 0 ? positiveValue : changeYoY < 0 ? negativeValue : ''}">
      <span class="{changeYoY > 0 ? 'arrow-up' : changeYoY < 0 ? 'arrow-down' : ''}"></span>
      { formats.percent(Math.abs(changeYoY)) }
    </div>
    <div class="label">From previous year</div>
  </div>
</div>

<style lang="scss">
  @use './../lib/style/variables';

  h3 {
    margin: 5px 0;
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
      font-weight: 400;
      letter-spacing: 0.5px;
      margin-top: 0;
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

    .negative {
      color: variables.$pink-text;
    }

    .positive {
      color: variables.$green-text;
    }
  }

  .arrow-up {
    display: inline-block;
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 8px solid variables.$green;
  }

  .negative > .arrow-up {
    border-bottom: 8px solid variables.$pink;
  }

  .arrow-down {
    display: inline-block;
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 8px solid variables.$pink;
  }

  .positive > .arrow-down {
    border-top: 8px solid variables.$green;
  }
</style>
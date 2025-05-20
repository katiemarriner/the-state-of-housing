import { format } from 'd3-format';
import { timeParse, timeFormat } from 'd3-time-format';

const helpers = {
  formats: {
    percent: format('.2%'),
    currency: format('($,.0f'),
    number: format(',.0f')
  },
  time: {
    parseTime: timeParse('%Y-%m-%d'),
    monthYearFormat: timeFormat('%B %Y')
  },
  sortByDate: (data, key='month_date') => {
    return data.sort((a, b) => {
      return helpers.time.parseTime(a[key]) - helpers.time.parseTime(b[key])
    });
  },
  arrows: {
    classes: (value, up='positive') => {
      let down = 'negative';
      if(up === 'negative') {
        down = 'positive';
      }
      return `arrow ${ value > 0 ? `arrow-up-${up}` : value < 0 ? `arrow-down-${down}` : 'arrow-zero'}`;
    }
  }
}

export default helpers;
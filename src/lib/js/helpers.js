import { format } from 'd3-format';
import { timeParse, timeFormat } from 'd3-time-format';

const helpers = {
  formats: {
    percent: format('.2%'),
    currency: format('($,.0f'),
    number: format(',')
  },
  time: {
    parseTime: timeParse('%Y-%m-%d'),
    monthYearFormat: timeFormat('%B %Y')
  }
}

export default helpers;
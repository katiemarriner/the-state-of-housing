import io from 'indian-ocean';
import _ from 'underscore';

const data = io.readDataSync('RDC_Inventory_Core_Metrics_County_History.csv');

let meta = _.unique(data, 'county_fips');
meta = meta.map(d => {
  return {
    county_fips: d.county_fips,
    county_name: d.county_name
  }
});

function formatDate(date_) {
  return `${date_.substring(0, 4)}-${date_.substring(4, 6)}-01`;
};

const max = Number(data[0].month_date_yyyymm);
const twoYears = max - 200;

const medianPriceTimeseries = data.filter(d => {
    return Number(d.month_date_yyyymm) >= twoYears;
  }).map(d => {
    return {
      county_fips: d.county_fips,
      median_listing_price: d.median_listing_price,
      month_date_yyyymm: formatDate(d.month_date_yyyymm)
    }
  });

const combined = _.indexBy(meta.map(d => {
  return {
    county_fips: d.county_fips,
    county_name: d.county_name, 
    timeseries: medianPriceTimeseries.filter(month_ => month_.county_fips === d.county_fips)
  }
}), 'county_fips');

Object.keys(combined).forEach(key => {
  io.writeDataSync(`../public/data/counties/${key}.json`, combined[key]);
});

io.writeDataSync('../public/data/fips.json', Object.keys(combined));
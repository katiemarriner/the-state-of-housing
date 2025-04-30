# The State of Housing in the United States

An interactive dashboard that shows median home prices, inventory and sales over time by county.

## T/k
- [] Working search bar
- [] 12-month moving average for median home prices
- [] Comparison with national average metrics
- [] Chart for inventory (YoY with 12-month moving average)
- [] Chart for home sales (YoY with 12-month moving average)
- [] Weekly national report (median home prices, inventory, home sales)

## How to format data
1. Download data from [Realtor.com](https://www.realtor.com/research/data/). Monthly inventory -> Historical data -> County. And Weekly inventory -> National (View US Data)
2. `cd tasks/`
3. `node format-realtor-data.js`
  - This saves a main file with a list of fips/county names in `public/data/fips.json`
  - and a JSON file for each county named by fips code in `public/data/counties/`

## How to run

### Dev
`npm run dev`

### Build
`npm run build`

### Deploy to GitHub pages
`npm run deploy`

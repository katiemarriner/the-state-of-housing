# The State of Housing in the United States

An interactive dashboard that shows median home prices, inventory and sales over time by county.

## T/k
- [X] Mobile view of the table
- [ ] Comparison with national average metrics on county pages
- [ ] Comparison with state-level metrics
- [ ] On hover of the bar chart show that month of every year
- [ ] Table inside each county page that shows counties in the state and counties with similar populations
- [ ] Weekly report for national-level
- [X] Working search bar
- [X] Reconcile new Connecticut county-equivalents to counties
- [X] 12-month moving average for median home prices
- [X] Chart for inventory (YoY with 12-month moving average)
- [X] Create a list of most expensive median home prices
- [X] Paginate table on the main page and make it sortable
- [X] Monthly national report (median home prices, inventory, home sales)
- [X] Buttons to filter by county size

## How to format data
1. Download data from [Realtor.com](https://www.realtor.com/research/data/). Monthly inventory -> Historical data -> County. And Weekly inventory -> National (View US Data)
2. `cd tasks/`
3. Make sure you have pipenv installed
4. `pipenv install`
5. `pipenv shell`
6. `jupyter lab`
7. Run the Jupyter Notebook

## How to run

### Dev
`npm run dev`

### Build
`npm run build`

### Deploy to GitHub pages
`npm run deploy`

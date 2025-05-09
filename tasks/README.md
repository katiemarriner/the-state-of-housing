# Data guide for The State of Housing App

## Sources
- [County and national data on median listing price and inventory from Realtor.com](https://www.realtor.com/research/data/)
- [Population for 2024 from the US Census](https://www.census.gov/data/tables/time-series/demo/popest/2020s-counties-total.html)
  - Download the file: "Annual Resident Population Estimates, Estimated Components of Resident Population Change, and Rates of the Components of Resident Population Change for States and Counties: April 1, 2020 to July 1, 2024 (CO-EST2024-ALLDATA) [< 1.0 MB]"

## How to run the Jupyter Notebook
1. Install [pipenv](https://pipenv.pypa.io/en/latest/) or use your virtual environment of choice.
2. Run `jupyter lab` to open up the notebooks.
3. Run `format-realtor-data.ipynb` to save the following
  1. Meta data with `county_fips` and `county_name` keys
  2. A json file in `public/data/county/` for each county fips in the analysis
  3. A json file `public/data/national.json` for national data
  4. A json file `public/data/latest.json` for the latest 
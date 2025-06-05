# The State of Housing in America 🏠

An interactive data dashboard, visualizing housing prices and inventory across U.S. counties.

[Live Demo 🌐](https://katiemarriner.com/the-state-of-housing/)

#### Filter by county size and state. Sort by metric
<img src="https://github.com/user-attachments/assets/b76106db-56a8-4c33-937a-b5d0c67562ba" width="500">

#### Search for your county
<img src="https://github.com/user-attachments/assets/c7b6ac4b-4d44-40c8-87ea-83f42b6e8e5d" width="500">

## Latest Updates
#### June 5, 2025
- Added hover state to the bar charts in order to see exact values for the same month to compare year-over-year
#### May 20, 2025
- Added a new table view on county pages to show counties of similar size based on the number of households
- Started to centralize data across the application to improve state management
- Improved the appearance of active states on the table for sorting, filtering and data comparisons

## Tech Stack 💻
- Frontend: Vanilla JS, D3.js, Svelte 
- Backend: Python, pandas, Jupyter Lab (for data formatting)

## Data Sources 📈
- [Realtor.com](https://www.realtor.com/research/data/) for median listing price, active listing count and median days on market
  - Monthly inventory -> Historical data -> County. And Weekly inventory -> National (View US Data)
- U.S. Census for population

## Features to add 📋
[See the project board for features t/k](https://github.com/users/katiemarriner/projects/1/views/1)

## How to format the data
1. Download three csv files from [Realtor.com](https://www.realtor.com/research/data/) into `tasks/data`. Don't change the name of the file.
    1. Monthly inventory -> Historical data -> County
    2. Monthly inventory -> Historial data -> National
    3. Weekly inventory -> National (View US Data)
3. `cd tasks/`
4. [Make sure you have pipenv installed](https://pipenv.pypa.io/en/latest/)
5. `pipenv install`
6. `pipenv shell`
7. `jupyter lab`
8. Run the Jupyter Notebook

## How to run the app locally and deploy

### Dev
`npm run dev`

### Build
`npm run build`

### Deploy to GitHub pages
`npm run deploy`

## Author
Katie Marriner · [katiemarriner.com](https://katiemarriner.com)

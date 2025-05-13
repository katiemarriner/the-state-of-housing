# The State of Housing in America 🏠

An interactive data dashboard, visualizing housing prices and inventory across U.S. counties.

[Live Demo 🌐](http://katiemarriner.com/state-of-housing/)

#### Filter by county size and state. Sort by metric
<img src="https://github.com/user-attachments/assets/b76106db-56a8-4c33-937a-b5d0c67562ba" width="500">

#### Search for your county
<img src="https://github.com/user-attachments/assets/c7b6ac4b-4d44-40c8-87ea-83f42b6e8e5d" width="500">

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
1. Download data from [Realtor.com](https://www.realtor.com/research/data/). Monthly inventory -> Historical data -> County. And Weekly inventory -> National (View US Data)
2. `cd tasks/`
3. Make sure you have pipenv installed
4. `pipenv install`
5. `pipenv shell`
6. `jupyter lab`
7. Run the Jupyter Notebook

## How to run the app locally and deploy

### Dev
`npm run dev`

### Build
`npm run build`

### Deploy to GitHub pages
`npm run deploy`

## Author
Katie Marriner · [katiemarriner.com](https://katiemarriner.com)

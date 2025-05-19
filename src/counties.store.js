import { writable, derived } from 'svelte/store';

const url = import.meta.env.BASE_URL;

// set up a property for all shared data across all routes
export const dataStoreCommon = writable({
  // historical means there is timeseries data but for only one entity within the universe (i.e. one county, country, one state)
  historicalNational: null,
  // latest means only the latest month is available but for the entire universe
  latestCounties: null,
  // county names and fips
  metaCounties: null,
  // state name and fips
  metaStates: null,
  loading: false,
  error: null
});

// historical/complete data specific to county-level/state-level pages
export const dataStorePage = writable({
  currentRoute: null,
  dataCounty: null,
  loading: false,
  error: null
});

// load all shared data files on load and store in localStorage
export async function loadCommonData() {
  try {
    dataStoreCommon.update(state => ({
      ...state,
      loading: true,
      error: true
    }));

    // this is where the magic happens
    const [historicalNational, latestCounties, metaCounties, metaStates] = await Promise.all([
      fetch(`${url}/data/national.json`).then(res => res.json()),
      fetch(`${url}/data/latest.json`).then(res => res.json()),
      fetch(`${url}/data/county_fips.json`).then(res => res.json()),
      fetch(`${url}/data/state_fips.json`).then(res => res.json())
    ]);

    dataStoreCommon.set({
      historicalNational, latestCounties, metaCounties, metaStates,
      loading: false,
      error: null
    });

    // local storage
    try {
      localStorage.setItem('common-data-cache', JSON.stringify({ historicalNational, latestCounties, metaCounties, metaStates}));
      localStorage.setItem('common-data-timestamp', Date.now().toString());
    } catch(error) {
      console.warn('Failed to cache common data:', error);
    }

  } catch (error) {
    console.error('Error loading common data:', error);
    dataStoreCommon.update(state => ({
      ...state,
      loading: false,
      error: error.message || 'Failed to load common data'
    }));
    throw error;
  }
};

// load route-specific data file
export async function loadPageData(routeID) {
  try {
    dataStorePage.update(state => ({
      ...state,
      currentRoute: routeID,
      loading: true,
      error: null
    }));

    // const [ dataState, dataCounty ] = await Promise.all(
    //   [
    //     fetch(`${url}/data/states/${routeID.substring(0, 2)}.json`).then(res => res.json()),
    //     fetch(`${url}/data/counties/${routeID}.json`).then(res => res.json())
    //   ]
    // )

    const dataCounty = await fetch(`${url}/data/counties/${routeID}.json`).then(res => res.json());

    dataStorePage.update(state => ({
      ...state,
      dataCounty,
      loading: false,
    }));

    return dataCounty;
  } catch(error) {
    console.error('Error loading', routeID);
    dataStorePage.update(state => ({
      ...state,
      loading: false,
      error: error
    }));
    throw error;
  }
};

export function initializeSharedData() {
  try {
    const cachedTimestamp = localStorage.getItem('common-data-timestamp');
    const maxAge = 60 + 60 * 1000;
    if(cachedTimestamp && Date.now() - parseInt(cachedTimestamp) < maxAge) {
      const cachedData = JSON.parse(localStorage.getItem('common-data-cache'));
      if(cachedData) {
        dataStoreCommon.set({
          ...cachedData,
          loading: false,
          error: null,
        });
        return Promise.resolve(cachedData);
      }
    }
  } catch (error) {
    console.warn('Failed to load cached common data:', error);
  }

  // if data is too old or fails to load from local storage;
  return loadCommonData();
};

export const dataStoreCombined = derived(
  [dataStoreCommon, dataStorePage],
  ([$dataCommon, $dataPage]) => {
    return {
      shared: $dataCommon,
      route: $dataPage,
      loading: $dataCommon.loading || $dataPage.loading,
      hasError: $dataCommon.error || $dataPage.loading
    }
  }
);

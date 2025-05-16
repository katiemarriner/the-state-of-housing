import { writable, derived } from 'svelte/store';

export const dataStore = writable({meta: null, national: null, state: null, latest: null});

const url = import.meta.env.BASE_URL;
export async function loadMeta () {
  const res = await Promise.all([`${url}/data/county_fips.json`, `${url}/data/state_fips.json`].map(url2 => {
    return fetch(url2);
  }));
  const counties = await res[0].json();
  const states = await res[1].json()
  dataStore.update(store => ({
    ...store,
    meta: {
      states,
      counties
    }
  }))
}

export async function loadNationalData() {
  const res = await fetch(`${url}/data/national.json`);
  const json = await res.json();
  dataStore.update(store => ({
    ...store,
    national: json
  }))
}

export async function loadLatestData() {
  const res = await fetch(`${url}/data/latest.json`);
  const json = await res.json();

  dataStore.update(store => ({
    ...store,
    latest: json
  }));
}

export async function loadStateData(fips) {
  const urls = [`${url}/data/latest.json`, `${url}/data/state_fips.json`];
  const res = await Promise.all(urls.map(url2 => {
    return fetch(url2);
  }));
  let latest = await res[0].json();
  let stateMeta = await res[1].json();
  const data = latest.filter(d => {
    return d['county_fips'].substring(0, 2) === fips;
  });
  dataStore.update(store => ({
    ...store,
    state: {
      data,
      ...stateMeta.find(d => d.fips === fips.substring(0, 2))
    }
  }))
}

export function resetData() {
  dataStore.set({ national: null, meta: null, state: null, latest: null });
}

export const dataNational = derived(dataStore, $dataStore => $dataStore.national);
export const dataState = derived(dataStore, $dataStore => $dataStore.state);
export const dataMeta = derived(dataStore, $dataStore => $dataStore.meta);
export const dataLatest = derived(dataStore, $dataStore => $dataStore.latest);

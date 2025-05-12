import { writable, derived } from 'svelte/store';

export const dataStore = writable({meta: null, national: null, state: null});

const url = import.meta.env.BASE_URL;
export async function loadData () {
  const res = await fetch(`${url}/data/fips.json`);
  const json = await res.json();
  dataStore.update(store => ({
    ...store,
    meta: json
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

export async function loadStateData(fips) {
  const urls = [`${url}/data/latest.json`, `${url}/data/states.json`]
  const res = await Promise.all(urls.map(url2 => {
    return fetch(url2);
  }));
  let latest = await res[0].json();
  let stateMeta = await res[1].json();
  const data = latest['data'].filter(d => {
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
  dataStore.set({ national: null, meta: null, state: null });
}

export const dataNational = derived(dataStore, $dataStore => $dataStore.national);
export const dataState = derived(dataStore, $dataStore => $dataStore.state);
export const dataMeta = derived(dataStore, $dataStore => $dataStore.meta);
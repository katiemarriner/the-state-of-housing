import { writable } from 'svelte/store';

export const dataStore = writable({meta: null, national: null, state: null});

const url = import.meta.env.BASE_URL;
export async function loadData () {
  const res = await fetch(`${url}/public/data/fips.json`);
  const json = await res.json();
  dataStore.update(state => ({
    ...state,
    meta: json
  }))
}

export async function loadNationalData() {
  const res = await fetch(`${url}/public/data/national.json`);
  const json = await res.json();
  dataStore.update(state => ({
    ...state,
    national: json
  }))
}

export async function loadStateData(fips) {
  const res = await fetch(`${url}/public/data/latest.json`);
  let json = await res.json();
  const data = json['data'].filter(d => {
    return d['county_fips'].substring(0, 2) === fips;
  });
  dataStore.update(state => ({
    ...state,
    state: data
  }))
}

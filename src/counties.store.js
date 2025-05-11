import { writable } from 'svelte/store';

export const dataStore = writable(null);

const url = import.meta.env.BASE_URL;
export async function loadData () {
  const res = await fetch(`${url}/public/data/fips.json`);
  const json = await res.json();
  dataStore.set(json);
}

export async function loadNationalData() {
  const res = await fetch(`${url}/public/data/national.json`);
  const json = await res.json();
  dataStore.set(json);
}

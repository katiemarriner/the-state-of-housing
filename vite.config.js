import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte';
import json from '@rollup/plugin-json';
import { sveltePreprocess } from 'svelte-preprocess';

// https://vite.dev/config/
export default defineConfig({
  base: '/the-state-of-housing',
  plugins: [svelte(), json()],
  preprocess: sveltePreprocess()
});

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte';
import json from '@rollup/plugin-json';

// https://vite.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    svelte(),
    json({
      compact: true
    })
  ],
})

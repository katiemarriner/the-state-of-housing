import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte';
import json from '@rollup/plugin-json';


const dev = import.meta.env.DEV;

// https://vite.dev/config/
export default defineConfig({
  base: dev ? '' : '/the-state-of-housing',
  plugins: [
    svelte(),
    json({
      compact: true
    })
  ],
})

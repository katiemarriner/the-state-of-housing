import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte';
import json from '@rollup/plugin-json';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve'; // 'serve' for dev, 'build' for prod

  return {
    base: isDev ? '/' : '/the-state-of-housing',
    plugins: [svelte(), json()],
  };
});

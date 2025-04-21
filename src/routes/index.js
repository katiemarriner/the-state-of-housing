import Home from './Home.svelte';
import County from './County.svelte';

export default {
  '/': Home,
  '/county/:id': County 
};
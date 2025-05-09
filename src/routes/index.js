import National from './National.svelte';
import County from './County.svelte';

export default {
  '/': National,
  '/county/:id': County 
};
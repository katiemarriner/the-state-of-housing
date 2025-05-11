import National from './National.svelte';
import State from './State.svelte';
import County from './County.svelte';

export default {
  '/': National,
  '/county/:id': County,
  '/state/:id': State,
};
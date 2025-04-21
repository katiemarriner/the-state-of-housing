<script>
  import { onMount } from 'svelte';

  const url = import.meta.env.BASE_URL;
  let fips;
  onMount(async() => {
    const res = await fetch(`${url}/data/fips.json`);
    fips = await res.json();
  })

  $: console.log(fips)
</script>

<h1>The State of the American Housing Market</h1>
<form>
  <input type="search" placeholder="Search for your county will be here" />
</form>

<ul>
  {#each fips as fip}
    <li><a href="#/county/{fip}">{fip}</a></li>
  {/each}
</ul>
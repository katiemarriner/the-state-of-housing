<script>
  import Router from 'svelte-spa-router';
  import routes from './routes';
  import { onMount } from 'svelte';
  import { location } from 'svelte-spa-router';

  import { initializeSharedData } from './counties.store';

  import NationalBanner from './components/NationalBanner.svelte';

  onMount(async () => {
    try {
      await initializeSharedData();
    } catch(error) {
      console.error('Initialization error in App.svelte:', error);
    }
  });
</script>

<div class="project-wrapper">
  <nav>
    <NationalBanner />
    <h1>The State of the American Housing Market</h1>
    <p>Track national trends and drill down to your own county to see how home prices and availability compare. On each county page you'll find a table that shows how your county compares to the other counties in that state, plus counties with similar populations.</p>
    {#if $location !== '/'}
      <a href="#/"><button>Back to national page</button></a>
    {/if}
  </nav>

  <main>
    <Router { routes } />
  </main>

  <footer>
    <p>Source: <a href="https://www.realtor.com/research/data/">Realtor.com</a>, American Community Survey 5-Year Estimates (2023)</p>
    <p>Notes: Counties with smaller levels of active inventory will have extreme changes in inventory due to a small denominator. The universe may be changed as more analysis is done. That will be noted here and in updates on GitHub</p>
  </footer>
  </div>

<style lang="scss">
  @use './lib/style/variables';
  h1 {
    font-size: 40px;
    margin: 0;
  }

  .project-wrapper {
    max-width: 1024px;
    margin: auto
  }

  footer p {
    font-size: 14px;
  }
</style>

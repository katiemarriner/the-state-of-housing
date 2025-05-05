<script>
  import Router from 'svelte-spa-router';
  import routes from './routes';
  import { location } from 'svelte-spa-router'
  
  console.log($location);
</script>

<nav>
  <h1>The State of the American Housing Market</h1>
  {#if $location !== '/'}
    <a href="#/"><button>Back to list</button></a>
  {/if}
</nav>

<main>
  <Router {routes} />
</main>

<footer>
  <p>Source: <a href="https://www.realtor.com/research/data/">Realtor.com</a></p>
  <p>Notes: Counties with 10 or fewer active listings for at least one month in the past six years excluded.</p>
</footer>

<style lang="scss">
  @use './lib/style/variables';

  a button {
    color: #333;
    cursor: pointer;
    font-family: "Lekton" monospace;
    text-decoration: none;
  }
  
  button {
    background-color: #fff;
    border-radius: 0;
    border: 1px solid #333;
    box-shadow: none;
    cursor: pointer;
    padding: 10px;
  }

  footer {
    font-size: 14px;
  }
</style>

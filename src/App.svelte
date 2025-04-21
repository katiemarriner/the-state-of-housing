<script>
  import Router from 'svelte-spa-router';
  import routes from './routes';
</script>

<nav>
  <a href="#/">Home</a>
  <a href="#/county">County</a>
</nav>

<main>
  <Router {routes} />
</main>

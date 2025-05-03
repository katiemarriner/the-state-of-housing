<script>
  import Router from 'svelte-spa-router';
  import routes from './routes';
</script>

<nav>
  <a href="#/"><button>Back to list</button></a>
</nav>

<main>
  <Router {routes} />
</main>

<style lang="scss">
  @use './lib/style/variables';

  a {
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
</style>

<script>
  import countiesData from  '../counties.store.js';
  
  let counties
  countiesData.subscribe(items => counties = items);
  
  let inputValue;
  let filteredCounties;
  const filterCounties = () => {
    filteredCounties = counties.filter(county => {
      return county.county_name.startsWith(inputValue);
    });
  }

  $: console.log(filteredCounties);
</script>

<h1>The State of the American Housing Market</h1>
<form autocomplete="off">
  <div class="autocomplete" style="width:300px;">
    <input id="county-search-input" type="text" name="county-search" bind:value={inputValue} placeholder="Search for a county" on:input={filterCounties}>
  </div>
  <input type="submit">
</form>

<ul>
  {#each counties as county}
    <a href="#/county/{county.county_fips}"><li>{county.county_name}</li></a>
  {/each}
</ul>

<style lang="scss">
  * { box-sizing: border-box; }
  body {
    font: 16px Arial;
  }
  .autocomplete {
    /*the container must be positioned relative:*/
    position: relative;
    display: inline-block;
  }
  input {
    border: 1px solid transparent;
    background-color: #f1f1f1;
    padding: 10px;
    font-size: 16px;
  }
  input[type=text] {
    background-color: #f1f1f1;
    width: 100%;
  }
  input[type=submit] {
    background-color: DodgerBlue;
    color: #fff;
  }
  .autocomplete-items {
    position: absolute;
    border: 1px solid #d4d4d4;
    border-bottom: none;
    border-top: none;
    z-index: 99;
    /*position the autocomplete items to be the same width as the container:*/
    top: 100%;
    left: 0;
    right: 0;
  }
  .autocomplete-items div {
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
  }
  .autocomplete-items div:hover {
    /*when hovering an item:*/
    background-color: #e9e9e9;
  }
  .autocomplete-active {
    /*when navigating through the items using the arrow keys:*/
    background-color: DodgerBlue !important;
    color: #ffffff;
  }
</style>
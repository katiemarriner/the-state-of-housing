<script>
  export let countiesMeta, widthxz;

  const makeMatchBold = (obj, key) => {
	// replace part of (country name === inputValue) with strong tags
    let matched = obj[key].substring(0, inputValue.length);
    let makeBold = `<strong>${matched}</strong>`;
    let boldedMatch = obj[key].replace(matched, makeBold);
    return {...obj, boldedMatch };
  }
  
  let counties
  countiesMeta.subscribe(items => counties = items);
  
  let inputValue;
  let filteredCounties;
  const filterCounties = () => {
	let storageArr = []
	if (inputValue) {
		counties.forEach(county => {
			if (county.county_name.toLowerCase().startsWith(inputValue.toLowerCase())) {
				storageArr = [...storageArr, makeMatchBold(county, 'county_name')];
			}
		});
	}
	filteredCounties = storageArr;
}	

  $: console.log(filteredCounties);
</script>

<form autocomplete="off">
  <div class="autocomplete">
    <input id="county-search-input" type="text" name="county-search" bind:value={inputValue} placeholder="Search for a county" on:input={filterCounties}>
  </div>
</form>
<ul id="autocomplete-items-list">
  {#each filteredCounties as county}
    <a href="#/county/{county.county_fips}"><li class="autocomplete-items">{@html county.county_name}</li></a>
  {/each}
</ul>

<style lang="scss">
  @use './../lib/style/variables';

  * {
    box-sizing: border-box;
  }

  #county-search-input {
    border: 1px solid variables.$gray-grid;
  }

  .autocomplete {
    /*the container must be positioned relative:*/
    position: relative;
    display: inline-block;
    z-index: 1;
    width: 100%;

    &:focus-visible, &:active, &:focus {
      border: 1px solid variables.$teal;
      box-shadow: none;
    }
  }

  input {
    border: 1px solid transparent;
    background-color: variables.$gray-lightest;
    padding: 10px;
    font-size: 16px;
  }

  #autocomplete-items-list {
    position: relative;
    margin: 0;
    padding: 0;
    top: 0;
    width: 297px;
    border-right: 1px solid variables.$teal;
    border-left: 1px solid variables.$teal;
    background-color: variables.$gray-lightest;
    width: 100%;
  }

  input[type=text] {
    background-color: variables.$gray-lightest;
    width: 100%;
  }

  input[type=submit] {
    background-color: variables.$teal;
    color: #ffffff;
  }

  li.autocomplete-items {
    list-style: none;
    border-bottom: 1px solid variables.$teal;
    z-index: 99;
    top: 100%;
    left: 0;
    right: 0;
    padding: 10px;
    cursor: pointer;
    background-color: #ffffff;
  }

  a {
    color: variables.$teal-text;
    text-decoration: none;
  }

  li.autocomplete-items:hover {
    background-color: variables.$teal-light;
  }

  li.autocomplete-items:active {
    background-color: variables.$blue !important;
    color: variables.$gray-dark;
  }	
    
  .autocomplete-active {
    background-color: variables.$blue !important;
    color: variables.$gray-dark;
  }
</style>
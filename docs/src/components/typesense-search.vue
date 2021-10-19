<template>
  <form id="search-form" class="typesense-search-wrapper search-box" role="search">
    <input id="typesense-search-input" class="search-query" placeholder="Search.."
           v-model="query" @keydown="search"/>
  </form>

  <div class="search-results">
    <div v-for="result in results">
      <h5><a :href="result.document.url">{{ result.document.hierarchy.lvl2 ?? result.document.hierarchy.lvl1 ?? result.document.hierarchy.lvl0  }}</a></h5>
      <p v-html="result.highlights[0].snippet">
      </p>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "typesense-search",
  setup() {
    const results = ref([])
    const query = ref("")
    let timeout = null;

    const onchange = (e) => {
      console.log(query.value)
      if (query.value == null) {
        return;
      }
      timeout = setTimeout(() => {
        if (timeout != null) {
          clearTimeout(timeout)
          fetch('https://search.docs.servicestack.net/collections/typesense_docs/documents/search?q='
              + query.value + '&query_by=content', {
            headers: {
              // Search only API key for Typesense.
              'x-typesense-api-key': 'N4N8bF0XwyvzwCGwm3CKB0QcnwyWtygo'
            }
          }).then(res => {
            res.json().then(data => {
              results.value = data.hits;
            })
          })
        }
      }, 200);
    }
    return {
      results: results,
      query: query,
      search: onchange
    }
  }
}
</script>

<style scoped>

</style>
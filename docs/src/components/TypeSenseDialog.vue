<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useRouter } from 'vitepress';

defineProps<{ open: boolean }>();
const emit = defineEmits<{ (event: 'hide'): void }>();
const router = useRouter();
 
const results = ref({ groups:[], allItems:[] });
const query = ref("");

let lastQuery:string = "";
let timeout:any = null;
const search = (txt:any) => {
  if (!query.value) {
    results.value = { groups:[], allItems:[] };
    return;
  }
  timeout = setTimeout(() => {
    if (timeout != null) {
      if (lastQuery === query.value) return;
      lastQuery = query.value;
      clearTimeout(timeout)
      fetch('https://search.docs.servicestack.net/collections/typesense_docs/documents/search?q='
          + query.value + '&query_by=content,hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3&group_by=hierarchy.lvl0', {
        headers: {
          // Search only API key for Typesense.
          'x-typesense-api-key': 'N4N8bF0XwyvzwCGwm3CKB0QcnwyWtygo'
        }
      }).then(res => {
        res.json().then(data => {
          selectedIndex.value = 1;
          let idx = 0;
          const groups:any = {};
          const meta:any = { groups:[], allItems:[] };
          //console.log(data)

          data.grouped_hits.forEach((gh:any) => {
            let groupName = gh.group_key[0];
            meta.groups.push({ group: groupName });
            let group = groups[groupName] ?? (groups[groupName] = []);
            gh.hits.forEach((hit:any) => {
              let doc = hit.document;
              let highlight = hit.highlights.length > 0 ? hit.highlights[0] : null;
              let item = {
                id: ++idx,
                titleHtml: doc.hierarchy.lvl3 ?? doc.hierarchy.lvl2 ?? doc.hierarchy.lvl1 ?? doc.hierarchy.lvl0,
                snippetHtml: highlight?.snippet,
                // search result type for icon
                type: highlight?.field === 'content' ? 'content' : 'heading',
                // search results have wrong domain, use relative
                url: doc.url.substring(doc.url.indexOf('/', 'https://'.length))
              };
              let titleOnly = stripHtml(item.titleHtml);
              if (titleOnly === groupName) {
                item.type = 'doc';
              }
              else if (titleOnly === stripHtml(item.snippetHtml)) {
                item.snippetHtml = "";
              }
              group.push(item);
            });
          });

          meta.groups.forEach((g:any) => {
            g.items = groups[g.group] ?? [];
            g.items.forEach((item:any) => {
              meta.allItems.push(item);
            });
          });

          //console.log(meta)
          results.value = meta;
        })
      })
    }
  }, 200);  
}

let selectedIndex = ref(1);
const onHover = (index:number) => selectedIndex.value = index;
const go = (url:string) => {
  emit('hide');
  return router.go(url);
}

const next = (id:number, step:number) => {
  const meta:any = results.value;
  const pos = meta.allItems.findIndex((x:any) => x.id === id);
  if (pos === -1)
    return meta.allItems[0];
  const nextPos = (pos + step) % meta.allItems.length;
  return nextPos >= 0 ? meta.allItems[nextPos] : meta.allItems[meta.allItems.length + nextPos];
}

let ScrollCounter = 0;

const onKeyDown = (e:KeyboardEvent) => {
  const meta:any = results.value;
  if (!meta || meta.allItems.length === 0) return;
  if (e.code === 'ArrowDown' || e.code === 'ArrowUp' || e.code === 'Home' || e.code === 'End') {
    selectedIndex.value = e.code === 'Home'
      ? meta.allItems[0]?.id
      : e.code === 'End'
        ? meta.allItems[meta.allItems.length-1]?.id
        : next(selectedIndex.value, e.code === 'ArrowUp' ? -1 : 1).id;
    nextTick(() => {
      let el = document.querySelector('[aria-selected=true]') as HTMLElement,
          elGroup = el?.closest('.group-result') as HTMLElement,
          elParent = elGroup?.closest('.group-results') as HTMLElement;
      
      ScrollCounter++;
      let counter = ScrollCounter;

      if (el && elGroup && elParent) {
        if (el === elGroup.firstElementChild?.nextElementSibling && elGroup === elParent.firstElementChild) {
          //console.log('scrollTop', 0)
          elParent.scrollTo({ top: 0, left: 0 });
        } else if (el === elGroup.lastElementChild && elGroup === elParent.lastElementChild) {
          //console.log('scrollEnd', elParent.scrollHeight)
          elParent.scrollTo({ top: elParent.scrollHeight, left: 0 });
        } else {
          if (typeof IntersectionObserver != 'undefined') {
            let observer = new IntersectionObserver((entries:any[]) => {
              if (entries[0].intersectionRatio <= 0) {
                //console.log('el.scrollIntoView()', counter, ScrollCounter)
                if (counter == ScrollCounter) el.scrollIntoView();
              }
              observer.disconnect();
            });
            observer.observe(el);
          }
        }
      }
    })
    e.preventDefault();
  } else if (e.code === 'Enter') {
    let match = meta.allItems.find((x:any) => x.id === selectedIndex.value);
    if (match) {
      go(match.url);
      e.preventDefault();
    }
  }
};

function stripHtml(s:string) {
  return s.replace(/<[^>]*>?/gm, '');
}

function isScrolledIntoView(el:HTMLElement, elParent:HTMLElement) {
    let { top, bottom } = el.getBoundingClientRect();
    let height = window.innerHeight;

    height = (elParent as any).clientHeight + elParent.getBoundingClientRect().top;
    const dim = (e:HTMLElement|any) => {
      let { offsetHeight, offsetTop, clientHeight, clientTop } = e;
      return ({ 
        rect:e.getBoundingClientRect(), 
        offsetHeight, offsetTop, clientHeight, clientTop });
    };
    console.log({ el: dim(el), parent: dim(elParent)});

    // Only completely visible elements return true:
    let isVisible = (top >= 0) && (bottom <= height);
    return isVisible;
}

</script>

<template>
  <div class="search-dialog hidden flex bg-black bg-opacity-25 items-center" :class="{ open }" 
       @click="$emit('hide')">
    <div class="dialog absolute" style="max-height:70vh;" @click.stop="false">
      <div class="p-2 flex flex-col">
        <div class="flex">
          <label class="pt-4 mt-0.5 pl-2" for="docsearch-input">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </label>
          <input id="docsearch-input" class="search-input" v-model="query" @keyup="search"
                aria-autocomplete="list" aria-labelledby="docsearch-label" autocomplete="off" autocorrect="off" autocapitalize="off" 
                spellcheck="false" placeholder="Search docs" maxlength="64" type="search" enterkeyhint="go"
                @focus="selectedIndex=1" @blur="selectedIndex=-1" @keydown="onKeyDown">
          <div class="mt-5 mr-3"><button class="search-cancel" @click="$emit('hide')">Cancel</button></div>
        </div>
        <div v-if="results.allItems.length" class="group-results border-0 border-t border-solid border-gray-400 mx-2 pr-1 py-2 overflow-y-scroll" style="max-height:60vh">
          <div v-for="g in results.groups" :key="g.group" class="group-result mb-2">
            <h3 class="m-0 text-lg text-gray-600" v-html="g.group"></h3>
            <div v-for="result in g.items" :key="result.id" :aria-selected="result.id == selectedIndex"
                 class="group-item rounded-lg bg-gray-50 mb-1 p-2 flex" @mouseover="onHover(result.id)" @click="go(result.url)">              
              <div class="min-w-min mr-2 flex items-center">
                <svg v-if="result.type=='doc'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                <svg v-else-if="result.type=='content'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
              </div>
              <div class="overflow-hidden">
                <div class="snippet overflow-ellipsis overflow-hidden whitespace-nowrap text-sm" v-html="result.snippetHtml"></div>
                <h4><a class="text-sm text-gray-600" :href="result.url" v-html="result.titleHtml"></a></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 720px) {
  .search-dialog {
    transform: translateX(0);
  }
}
@media (min-width: 960px) {
  .search-dialog {
    width: 20rem;
  }
}
input[type=search]::-webkit-search-cancel-button{
  -webkit-appearance: none;
  appearance: none;
  height: 12px;
  width: 12px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' class='w-5 h-5' viewBox='0 0 123.05 123.05' style='enable-background:new 0 0 123.05 123.05'%3E%3Cg%3E%3Cpath d='M121.325,10.925l-8.5-8.399c-2.3-2.3-6.1-2.3-8.5,0l-42.4,42.399L18.726,1.726c-2.301-2.301-6.101-2.301-8.5,0l-8.5,8.5 c-2.301,2.3-2.301,6.1,0,8.5l43.1,43.1l-42.3,42.5c-2.3,2.3-2.3,6.1,0,8.5l8.5,8.5c2.3,2.3,6.1,2.3,8.5,0l42.399-42.4l42.4,42.4 c2.3,2.3,6.1,2.3,8.5,0l8.5-8.5c2.3-2.3,2.3-6.1,0-8.5l-42.5-42.4l42.4-42.399C123.625,17.125,123.625,13.325,121.325,10.925z' fill='%23888' /%3E%3C/g%3E%3C/svg%3E%0A");
  background-size: 12px 12px;
}
.search-dialog {
  z-index: 11;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 200;
  flex-direction: column;
  background: rgba(0,0,0,.25);
  padding: 12vh;
  transition: width 0.1s ease-out 0s, opacity 0.5s ease 0.2s;
}
.search-dialog .dialog {
  margin: 0 auto;
  width: 100%;
  max-width: 47.375rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
  background: #fff;
}
.search-dialog.open {
  display: flex;
}
.search-input {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  height: 4.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  margin-left: 1rem;
  margin-right: 1rem;
  flex: auto;
  min-width: 0;
  font-size: 1.5rem;
  border: 0 solid;
}
.search-input::placeholder {
  font-weight: 500;
  color: rgb(156, 163, 175);
}
.search-input:focus {
    outline: 2px dotted transparent;
}
.search-cancel {
    flex: none;
    font-size: 0;
    border-radius: .375rem;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    padding: .125rem .375rem;
}
.search-cancel:before {
    content: "esc";
    color: #9ca3af;
    font-size: .875rem;
    line-height: 1.25rem;
    cursor: pointer;
}
.search-dialog ::-webkit-scrollbar { width:4px; }
.search-dialog ::-webkit-scrollbar-thumb { background-color:rgb(249, 250, 251); }

@media (min-width: 720px) {
  .nav {
    display: none;
  }
}
</style>
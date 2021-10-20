<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import { ref, defineAsyncComponent, nextTick } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress';
const { Layout } = DefaultTheme
const { page, frontmatter } = useData();
const openSearch = ref(false);
const showSearch = () => {
  openSearch.value = true
  nextTick(() => {
    const el = document.querySelector('#docsearch-input');
    el?.focus();
  })
};
const hideSearch = () => openSearch.value = false;
const TypesenseDialog = defineAsyncComponent(() => 
  import('../../src/components/typesense-dialog.vue'));
const KeyboardEvents = defineAsyncComponent(() => 
  import('../../src/components/keyboard-events.vue'));

const onKeyDown = (e) => {
  if (e.code === 'Escape') {
    hideSearch();
  }
  else if ((e.target).tagName != 'INPUT') {
    console.log('onKeyDown', e, e.target);
    if (e.ctrlKey && e.code == 'KeyK') {
      showSearch();
      e.preventDefault();
    }
  }
};
</script>

<template>
<div @keydown="onKeyDown">
  <ClientOnly>
    <KeyboardEvents @keydown="onKeyDown" />
    <TypesenseDialog :open="openSearch" @hide="hideSearch" />
  </ClientOnly>
  <Layout>
    <template #navbar-search>
      <button class="flex rounded-full p-0 bg-gray-100 border-solid border-gray-100 text-gray-400 cursor-pointer
                    hover:border-green-400 hover:bg-white hover:text-gray-600" @click="showSearch">
          <svg class="w-7 h-7 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-lg mr-1">Search</span>
          <span style="opacity:1;" class="hidden sm:block text-gray-400 text-sm leading-5 py-0 px-1.5 my-0.5 mr-1.5 border border-gray-300 border-solid rounded-md">
            <span class="sr-only">Press </span><kbd class="font-sans"><abbr title="Control" class="no-underline">Ctrl </abbr></kbd><span class="sr-only"> and </span><kbd class="font-sans">K</kbd><span class="sr-only"> to search</span>
          </span>
      </button>
    </template>
    <template #page-top>
      <h1 v-if="frontmatter.title">{{ frontmatter.title }}</h1>
    </template>
  </Layout>    
</div>
</template>
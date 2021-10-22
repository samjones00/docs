<template>
  <div class="custom theme">
    <h1>404</h1>
    <blockquote>{{ getMsg() }}</blockquote>
    <a :href="site.base" aria-label="go to home">Take me home.</a>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useData } from 'vitepress'
const { site } = useData()
const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`
]
function getMsg() {
  return msgs[Math.floor(Math.random() * msgs.length)]
}

// When SPA Route fails (due to broken refs after deployment), auto reload if full-page reload succeeds
onMounted(() => {
    fetch(location.href, { method: 'HEAD' })
        .then(r => {
            if (r.ok) {
                location.reload();
            } else {
                console.log('FAILED HEAD ' + location.href, r.status);
            }
        });
});
</script>
<template>
  <div class="custom theme">
    <a :href="to" aria-label="redirecting">direct link</a>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
let props = defineProps<{ to: string }>()
onMounted(() => location.href = props.to)
</script>
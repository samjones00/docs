<template>
  <div class="hidden"></div>
</template>
  
<script>
  export default {
    created() {
      const component = this;
      this.handler = function (e) {
        component.$emit('keydown', e);
      }
      window.addEventListener('keydown', this.handler);
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.handler);
    }
  }
</script>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const backToHome = () => {
  router.push('/');
};
</script>

<template>
  <router-view />
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
pre {
  white-space: pre;
}
</style>

<template>
  <div class="container flex flex-col-reverse md:flex-row min-h-screen">
    <BaseMenu/>
    <div class="flex-1 p-4 md:ml-64">
      <slot />
    </div>
  </div>
</template>

<script setup>
import BaseMenu from '~/components/BaseMenu.vue';
</script>

<style scoped>

</style>

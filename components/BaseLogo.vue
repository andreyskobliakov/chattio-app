<template>
  <div :class="['logo', customClass, sizeClass]">
    <slot>Chattio</slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  customClass: {
    type: String,
    default: 'black'
  },
  size: {
    type: String,
    default: 'text-base'
  }
});

const sizeClass = props.size;
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Birthstone:wght@400&display=swap');

.logo {
  font-family: 'Birthstone', cursive;
  text-align: center;
  font-weight: 400;
}
</style>

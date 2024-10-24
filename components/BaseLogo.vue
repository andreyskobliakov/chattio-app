<template>
    <div :class="['logo', customClass]">
      <slot>Chattio</slot>
    </div>
  </template>
  
  <script setup>
  defineProps({
    customClass: {
      type: String,
      default: 'black'
    }
  });
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Birthstone:wght@400&display=swap');
  
  .logo {
    font-family: 'Birthstone', cursive;
    font-size: 5rem;
    text-align: center;
    font-weight: 400;
  }
  
  </style>
  
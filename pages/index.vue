<template>
  <div class="flex flex-col h-screen">
    <div class="flex gap-4 mb-4 w-full"> <!-- Контейнер для двух верхних блоков -->
      <div class="bg-blue-700 p-4 w-2/3"> <!-- Левый верхний блок -->
        <h2 class="text-white text-xl">Левый верхний блок</h2>
        
      </div>
      <div class="bg-blue-600 p-4 w-1/3"> <!-- Правый верхний блок -->
        <h2 class="text-white text-xl">Правый верхний блок</h2>
      </div>
    </div>
    <div class="flex flex-grow gap-4"> <!-- Контейнер для левой и правой части -->
      <div class="w-2/3 bg-blue-500 flex flex-col p-4">
        <div class="flex-grow flex items-center justify-center">
          <h1 class="text-white text-3xl">Левая половина</h1>
        </div>
      </div>
      <div class="w-1/3 bg-green-500 flex flex-col p-4"> <!-- Flex-col для правой части -->
        <div class="bg-green-700 p-4 mb-4"> <!-- Новый верхний блок зеленый -->
          <h2 class="text-white text-xl">Верхний зеленый блок</h2>
        </div>
        <div class="bg-green-600 p-4 mb-4"> <!-- Новый дополнительный блок -->
          <h2 class="text-white text-xl">Дополнительный блок</h2>
        </div>
        <div class="flex-grow flex items-center justify-center">
          <h1 class="text-white text-3xl">Правая половина</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>

</style>

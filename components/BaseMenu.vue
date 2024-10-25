<template>
    <nav class="bg-black p-4 md:fixed md:top-0 md:left-0 md:h-full border-r-2 border-r-gray-800">
      <div class="logo-container mb-4 mt-4 md:mb-8">
        <BaseLogo size="text-3xl" customClass="text-white">
          <template #default>Chattio</template>
        </BaseLogo>
      </div>
      <ul class="flex flex-col md:flex-col md:space-y-4">
        <li>
          <NuxtLink to="/" class="text-white hover:text-gray-400">
            <Icon name="ion:home" class="w-8 h-8" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="text-white hover:text-gray-400">
            <Icon name="ion:chatbox" class="w-8 h-8" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="text-white hover:text-gray-400">
            <Icon name="ion:add-circle-outline" class="w-8 h-8" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="text-white hover:text-gray-400">
            <Icon name="ion:android-favorite-outline" class="w-8 h-8" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/profile" class="text-white hover:text-gray-400">
            <Icon name="ic:baseline-person" class="w-8 h-8" />
          </NuxtLink>
        </li>
      </ul>
    </nav>
  
    <footer class="md:hidden bg-black p-4">
      <ul class="flex justify-around">
        <li>
          <NuxtLink to="/" class="text-white hover:text-gray-400">
            <Icon name="ion:home" class="w-8 h-8" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="text-white hover:text-gray-400">
            <Icon name="ion:chatbox" class="w-8 h-8" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="text-white hover:text-gray-400">
            <Icon name="ion:add-circle-outline" class="w-8 h-8" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="text-white hover:text-gray-400">
            <Icon name="ion:android-favorite-outline" class="w-8 h-8" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/profile" class="text-white hover:text-gray-400">
            <Icon name="ic:baseline-person" class="w-8 h-8" />
          </NuxtLink>
        </li>
      </ul>
    </footer>
  </template>
  
  <script>
  import BaseLogo from '~/components/BaseLogo.vue';
  
  export default {
    name: 'BaseMenu',
    components: {
      BaseLogo
    }
  }
  </script>
  
  <style scoped>
  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column; 
  }
  
  @media (max-width: 768px) {
    footer {
      display: block; 
    }
  
    nav {
      display: none; 
    }
  }
  
  footer ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }
  </style>
  
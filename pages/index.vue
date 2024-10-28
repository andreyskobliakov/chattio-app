<template>
  <div class="flex flex-col h-screen">
    <div class="flex gap-4 mb-2 w-full">
      <div class="w-full relative">
        <div class="relative">
          <div class="flex overflow-x-auto space-x-4 mt-2 stories-carousel justify-center md:justify-start">
            <div class="w-16 h-16 bg-gray-400 rounded-full flex-shrink-0"></div>
            <div class="w-16 h-16 bg-gray-400 rounded-full flex-shrink-0"></div>
            <div class="w-16 h-16 bg-gray-400 rounded-full flex-shrink-0"></div>
            <div class="w-16 h-16 bg-gray-400 rounded-full flex-shrink-0"></div>
          </div>
          <button @click="scrollLeft" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 shadow-lg">
            <Icon name="ion:ios-arrow-dropleft" class="w-6 h-6" />
          </button>
          <button @click="scrollRight" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 shadow-lg">
            <Icon name="ion:ios-arrow-dropright" class="w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="hidden md:flex items-center justify-end p-2 w-1/3"> 
        <div class="flex items-center">
          <div class="w-14 h-14 border-4 border-gray-300 rounded-full flex items-center justify-center bg-gray-200 text-gray-700 text-xl" 
               v-if="!user.avatarUrl">
            {{ user.firstName.charAt(0).toUpperCase() }}
          </div>
          <div v-else class="w-24 h-24 mb-4 border-4 border-gray-300 rounded-full">
            <img :src="user.avatarUrl" alt="Аватар" class="rounded-full object-cover w-full h-full">
          </div>
          <div class="ml-4">
            <h3 class="text-white">{{ user.login }}</h3>
            <p class="text-white">{{ user.firstName }} {{ user.lastName }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-grow gap-4">
      <div class="w-full flex flex-col items-center p-4">
        <div class="mt-2 p-4 rounded shadow-md w-full max-w-lg">
          <div v-if="loading" class="text-gray-600">Загрузка...</div>
          <div v-if="error" class="text-red-500">{{ error }}</div>
          <div v-for="post in posts" :key="post._id" class="my-2 bg-gray-100 p-2 rounded shadow-md w-full">
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <div>
                <strong>{{ post.userId.firstName }} {{ post.userId.lastName }}</strong> 
                ({{ post.userId.login }})
              </div>
              <div>{{ new Date(post.createdAt).toLocaleDateString() }}</div>
            </div>
            <img v-if="post.file" :src="`http://localhost:3001/${post.file}`" alt="Изображение публикации" class="w-full h-64 object-cover rounded" />
            <p class="mt-2">{{ post.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const user = ref({
  avatarUrl: '',
  firstName: '',
  lastName: '',
  login: ''
});

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

const scrollLeft = () => {
  document.querySelector('.stories-carousel').scrollBy({
    left: -200,
    behavior: 'smooth'
  });
};

const scrollRight = () => {
  document.querySelector('.stories-carousel').scrollBy({
    left: 200,
    behavior: 'smooth'
  });
};

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch (error) {
    console.error('Ошибка при декодировании токена:', error);
    return null;
  }
};

const fetchUserData = async () => {
  const userId = getUserIdFromToken();
  if (!userId) return;

  try {
    const response = await axios.get(`http://localhost:3001/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    user.value = response.data;
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
  }
};

const fetchAllPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3001/posts', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    posts.value = response.data;
  } catch (error) {
    console.error('Ошибка при получении публикаций:', error);
    error.value = 'Не удалось загрузить публикации';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUserData();
  fetchAllPosts(); 
});
</script>

<style scoped>
.stories-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;  
  scrollbar-width: none;  
}

.stories-carousel::-webkit-scrollbar {
  display: none; 
}

.stories-carousel > div {
  scroll-snap-align: start;
}
</style>

<template>
  <div class="flex flex-col items-center">
    <div class="w-24 h-24 mb-4 border-4 border-gray-300 rounded-full flex items-center justify-center bg-gray-200 text-gray-700 text-4xl" 
         v-if="!user.avatarUrl">
      {{ user.firstName.charAt(0).toUpperCase() }}
    </div>
    <div v-else class="w-24 h-24 mb-4 border-4 border-gray-300 rounded-full">
      <img :src="user.avatarUrl" alt="Аватар" class="rounded-full object-cover w-full h-full">
    </div>
    <div class="text-center">
      <h1 class="text-2xl font-bold">{{ user.firstName }} {{ user.lastName }}</h1>
      <p class="text-gray-600">{{ user.login }}</p>
      <button class="mt-4 mb-6 px-4 py-2 text-sm bg-gray-700 text-white rounded hover:bg-gray-900 flex items-center mx-auto">
        <Icon name="ion:settings-outline" class="w-6 h-6 mr-2" />
        Редактировать
      </button>
      <div class="flex space-x-4 justify-center mt-2 mb-10">
        <span>{{ user.postsCount }} публикаций</span>
        <span>{{ user.followersCount }} подписчиков</span>
        <span>{{ user.followingCount }} подписок</span>
      </div>
    </div>
    <div class="w-full mt-4">
      <div class="tabs flex justify-center space-x-4 border-b-2 border-gray-700">
        <button @click="activeTab = 'posts'" :class="{'border-b-2 border-gray-200': activeTab === 'posts'}" class="py-2 px-4 flex items-center">
          <Icon name="solar:gallery-favourite-outline" class="w-6 h-6 mr-2" />
          Публикации
        </button>
        <button @click="activeTab = 'videos'" :class="{'border-b-2 border-gray-200': activeTab === 'videos'}" class="py-2 px-4 flex items-center">
          <Icon name="solar:video-frame-play-horizontal-broken" class="w-6 h-6 mr-2" />
          Видео
        </button>
      </div>
      <div v-if="activeTab === 'posts'" class="tab-content mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto" style="max-width: 900px;">
        <div v-if="loading" class="text-gray-600">Загрузка...</div>
        <div v-if="error" class="text-red-500">{{ error }}</div>
        <div v-for="post in posts" :key="post._id" class="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
          <div class="relative w-full h-64"> 
            <img v-if="post.file" :src="`http://localhost:3001/${post.file}`" alt="Изображение публикации" class="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'videos'" class="tab-content mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto" style="max-width: 1200px;">
        <div class="bg-gray-200 w-full h-72 flex items-center justify-center">Видео 1</div>
        <div class="bg-gray-200 w-full h-72 flex items-center justify-center">Видео 2</div>
        <div class="bg-gray-200 w-full h-72 flex items-center justify-center">Видео 3</div>
        <div class="bg-gray-200 w-full h-72 flex items-center justify-center">Видео 4</div>
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
  login: '',
  postsCount: 0,
  followersCount: 0,
  followingCount: 0,
});

const posts = ref([]);
const activeTab = ref('posts');
const loading = ref(true);
const error = ref(null);

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
  if (!userId) {
    error.value = 'ID пользователя не найден';
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get(`http://localhost:3001/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    user.value = response.data;
    await fetchUserPosts(userId);
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    error.value = 'Не удалось получить данные пользователя';
  } finally {
    loading.value = false;
  }
};

const fetchUserPosts = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3001/posts?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    posts.value = response.data;
  } catch (error) {
    console.error('Ошибка при получении публикаций:', error);
    error.value = 'Не удалось получить публикации';
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<style scoped>

</style>

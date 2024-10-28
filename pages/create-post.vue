<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Создать публикацию</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block text-white text-sm font-bold mb-2" for="title">Заголовок</label>
        <input v-model="form.title" type="text" id="title" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-4">
        <label class="block text-white text-sm font-bold mb-2" for="description">Описание</label>
        <textarea v-model="form.description" id="description" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="file">Выберите файл</label>
        <input type="file" id="file" @change="handleFileUpload" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
      </div>
      <div class="mb-4">
        <button type="submit" class="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">Опубликовать</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const form = ref({
  title: '',
  description: '',
  file: null
});


const handleFileUpload = (event) => {
  const file = event.target.files[0];
  form.value.file = file; 
};


const submitForm = async () => {
  const formData = new FormData();
  formData.append('title', form.value.title);
  formData.append('content', form.value.description);
  
  if (form.value.file) {
    formData.append('file', form.value.file);
  }

  try {
    const response = await axios.post('http://localhost:3001/posts', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Публикация создана:', response.data);
    
    form.value.title = '';
    form.value.description = '';
    form.value.file = null;
  } catch (error) {
    console.error('Ошибка при создании публикации:', error.response?.data || error.message);
  }
};
</script>

<style scoped>

</style>

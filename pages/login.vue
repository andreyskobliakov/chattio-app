<template>
  <div class="w-full max-w-md text-black bg-white border border-gray-300 p-6 rounded-lg shadow-lg">
    <BaseLogo size="text-8xl" customClass="text-black">
      <template #default>Chattio</template>
    </BaseLogo>
    <form @submit.prevent="handleSubmit">
      <div v-if="isLogin">
        <input type="text" v-model="loginData.phone" placeholder="Телефон, имя пользователя, эл.адрес" class="input" />
        <input type="password" v-model="loginData.password" placeholder="Пароль" class="input" />
      </div>
      <div v-else>
        <input type="text" v-model="registerData.phone" placeholder="Мобильный телефон" class="input" />
        <input type="password" v-model="registerData.password" placeholder="Пароль" class="input" />
        <input type="text" v-model="registerData.firstName" placeholder="Имя" class="input" />
        <input type="text" v-model="registerData.lastName" placeholder="Фамилия" class="input" />
        <input type="text" v-model="registerData.login" placeholder="Логин" class="input" />
      </div>
      <div class="mt-2">
        <button type="submit" class="btn">{{ isLogin ? 'Войти' : 'Зарегистрироваться' }}</button>
      </div>
    </form>
    <div class="mt-16 p-4 text-center text-black border border-gray-300 rounded-lg">
      <p>
        {{ isLogin ? 'У вас ещё нет аккаунта?' : 'Есть аккаунт?' }}
        <span @click="toggleForm" class="text-blue-500 cursor-pointer hover:underline">
          {{ isLogin ? ' Зарегистрироваться' : ' Вход' }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import BaseLogo from '~/components/BaseLogo.vue';

definePageMeta({
  layout: 'login'
});


const isLogin = ref(true);
const loginData = ref({
  phone: '',
  password: '',
});
const registerData = ref({
  phone: '',
  password: '',
  firstName: '',
  lastName: '',
  login: '',
});

const router = useRouter();

const handleSubmit = async () => {
  const url = `http://localhost:3001/${isLogin.value ? 'login' : 'register'}`;
  const data = isLogin.value ? loginData.value : { ...registerData.value, login: `@${registerData.value.login}` };

  try {
    const response = await axios.post(url, data);
    console.log('Ответ сервера:', response.data);
    
    if (isLogin.value) {
      localStorage.setItem('token', response.data.token);
      await router.push('/');
    } else {
      console.log('Перенаправление на страницу входа...');
      isLogin.value = true;
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Ошибка:', errorMessage);
    alert(`Ошибка: ${errorMessage}`);
  }
};


const toggleForm = () => {
  isLogin.value = !isLogin.value;
};
</script>

<style scoped>

</style>

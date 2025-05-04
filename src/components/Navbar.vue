<template>
  <nav class="fixed top-0 left-0 w-full p-4 z-50">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/home" class="text-xl font-bold" :style="{ color: '#AB9385' }">Really Barber Shop</RouterLink>
      <button @click="toggleMenu" class="text-white md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <ul :class="{ 'hidden': !menuOpen, 'flex': menuOpen }"
        class="absolute top-14 left-0 w-full bg-white md:bg-transparent md:static md:flex md:space-x-6 md:w-auto md:items-center">
        <li>
          <RouterLink to="/quienessomo" class="block px-4 py-2" :style="{ color: '#AB9385' }">Quienes
            Somos</RouterLink>
        </li>
        <li>
          <RouterLink to="/servicios" class="block px-4 py-2" :style="{ color: '#AB9385' }">Servicios</RouterLink>
        </li>
        <li>
          <RouterLink to="/citas" class="px-4 py-2" :style="{ color: '#AB9385' }">Citas</RouterLink>
        </li>
        <li>
          <RouterLink to="/perfil" class="px-4 py-2" :style="{ color: '#AB9385' }">Perfil</RouterLink>
        </li>
        <li>
          <RouterLink @click.prevent="logout" to="/" class="px-4 py-2" :style="{ color: '#AB9385' }">Cerrar
            Sessión</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { ref } from "vue";
import { RouterLink } from 'vue-router';
import { useAuthStore } from "@/stores/AuthStore";

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const authStore = useAuthStore()

const logout = async () => {
  try {
    // const token = localStorage.getItem('token');

    // if (!token) {
    //   router.push('/login');
    //   return;
    // }

    // const response = await axios.post('https://localhost:7004/api/User/logout', {}, {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });

    // localStorage.removeItem('token');
    // router.push('/login');
    await authStore.logout()
  } catch (error) {
    console.error('Error al cerrar sesión:', error.response?.data || error.message);
  }
};
</script>
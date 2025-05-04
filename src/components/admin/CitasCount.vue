<template>
    <!-- Título con icono -->
    <div class="flex items-center gap-3  m-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#AB9385]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 15h14M5 19h14" />
      </svg>
      <h1 class="text-3xl font-bold text-[#AB9385]">Appointments</h1>
    </div>

    <!-- Total de citas con icono -->
    <div class="flex items-center gap-3 justify-end m-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#AB9385]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5V9a3 3 0 00-3-3H7a3 3 0 00-3 3v11h5" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 16v4h6v-4" />
      </svg>
      <h2 class="text-3xl font-bold text-[#AB9385]">Total: {{ totalAppointments }}</h2>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const totalAppointments = ref(0);

// const fetchAppointmentCount = async () => {
//   try {
//     const response = await axios.get('https://localhost:7004/api/Appointment/count');
//     totalAppointments.value = response.data.totalAppointments;
//   } catch (error) {
//     console.error('Error al obtener el total de citas:', error);
//   }
// };

// onMounted(() => {
//   fetchAppointmentCount();
// });
</script>
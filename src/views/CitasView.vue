<template>
  <Loading v-if="loadingStore.isLoading" class="absolute z-10"/>
  <header class="bg-black relative w-full h-237 bg-cover bg-center opacity-90">
    <Navbar />
    <div class="text-center py-30 text-white">
      <h1 class="text-4xl font-bold mb-4">Agenda tu Cita</h1>
      <p class="text-lg">Reserva tu espacio con nosotros y luce impecable.</p>
    </div>

    <form @submit.prevent="submitForm" class="max-w-lg mx-auto px-10 bg-white p-6 rounded-lg shadow-lg">
      <div class="mb-5">
        <label class="block text-black mb-2" for="name">Nombre</label>
        <InputText type="name" id="name" size="small"
          style="color: black !important; background-color: white !important; border-color: black !important; width: 27rem !important; height: 3rem !important;"
          required placeholder="name" 
          v-model="name"/>
      </div>

      <div class="mb-5">
        <label class="block text-black mb-2" for="phone">Telefono</label>
        <InputText type="tel" id="phone"
        style="color: black !important; background-color: white !important; border-color: black !important; width: 27rem !important; height: 3rem !important;" required
          placeholder="Telefono" 
          v-model="phone"/>
      </div>

      <div class="mb-5">
        <label class="block text-black mb-2" for="date">Dia</label>
        <DatePicker v-model="date" showIcon fluid iconDisplay="input" inputId="date" placeholder="Dia" 
        style="color: white !important; background-color: white !important; border-color: black !important; width: 27rem !important; height: 3rem !important;" />
      </div>

      <div class="mb-5">
        <label class="block text-black mb-2" for="time">Hora</label>
        <DatePicker v-model="time" showIcon fluid iconDisplay="input" timeOnly inputId="time">
                <template #inputicon="slotProps">
                    <i class="pi pi-clock" @click="slotProps.clickCallback" />
                </template>
            </DatePicker>
      </div>

      <button type="submit"
        class="w-full bg-[#AB9385] text-white py-3 rounded hover:bg-[#85736a] transition duration-200">
        Reservar
      </button>
    </form>

    <Footer />
  </header>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import Loading from '@/components/common/Loading.vue';
import { useLoadingStore } from '@/stores/loadingStore';
import { useUserStore } from '@/stores/UserStore';

const name = ref('')
const phone = ref('')
const date = ref('')
const time = ref('')

const UserStore = useUserStore()
const loadingStore = useLoadingStore();

// const userName = ref(localStorage.getItem('name') ?? '');
// const userId = localStorage.getItem('userId');

const submitForm = async () => {
  loadingStore.startLoading()
  try {
    const payload = {
      name: name.value,
      phone: phone.value,
      date: new Date(date.value).toISOString().split('T')[0], // Formato YYYY-MM-DD
      time: typeof time.value === 'string' ? time.value : time.value.toTimeString().split(' ')[0], // Formato HH:mm
    };

    console.log("Payload enviado desde frontend:", payload);

    await UserStore.createAppointment(
      payload.name,
      payload.phone,
      payload.date,
      payload.time
    );

    Swal.fire({
      icon: 'success',
      title: 'Cita agendada correctamente',
      timer: 1500,
      showConfirmButton: false,
    });


    // Reset form fields
    name.value = '';
    phone.value = '';
    date.value = '';
    time.value = '';
  } catch (error) {
    console.error("Error al agendar la cita:", error.response?.data || error.message);

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al agendar la cita. Por favor, inténtalo de nuevo.',
    });
  } finally {
    loadingStore.stopLoading()
  }
};
</script>

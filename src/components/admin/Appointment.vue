<template>
    <div class="flex flex-col items-center justify-center m-10">
      <h1 class="text-4xl font-bold mb-8">Gestión de Citas</h1>
  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <!-- Lista de Citas -->
      <Card v-for="appointment in formattedAppointments" :key="appointment.id" style="width: 20rem; overflow: hidden;">
        <template #header>
          <p class="m-2">{{ appointment.id}}</p>
        </template>
        <template #title>{{ appointment.name }}</template>
        <template #content>
          <p class="m-0">
            {{ appointment.date }}
          </p>
          <p class="m-1">
            {{ appointment.phone }}
          </p>
          <p class="m-0">
            {{ appointment.time }}
            <span :class="getStatusColor(appointment.status)">
              — {{ appointment.status }}
            </span>
          </p>
        </template>
        <template #footer>
          <div class="flex gap-4 mt-4">
            <Select v-model="appointment.status" :options="status" optionLabel="status" placeholder="Select a status" class="w-full md:w-56"/>
            <Button id="buttonSave" type="button" label="Save" class="w-full" @click="guardarEstado(appointment)" :disabled="appointment.status === 'Rechazado' || appointment.status === 'Confirmada'" />
          </div>
        </template>
      </Card>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import  Card  from 'primevue/card';
  import { Button } from 'primevue';
  import Select from 'primevue/select';
  import { useAdministradorStore } from '@/stores/AdministradorStore';
  
  const AdminStore = useAdministradorStore()

  // const fetchAppointments = async () => {
  //   try {
  //     const response = await axios.get('https://localhost:7004/api/Appointment/All');
  //     appointments.value = response.data.map((appointment) => ({
  //       ...appointment,
  //       confirmedStatus: appointment.status, // Mantiene el estado inicial confirmado
  //     }));
  //   } catch (error) {
  //     console.error('Error al cargar citas:', error);
  //   }
  // };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendiente': return 'text-yellow-600';
      case 'Confirmada': return 'text-green-600';
      case 'Rechazado': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const status = ref([
    { status: 'Pendiente' },
    { status: 'Confirmada' },
    { status: 'Rechazado' },
  ])

  const formattedAppointments = computed(() => {
    return AdminStore.appointments.map(appointment => ({
        ...appointment,
        selectStatus: appointment.status // Inicializa el select con el estado actual de la cita
    }));
});
  
  const guardarEstado = async (appointment: any) => {
    console.log("Antes de enviar:", { id: appointment.id, status: appointment.status });
    try {
      await  AdminStore.updateAppointmentStatus(appointment.id, appointment.status.status)
      Swal.fire({
        icon: 'success',
        title: 'Estado actualizado',
        text: `El estado de la cita con ID ${appointment.id} ha sido actualizado a ${appointment.status.status}`,
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      console.error("Error al actualizar estado:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al actualizar el estado.",
        });
    }
  }

  onMounted(async() => {
    await AdminStore.getAllAppointment()
  });
  </script>
  
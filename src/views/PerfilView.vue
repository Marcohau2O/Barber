<template>
    <header class="bg-black relative w-full h-237 bg-cover bg-center opacity-90">
        <Navbar />
        <div class="flex flex-col items-center justify-center">
            <!-- Perfil del Usuario -->
            <div class="w-full max-w-4xl bg-gray-100 p-8 rounded-lg shadow-lg m-[5rem]">
                <h1 class="text-3xl font-bold mb-4 text-black"><i class="pi pi-user" style="font-size: 2.3rem; padding: 0.7rem;"></i>Perfil del Usuario</h1>
                <div v-if="UserStore.user">
                <p class="text-lg text-black"><strong>Nombre:</strong> {{ UserStore.user?.name }}</p>
                <p class="text-lg text-black"><strong>Correo:</strong> {{ UserStore.user?.email }}</p>
                <Button id="edit-profile-button" label="Edit Profile" @click="openEditModal" />
                <Dialog v-model:visible="visible" header="Edit Profile" :style="{ width: '25rem' }">
                    <span class="text-surface-500 dark:text-surface-400 block mb-8 text-xl">Update your information.</span>
                    <div class="flex items-center gap-4 mb-4">
                        <label for="username" class="font-semibold w-24">Name</label>
                        <InputText v-model="editedUser.name" id="username" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="flex items-center gap-4 mb-8">
                        <label for="email" class="font-semibold w-24">Email</label>
                        <InputText v-model="editedUser.email" id="email" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="flex justify-end gap-2">
                        <Button id="buttonCancel" type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                        <Button id="buttonSave" type="button" label="Save" @click="saveProfile"></Button>
                    </div>
                </Dialog>
                </div>
                <div v-else>
                    <p class="text-lg text-red-500 text-center">Cargando datos del usuario...</p>
                </div>
            </div>

            <!-- Lista de Citas -->
            <h2 class="text-3xl font-bold mt-8 mb-4 text-[#AB9385]">Citas Realizadas</h2>
            <Loading v-if="loadingStore.isLoading" class="absolute z-10" />
                <div v-if="UserStore.appointments.length > 0" class="w-full max-w-4xl space-y-4">
                    <div
                        v-for="appointment in UserStore.appointments"
                        :key="appointment.id"
                        class="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between"
                    >
                        <div class="flex flex-col items-start space-y-2">
                            <p class="text-lg text-black"><strong>Fecha:</strong> {{ appointment.date }}</p>
                            <p class="text-lg text-black"><strong>Hora:</strong> {{ appointment.time }}</p>
                            <p class="text-lg text-black"><strong>Teléfono:</strong> {{ appointment.phone }}</p>
                        </div>
                        <p class="text-lg mt-4 md:mt-0 text-black">
                            <strong>Estado:</strong>
                            <span :class="getStatusColor(appointment.status)">
                                {{ appointment.status }}
                            </span>
                        </p>
                        <p v-if="appointment.status === 'Rechazado'" class="text-sm text-gray-500 italic">
                            La cita fue rechazada, contacta soporte.
                        </p>
                    </div>
                </div>
                <div v-else>
                    <p class="text-lg text-white font-semibold text-center">No hay citas programadas</p>
                </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Loading from '@/components/common/Loading.vue';
import { useLoadingStore } from '@/stores/loadingStore';
import { useUserStore } from '@/stores/UserStore';
import Swal from 'sweetalert2';
import { title } from 'process';
import { text } from 'stream/consumers';

const visible = ref(false);
const UserStore = useUserStore();
const loadingStore = useLoadingStore()

const user = ref({
    name: '',
    email: '',
    appointment: [], // Incluye propiedades necesarias
});

const editedUser = ref({
    name: user.value.name || '',
    email: user.value.email || '',
});

const openEditModal = () => {
    editedUser.value.name = user.value.name;
    editedUser.value.email = user.value.email;
    visible.value = true;
};

onMounted(async () => {
    await UserStore.getUserById();
    if (UserStore.user) {
        user.value = UserStore.user
    }

    await UserStore.getUserAppointments()
});


const saveProfile = async () => {
    try {
        const name = editedUser.value.name;
        const email = editedUser.value.email;

        await UserStore.updateUserById(name, email)
        Swal.fire({
            icon: 'success',
            title: 'Perfil Actualizado',
            text: 'Los datos del usuario han sido actualizados correctamente.',
            showConfirmButton: false
        })
        visible.value = false
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        Swal.fire({
            icon:'Error', 
            title: 'Error al actualizar',
            text: 'No se pudieron guardar los cambios.',
        })
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Pendiente':
            return 'text-yellow-600';
        case 'Aceptado':
            return 'text-green-600';
        case 'Rechazado':
            return 'text-red-600';
        default:
            return 'text-gray-600';
    }
};

</script>
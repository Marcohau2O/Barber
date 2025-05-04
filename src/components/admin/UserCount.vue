<template>
    <Loading v-if="loadingStore.isLoading" class="absolute z-10"/>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-[2rem]">
        <div class="p-3">
            <h1 class="text-2xl font-bold text-white text-left rtl:text-right">
                Tabla Usuarios
            </h1>
            <p class="mt-2 text-sm text-gray-400">
                Descripciones
            </p>
        </div>
        <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
            <div>
                <button  id="dropdownActionButton" data-dropdown-toggle="dropdownAction" class="inline-flex items-center text-[#AB9385] bg-[#AB9385] border border-[#AB9385] focus:outline-none hover:bg-[#AB9385] focus:ring-4 focus:ring-[#AB9385] font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-[#AB9385] dark:text-white dark:border-[#AB9385] dark:hover:bg-[#AB9385] m-5" type="button">
                    <span class="sr-only">Action button</span>
                    Action
                    <i class="pi pi-angle-down"></i>
                </button>
                <!--Lista de Acciónes-->
                <div id="dropdownAction" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                        </li>
                    </ul>
                    <div class="py-1">
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                    </div>
                </div>
            </div>
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative m-5">
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i class="pi pi-search"></i>
                </div>
                <input v-model="searchQuery" type="text" id="table-search-users" class="block p-2 ps-10 text-sm border border-white rounded-lg w-90 text-white" placeholder="Search for users">
            </div>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-black dark:text-black">
            <thead class="text-xs text-black uppercase bg-gray-400">
                <tr>
                    <th scope="col" class="p-4">
                        <div class="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-[#AB9385] bg-gray-100 border-gray-300 rounded-sm focus:ring-[#AB9385] dark:focus:ring-[#AB9385] dark:ring-offset-[#AB9385] dark:focus:ring-offset-[#AB9385] focus:ring-2 dark:bg-[#AB9385] dark:border-[#AB9385]">
                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Nombre
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Correo
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Tipo
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in filteredUsers" :key="user.id" class="bg-white border-b dark:hover:bg-[#AB9385]">
                    <td class="w-4 p-4">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-[#AB9385] bg-gray-100 border-gray-300 rounded-sm focus:ring-[#AB9385] dark:focus:ring-[#AB9385] dark:ring-offset-[#AB9385] dark:focus:ring-offset-[#AB9385] focus:ring-2 dark:bg-[#AB9385] dark:border-[#AB9385]">
                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-black">
                        <div class="ps-3">
                            <div class="text-base font-semibold">{{ user.name}}</div>
                        </div>
                    </th>
                    <th class="px-6 py-4">
                        {{ user.email }}
                    </th>
                    <th class="px-6 py-4">
                        {{ user.userType }}
                    </th>
                    <th class="px-6 py-4">
                        <button class="bg-blue-500 p-2 m-2 rounded-lg text-white" @click="openEditModal(user)">
                            <i class="pi pi-file-edit" style="font-size: 1.4rem"></i>
                        </button>
                        
                        <button @click="deleteUser(user.id)" class="bg-red-500 p-2 m-2 rounded-lg text-white">
                            <i class="pi pi-trash"></i>
                        </button>
                    </th>   
                </tr>
            </tbody>
        </table>
    </div>


    <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '30rem'}">
        <span class="text-surface-500 dark:text-surface-400 block mb-8 text-xl">Update your information.</span>
        <div class="flex items-center gap-4 mb-4">
            <label class="font-semibold w-24">Name</label>
            <InputText v-model="editUser.name" class="flex-auto" autocomplete="off"/>
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label class="font-semibold w-24">Email</label>
            <InputText v-model="editUser.email" class="flex-auto" autocomplete="off"/>
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label class="font-semibold w-24">Tipo Rol</label>
            <Select v-model="selectRol" :options="roles" optionLabel="rol" placeholder="Select a Rol" class="font-semibold w-xl"/>
        </div>
        <div class="flex justify-end gap-2">
            <Button id="buttonCancel" type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button id="buttonSave" type="button" label="Save" @click="updateUser"></Button>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import Dialog from 'primevue/dialog';
import InputText  from 'primevue/inputtext';
import Select from 'primevue/select';
import Button from 'primevue/button';
import { useAdministradorStore } from '@/stores/AdministradorStore';
import { useLoadingStore } from '@/stores/loadingStore';
import Loading from '../common/Loading.vue';

const AdminStore = useAdministradorStore();
const loadingStore = useLoadingStore();
const searchQuery = ref("");
const visible = ref(false);


const selectRol = ref();
const roles = ref([
    { rol: 'admin' },
    { rol: 'user' }
])

const filteredUsers = computed(() => {
    return AdminStore.users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.userType.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})
const editUser = ref({
    id: null,
    name: '',
    email: '',
    userType: '',
});

const openEditModal = (user: any) => {
    editUser.value = {
        id: user.id || '',
        name: user.name || '',
        email: user.email || '',
        userType: user.userType || ''
    };
    selectRol.value = roles.value.find(r => r.rol === user.userType) || null;
    visible.value = true;
};


// const getUserDetails = async (userId: number) => {
//     try {
//         const response = await axios.get(`https://localhost:7004/api/User/User/${userId}`);
//         userDetails.value = response.data; // Guardar datos en la variable reactiva

//         console.log('Detalles del usuario:', userDetails.value);

//         // Mostrar un mensaje de éxito
//         Swal.fire({
//             icon: 'success',
//             title: 'Detalles cargados',
//             text: 'Información del usuario cargada correctamente.',
//             timer: 2400,
//         });

//         // Abrir el modal
//         showModal.value = true;
//     } catch (error) {
//         console.error('Error al obtener los detalles del usuario:', error);

//         // Mostrar mensaje de error
//         Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'Hubo un problema al cargar la información del usuario.',
//             timer: 2400,
//         });
//     }
// };

const updateUser = async () => {
    loadingStore.startLoading()
    try {
        editUser.value.userType = selectRol.value.rol || editUser.value.userType;
        await AdminStore.updateUser(editUser.value)
        Swal.fire({
            icon: 'success',
            title: 'Actualizacion Correctamente',
            text: 'Usuario actualizado correctamente',
            timer: 2400
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    } finally {
        loadingStore.stopLoading()
    }
};

// const deleteUser = async (id: number) => {
//     try {
//         const token = localStorage.getItem('token');
//         console.log('Token enviado:', token);

//         if (!token) {
//             Swal.fire('Error', 'No hay token de autenticación', 'error');
//             return;
//         }

//         const result = await Swal.fire({
//             title: '¿Estás seguro?',
//             text: 'No podrás revertir esta acción!',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Sí, eliminarlo!',
//         });

//         if (result.isConfirmed) {
//             // Llamada a la API para eliminar al usuario
//             await axios.delete(`https://localhost:7004/api/User/${id}`);
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Eliminado!',
//                 text: 'El usuario ha sido eliminado correctamente.',
//                 timer: 2400
//             });

//             // Refrescar la lista de usuarios
//             fetchUsers();
//         }
//     } catch (error: any) {
//         console.error('Error al eliminar usuario:', error);
//         Swal.fire('Error', error.response?.data?.title || 'No se pudo eliminar el usuario', 'error');
//     }
// };

onMounted(() => {
    AdminStore.getAllUsers();
});
</script>
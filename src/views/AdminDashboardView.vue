<template>
    <nav class="fixed top-0 z-50 w-full border-b">
        <!--bg-[#AB9385] border-[#AB9385]-->
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-start rtl:justify-end">
                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-[#AB9385] rounded-lg sm:hidden hover:bg-[#AB9385] focus:outline-none focus:ring-2 focus:ring-[#AB9385] dark:hover:bg-[#AB9385]">
                    <span class="sr-only">Open sidebar</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>
                <i class="pi pi-prime" style="font-size: 2.5rem"></i>
                <a href="" class="flex ms-2 md:me-24">
                    <span class="self-center text-3xl font-semibold sm:text-4xl whitespace-nowrap text-[#AB9385]">Barber Shop</span>
                </a>
            </div>
        </div>
    </nav>

    <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto">
            <ul class="space-y-2 font-medium">
                <li>
                    <RouterLink to="/admin-dashboard" class="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#AB9385] group">
                        <i class="pi pi-home" style="font-size: 1.5rem"></i>
                        <span class="ms-3">Dashboard</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink to="/admin-dashboard/adminUser" class="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#AB9385] group">
                        <i class="pi pi-user" style="font-size: 1.5rem"></i>
                        <span class="ms-3">Usuarios</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink  to="/admin-dashboard/adminAppointment" class="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#AB9385] group">
                        <i class="pi pi-clipboard" style="font-size: 1.5rem"></i>
                        <span class="ms-3">Citas</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink to="/admin-dashboard/adminRoles" class="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#AB9385] group">
                        <i class="pi pi-verified" style="font-size: 1.5rem"></i>
                    <span class="ms-3">Roles</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink @click.prevent="logout" to="" class="flex items-center p-2 rounded-lg dark:text-white hover:bg-red-200 dark:hover:bg-red-700 group">
                        <i class="pi pi-sign-out" style="font-size: 1.5rem"></i>
                        <span class="ms-3">Cerrar Sesión</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </aside>

    <div class="p-4 sm:ml-64">
        <div class="m-5 p-4">
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import UserCount from '@/components/admin/UserCount.vue';
import CitasCount from '@/components/admin/CitasCount.vue';
import Appointment from '@/components/admin/Appointment.vue';
import { useAuthStore } from "@/stores/AuthStore";
import { RouterView } from 'vue-router';


const authStore = useAuthStore()

const logout = async () => {
    try {
        // const token = localStorage.getItem('token');

        // console.log(token)
        // if (!token) {
        //     router.push('/login');
        //     return;
        // }

        // const response = await axios.post('https://localhost:7004/api/User/logout', {}, {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // });

        // console.log(response)

        // localStorage.removeItem('token');
        // router.push('/login');
        await authStore.logout()
    } catch (error) {
        console.error('Error al cerrar sesión:', error.response?.data || error.message);
    }
};
</script>
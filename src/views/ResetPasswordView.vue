<template>
    <Loading v-if="loadingStore.isLoading" class="absolute z-10"/>
    <header class="relative w-full h-237 bg-cover bg-center opacity-90" :style="{ backgroundImage: `url(${Barber})` }">
        <div class="flex items-center justify-center min-h-screen">
            <div class="bg-white p-6 rounded shadow-md w-[40rem] h-[33rem]">
                <h2 class="text-4xl font-bold mb-6 text-center text-black">Cambio de Contraseña</h2>
                <h1 class="text-6xl font-bold font-serif mb-6 text-center text-black">BARBER SHOP</h1>
                <form @submit.prevent="resetPassword">
                    <div class="mb-8">
                        <label class="block text-black mb-2">Nueva Contraseña:</label>
                        <Password v-model="password" :feedback="false" toggleMask
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required placeholder="Nueva Contraseña:" />
                    </div>
                    <div class="mb-8">
                        <label class="block text-black mb-2">Confirmar Nueva Contraseña:</label>
                        <Password v-model="confirmPassword" :feedback="false" toggleMask
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required placeholder="Confirmar Nueva Contraseña:" />
                    </div>
                    <button type="submit"
                        class="w-full bg-[#AB9385] text-white py-3 rounded hover:bg-[#85736a] transition duration-200" :disabled="loading">
                        {{ loading ? 'Cambiado contraseña' : "Cambiar contraseña" }}
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import Barber from "../assets/img/Barbershop.jpg";
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Password } from "primevue";
import Loading from "@/components/common/Loading.vue";
import { useLoadingStore } from "@/stores/loadingStore";
import { useAuthStore } from "@/stores/AuthStore";

const password = ref('');
const confirmPassword = ref('');
const route = useRoute();
const router = useRouter();
const loading = ref(false)
const loadingStore = useLoadingStore()
const authStore = useAuthStore()

const resetPassword = async () => {
    if (password.value !== confirmPassword.value) {
        Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
        return;
    }

    const token = route.params.token

    loadingStore.startLoading()
    try {
        await authStore.ResetPassword(password.value, confirmPassword.value, token)

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Contraseña Cambiada',
                text: 'Tu contraseña ha sido cambiada.',
                timer: 1500,
                showConfirmButton: false
            });

            setTimeout(() => {
                router.push('/login');
            }, 1500)
        }, 0)

    } catch (err) {
        Swal.fire('Error', 'Hubo un problema al cambiar la contraseña.', 'error');
    } finally {
        loadingStore.stopLoading()
    }
};
</script>

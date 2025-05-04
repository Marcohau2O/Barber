<template>
    <Loading v-if="loadingStore.isLoading" class="absolute z-10"/>
    <header class="relative w-full h-237 bg-cover bg-center opacity-90" :style="{ backgroundImage: `url(${Barber})` }">
        <div class="flex items-center justify-center min-h-screen">
            <div class="bg-white p-8 rounded shadow-md w-[40rem] h-[30rem]">
                <h2 class="text-4xl font-bold mb-6 text-center text-black">Iniciar Sesión</h2>
                <h1 class="text-6xl font-bold font-serif mb-8 text-center text-black">BARBER SHOP</h1>
                <form @submit.prevent="login">
                    <div class="mb-8">
                        <FloatLabel>
                            <InputText v-model="email" type="email" id="email"
                                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                required placeholder="Correo" />
                            <label class="block text-black mb-2" for="email">Correo</label>
                        </FloatLabel>
                    </div>
                    <div class="mb-10">
                        <FloatLabel>
                            <Password v-model="password" type="password" id="password" :feedback="false" toggleMask/>
                            <label class="block text-black mb-2">Contraseña</label>
                    </FloatLabel>
                    </div>

                    <div class="mb-5 flex items-center justify-center">
                        <RouterLink to="/resertpassword" class="pl-3 font-black text-[#AB9385] underline">¿Olvide la
                            Contraseña?</RouterLink>
                        <RouterLink to="/register" class="pl-3 font-black text-[#AB9385] underline">Registarme
                        </RouterLink>
                    </div>
                    <!-- <RouterLink to="/home" class="pl-3 font-black text-[#AB9385] underline">Entrar a home</RouterLink> -->
                    <button type="submit"
                        class="w-full bg-[#AB9385] text-white py-3 rounded hover:bg-[#85736a] transition duration-200">
                        Iniciar Sessión
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import Barber from "../assets/img/Barbershop.jpg"
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import axios from 'axios';
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/AuthStore"
import { useLoadingStore } from "@/stores/loadingStore";
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Loading from "@/components/common/Loading.vue";

const email = ref('');
const password = ref('');
const error = ref('');
// const router = useRouter();
const authStore = useAuthStore()
const loadingStore = useLoadingStore()

const login = async () => {

    loadingStore.startLoading()

    try {
        await authStore.login(email.value, password.value);
    } catch (error) {
        console.error('Error during login', error);
    } finally {
        loadingStore.stopLoading()
    }
};
</script>

<style scoped>
.loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
<template>
    <Loading v-if="loadingStore.isLoading" class="absolute z-10"/>
    <header class="relative w-full h-237 bg-cover bg-center opacity-90" :style="{ backgroundImage: `url(${Barber})` }">
        <div class="flex items-center justify-center min-h-screen">
            <div class="bg-white p-6 rounded shadow-md w-[40rem] h-[27rem]">
                <h2 class="text-4xl font-bold mb-6 text-center text-black">Recuperar Contraseña</h2>
                <h1 class="text-6xl font-bold font-serif mb-6 text-center text-black">BARBER SHOP</h1>
                <form @submit.prevent="submitEmail">
                    <div class="mb-8">
                        <label class="block text-black mb-2" for="email">Correo: <p class="font-black text-red-700">
                                Agregar el correo Vinculado con el Usuario</p></label>
                        <InputText v-model="email" type="email" id="email"
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required placeholder="Correo" />
                    </div>
                    <div class="mb-5 flex items-center justify-center">
                        <RouterLink to="/login" class="pl-3 font-black text-[#AB9385] underline">Atras</RouterLink>
                        <!-- <RouterLink to="/register" class="pl-3 font-black text-[#AB9385] underline">Registarme </RouterLink> -->
                    </div>
                    <button type="submit"
                        class="w-full bg-[#AB9385] text-white py-3 rounded hover:bg-[#85736a] transition duration-200" :disabled="loading">
                        {{ loading ? 'Enviando...' : 'Enviar Correo de Recuperación' }}
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>


<script setup lang="ts">
import Barber from "../assets/img/Barbershop.jpg"
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from "sweetalert2";
import { InputText } from "primevue";
import Loading from "@/components/common/Loading.vue";
import { useLoadingStore } from "@/stores/loadingStore";
import { useAuthStore } from "@/stores/AuthStore";

const email = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();
const loadingStore = useLoadingStore();
const authStore = useAuthStore();

const submitEmail = async () => {
    loadingStore.startLoading()

    try {
        const response = await authStore.SendMail(email.value)
         
        // console.log('Respuesta del api' + response)

        setTimeout(() => {
            Swal.fire({
            icon: 'success',
            title: 'Correo enviado correctamente',
            timer: 1500,
            text: 'Correo de recuperación enviado con éxito. Revisa tu bandeja de entrada.',
            showConfirmButton: false
        });

        setTimeout(() => {
            router.push('/login');
        }, 1500);
        }), 0;

    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error al enviar el correo',
            text: 'Ocurrió un error al enviar el correo de recuperación. Intente nuevamente.'
        })
    } finally {
        loadingStore.stopLoading()
    }
};
</script>
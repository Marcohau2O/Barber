<template>
    <Loading v-if="loadingStore.isLoading" class="absolute z-10"/>
    <header class="relative w-full h-237 bg-cover bg-center opacity-90" :style="{ backgroundImage: `url(${Barber})` }">
        <div class="flex items-center justify-center min-h-screen">
            <div class="bg-white p-6 rounded shadow-md w-[40rem] h-[39rem]">
                <h2 class="text-4xl font-bold mb-6 text-center text-black">Registro</h2>
                <h1 class="text-6xl font-bold font-serif mb-6 text-center text-black">BARBER SHOP</h1>
                <form @submit.prevent="register">
                    <div class="mb-8">
                        <FloatLabel>
                            <InputText type="name" id="name" v-model="name"
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"/>
                            <label class="block text-black mb-2" for="name">Nombre Usuario</label>
                        </FloatLabel>
                    </div>
                    <div class="mb-8">
                        <FloatLabel>
                        <InputText type="email" id="email" v-model="email"
                            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"/>
                            <label class="block text-black mb-2" for="email">Correo Electronico</label>
                        </FloatLabel>
                    </div>
                    <div class="mb-8">
                        <FloatLabel>
                        <Password type="password" id="password" v-model="password" :feedback="false" toggleMask/>
                            <label class="block text-black mb-2">Contraseña</label>
                        </FloatLabel>
                    </div>
                    <div class="mb-4">
                        <FloatLabel>
                        <Password type="password" id="ConfirmPassword" v-model="confirmPassword" :feedback="false" toggleMask/>
                            <label class="block text-black mb-2">Confirma Contraseña</label>
                        </FloatLabel>
                    </div>

                    <div class="mb-5 flex items-center justify-center">
                        <!-- <RouterLink to="/resertpassword" class="pl-3 font-black text-[#AB9385] underline">¿Olvide la
                            Contraseña?</RouterLink> -->
                        <RouterLink to="/login" class="pl-3 font-black text-[#AB9385] underline">Tengo Cuenta
                        </RouterLink>
                    </div>
                    <button type="submit"
                        class="w-full bg-[#AB9385] text-white py-3 rounded hover:bg-[#85736a] transition duration-200"
                        :disabled="loading">
                        <span v-if="loading" class="loader mr-2"></span>
                        {{ loading ? 'Registrando...' : 'Crear Cuenta' }}
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import Barber from "../assets/img/Barbershop.jpg"
import { RouterLink } from "vue-router";
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Swal from "sweetalert2";
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { useAuthStore } from "@/stores/AuthStore"
import { useLoadingStore } from "@/stores/loadingStore";
import Loading from "@/components/common/Loading.vue";

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
//const usertype = ref('user')
const error = ref('');
const loading = ref(false);
const router = useRouter();
const authStore = useAuthStore()
const loadingStore = useLoadingStore()

const register = async () => {
    // Validación de contraseñas
    if (password.value !== confirmPassword.value) {
        Swal.fire({
            icon: 'error',
            title: 'Las Contraseñas no coinciden',
            text: 'Las contraseñas no coinciden. Por favor, revisa la contraseña'
        });
        // error.value = 'Las contraseñas no coinciden.';
        return;
    }

    loadingStore.startLoading()

    try {
        await authStore.register(
            name.value,
            email.value,
            //usertype: usertype.value,
            password.value,
            confirmPassword.value
        )
        // console.log('Respuesta de la api:' + response);
        router.push('/login')
    } catch (err) {
        console.error('Error during register', err)
    } finally {
        loadingStore.stopLoading()
    }
};
</script>

<!-- <style scoped>
.loader {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #AB9385;
    border-radius: 50%;
    width: 20px;
    height: 20px;
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
</style> -->
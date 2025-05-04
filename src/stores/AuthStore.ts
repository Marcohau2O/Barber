import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { LoginService, LogoutService, RegisterServices, SendMailService, ResertPasswordService } from "@/services/AuthService";
import type { User} from '@/interfaces/User'
import { setToken as saveTokenToStorage, getToken, clearToken } from "@/utils/tokenStorage";
import { setToken } from "@/utils/tokenStorage";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";


export const useAuthStore = defineStore('auth', () => {
    const user = ref({} as User)
    const token = ref(getToken())
    const isLoggedIn = computed(() => token.value !== '' && token.value !== undefined)

    const router = useRouter();
    
    async function login(email: string, password: string) {
        try {
            const response = await LoginService(email, password)
            if (response && response.token && response.role) {
                user.value = response.user || {}
                token.value = response.token

                saveTokenToStorage(response.token)

                if ( response.role === 'admin') {
                    router.push("/admin-dashboard")
                } else {
                    router.push('/home')
                }
            }

        } catch (error: any) {
            if (error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: "Credenciales Incorrectas",
                    text: "El nombre del Usuario o Contraseña es incorrecto. Por favor, inténtalo de nuevo."
                })
                console.error('Error in login:', error)
            }
        }
    }

    async function register(
        name: string,
        email: string,
        password: string,
        confirmPassword: string
    ) {
        try{
            const response = await RegisterServices(name, email, password, confirmPassword)
            if (response?.status === 200) {
                router.push('/login')
            }
        } catch (error: any) {
            console.error('Error in register', error)
            if(error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: "Correo inválido",
                    text: "El correo ingresado ya se encuentra registrado en otra cuenta",
                    confirmButtonColor: "blue"
                })
            }
        }
    }

    watch(token, (newValue) => {
        if (newValue === '' || newValue === undefined) {
            logout()
            router.push('/login')
        }
    })

    async function logout() {
        try {
            const response = await LogoutService()
            if (response?.status === 200) {
                user.value = {} as User
                clearToken()
                router.push('/login')
            }
        } catch (error: any) {
            console.error('Error in logout', error)
        }
    }

    async function SendMail(email: string) {
        try {
            const response = await SendMailService(email)
            if (response?.status === 200) {
                router.push('/login')
            }
        } catch (error: any) {
            console.error("Error in SendMail")
        }
    }

    async function ResetPassword(newPassword: string, newConfirmPassword: string, token: string) {
        try {
            const response = await ResertPasswordService(newPassword, newConfirmPassword, token)
            if (response?.status === 200) {
                router.push('/login')
            }
        } catch (error: any) {
            console.error("Error in ResetPassword")
        }
    }

    return { user, token, isLoggedIn, login, register, logout, SendMail, ResetPassword}
})
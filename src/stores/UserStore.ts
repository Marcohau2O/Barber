import { ref } from 'vue'
import { defineStore } from 'pinia'
import { createAppointmentService, getUserAppointmentsService, getUserByIdWService, updateUserByIdService } from '@/services/UserService'
import type { User } from '@/interfaces/User'
import type { Appointment } from '@/interfaces/Appointment'

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)
    const appointments = ref<Appointment[]>([])

    async function getUserById() {
        try {
            const response = await getUserByIdWService()
            if (response?.status === 200) {
                user.value = response.data ?? null
            }
        } catch (error: any) {
            console.error(error)
        }
    }

    async function updateUserById(name: string, email: string) {
        try {
            const response = await updateUserByIdService(name, email)
            if (response?.status === 200) {
            }
        } catch (error: any) {
            console.error(error)
        }
    }

    async function createAppointment(name: string, phone: string, date: number, time: number) {
        try {
            const response = await createAppointmentService(name, phone, date, time)
            if (response?.status === 200) {
                console.log('Creacion de la cita', response.data)
            }
        } catch (error: any) {
            console.error(error)
        }
    }

    async function getUserAppointments() {
        try {
            const response = await getUserAppointmentsService()
            if (response?.status === 200) {
                appointments.value = response.data?.appointments ?? null
            }
        } catch (error: any) {
            console.error(error)
        }
    }

    return { user, appointments, getUserById, updateUserById, createAppointment, getUserAppointments }
})
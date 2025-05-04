import { defineStore } from "pinia";
import { ref } from 'vue'
import { deleteUserService, getAllAppointmentsService, getAllUsersService, updateStatusService, updateUserService } from "@/services/AdministradorService";

export const useAdministradorStore = defineStore('AdminStore', () => {
    const users = ref([]);
    const totalCitas = ref(0);
    const citasPendientes = ref(0);
    const citasConfirmadas = ref(0);
    const appointments = ref([]);

    async function getAllUsers() {
    try {
        const response = await getAllUsersService();

        if (response && Array.isArray(response)) {
            users.value = response; // Asigna directamente la respuesta si es un array
        }
    } catch (error: any) {
        console.error("Error al obtener usuarios:", error);
    }
}

    async function deleteUser(id:number) {
        try {
            const response = await deleteUserService(id);
            getAllUsers()
            return response
        } catch (error: any) {
            console.error("Error al obtener usuarios:", error);
        }
    }

    async function getAllAppointment() {
        try {
            const response = await getAllAppointmentsService();
            totalCitas.value = response.totalCitas;
            citasPendientes.value = response.citasPendientes;
            citasConfirmadas.value = response.citasConfirmadas;
            appointments.value = response.appointments;

        } catch (error: any) {
            console.error("Error al obtener las citas:", error);
        }
    }

    async function updateUser(updateUser: any) {
        try {
            const response = await updateUserService(updateUser);
            getAllUsers()
            return response
        } catch (error: any) {
            console.error("Error al obtener las citas:", error);
        }
    }

    async function updateAppointmentStatus(id: number, status: string) {
        try {
            const response = await updateStatusService(id, status);
            getAllAppointment();
            return response
        } catch (error: any) {
            console.error("Error al obtener las citas:", error);
        }
    }

    return { users, totalCitas, citasPendientes, citasConfirmadas, appointments, getAllAppointment, getAllUsers, updateUser, updateAppointmentStatus, deleteUser }
})
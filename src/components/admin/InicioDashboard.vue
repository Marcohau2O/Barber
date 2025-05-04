<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-[2rem]">
        <div class="p-3">
            <h1 class="text-2xl font-bold text-white text-left rtl:text-right">
                Hello Admin, Welcome {{ admin.name }}
            </h1>
            <p class="mt-2 text-sm text-gray-400">
                Descripciones
            </p>
        </div>

        <div class="grid grid-cols-3 gap-4 p-4">
            <div class="bg-white text-black rounded-lg flex flex-col items-center">
                    <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-[10rem]" />
                <p class="mt-2 font-semibold">Cantidad Pendientes</p>
            </div>
            <div class="bg-white text-black p-4 rounded-lg flex flex-col items-center">
                    <Chart type="doughnut" :data="chartData2" :options="chartOptions2" class="w-[10rem]" />
                <p class="mt-2 font-medium">Cantidad Confirmadas</p>
            </div>
            <div class="bg-white text-black p-4 rounded-lg flex flex-col items-center justify-center">
                    <h2 class="text-lg font-semibold">Cantidad de Citas</h2>
                    <h1 class="text-4xl font-bold">{{ AdminStore.totalCitas }}</h1>
            </div>
            <div class="col-span-3 bg-white text-black p-4 rounded-lg">
                <h2 class="text-xl font-semibold mb-4 text-gray-800">Calendario de Citas</h2>
                <div class="overflow-auto max-h-[800px]">
                    <FullCalendar :options="calendarOptions" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Chart from 'primevue/chart';
import { ref, onMounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useAdministradorStore } from '@/stores/AdministradorStore';

const AdminStore = useAdministradorStore();

const admin = ref({
  name: 'Marco Hau'
})

const appointments = ref([]);

const calendarOptions = ref({
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
})

const chartData = ref();
const chartOptions = ref(null) 

const chartData2 = ref();
const chartOptions2 = ref(null) 

onMounted(async() => {
    await AdminStore.getAllAppointment();
    chartData.value = {
        labels: ["Pendientes"],
        datasets: [
            {
                data: [AdminStore.citasPendientes],
                backgroundColor: ["#F59E0B"],
                hoverBackgroundColor: ["#D97706"]
            }
        ]
    };

    chartData2.value = {
        labels: ["Confirmadas"],
        datasets: [
            {
                data: [AdminStore.citasConfirmadas],
                backgroundColor: ["#10B981"],
                hoverBackgroundColor: ["#059669"]
            }
        ]
    }
    chartOptions.value = setChartOptions();
    chartOptions2.value = setChartOptions2();

    calendarOptions.value.events = AdminStore.appointments
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()) // Ordena por fecha
    .map(app => ({
        title: `${app.status} - ${app.name}`,
        start: new Date(`${app.date}T${app.time}`).toISOString(),
        extendedProps: {
            phone: app.phone
        }
    }));

    console.log("Eventos asignados al calendario:", calendarOptions.value.events);
})

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            Legend: {
                labels: {
                    cutout: '60%',
                    color: textColor
                }
            }
        }
    };
};

const setChartOptions2 = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            Legend: {
                labels: {
                    cutout: '60%',
                    color: textColor
                }
            }
        }
    };
};
</script>
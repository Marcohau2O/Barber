<template>
    <!-- Estado de carga -->
    <!-- Eliminado, ya no es necesario -->

    <!-- Mensaje de error -->
    <!-- Eliminado, ya no es necesario -->

    <!-- Contenido principal -->
    <div class="p-6">
    <div v-if="roles.length === 0" class="text-center text-gray-500">
        No hay roles registrados
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div
        v-for="rol in roles"
        :key="rol.id"
        class="bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
        >
        <div class="p-5 sm:p-6">
            <!-- Encabezado -->
            <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">{{ rol.nombre }}</h3>
            <span class="px-2 py-1 bg-emerald-100 text-emerald-600 text-xs rounded-full">
                Activo
            </span>
            </div>

            <!-- Descripción -->
            <p class="text-sm text-gray-600 leading-relaxed mb-4">
            {{ rol.descripcion }}
            </p>

            <!-- Acciones -->
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 border-t border-gray-100 pt-4">
            <button
                @click="editarRol(rol.id)"
                class="flex-1 px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg flex items-center justify-center gap-2"
            >
                Editar
            </button>
            <button
                @click="eliminarRol(rol.id)"
                class="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center gap-2"
            >
                Eliminar
            </button>
            </div>
        </div>
        </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Datos ficticios
  const roles = ref([
    {
      id: 1,
      nombre: 'Administrador',
      descripcion: 'Rol con todos los permisos.',
    },
    {
      id: 2,
      nombre: 'Usuario',
      descripcion: 'Acceso limitado a ciertas secciones.',
    }
  ])
  
  // Simular funciones
  const editarRol = (id) => {
    console.log('Editar rol con ID:', id)
    // Aquí podrías abrir un modal o redirigir
  }
  
  const eliminarRol = (id) => {
    roles.value = roles.value.filter(rol => rol.id !== id)
  }
  </script>
  
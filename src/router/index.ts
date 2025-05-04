import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import AdminDashboardView from '@/views/AdminDashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () =>import('../views/InicioView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/resertpassword',
      name: 'resertpassword',
      component: () => import('../views/ResertPasswordView.vue'),
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: () => import('../views/ResetPasswordView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      //meta: { requiresAuth: true, role: 'user' }
    },
    {
      path: '/quienessomo',
      name: 'quienessomo',
      component: () => import('../views/QuienSomosView.vue'),
      //meta: { requiresAuth: true, role: 'user' }
    },
    {
      path: '/servicios',
      name: 'servicios',
      component: () => import('../views/ServiciosView.vue'),
      //meta: { requiresAuth: true, role: 'user' }
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/PerfilView.vue'),
      //meta: { requiresAuth: true, role: 'user' }
    },
    {
      path: '/citas',
      name: 'citas',
      component: () => import('../views/CitasView.vue'),
      //meta: { requiresAuth: true, role: 'user' }
    },
    {
      path: '/admin-dashboard',
      component: AdminDashboardView,
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../components/admin/InicioDashboard.vue')
        },
        {
          path: 'adminUser',
          name: 'admin-user',
          component: () => import('../components/admin/UserCount.vue')
        },
        {
          path: 'adminAppointment',
          name: 'admin-appointment',
          component: () => import('../components/admin/Appointment.vue')
        },
        {
          path: 'adminRoles',
          name: 'admin-roles',
          component: () => import('../components/admin/rolList.vue')
        }
      ]
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const publicRoutes = ['login', 'register', 'resertpassword', 'reset-password']

  if(!publicRoutes.includes(to.name) && !authStore.isLoggedIn) {
    next('/login')
  } else {
    next();
  }
})

export default router

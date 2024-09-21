import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import LoginPage from '@/pages/LoginPage.vue'
import AdmPage from '@/pages/AdmPage.vue'
import TimeLine from '@/pages/TimeLine.vue'
import { useUserStore } from '@/stores/userStore'

const routes = [
  {
    path: '/',
    component: HomeView 
  },
  { path: '/login', component: LoginPage },
  { path: '/adm', component: AdmPage, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/timeline', component: TimeLine, meta: { requiresAuth: true } }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const role = userStore.user?.role?.name

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return next('/login')
  }

  if (to.meta.requiresAdmin && role !== 'admin') {
    return next('/')
  }

  if (to.path === '/login' && userStore.isAuthenticated) {
    if (role === 'admin') {
      return next('/adm')
    } else {
      return next('/timeline')
    }
  }

  next()
})


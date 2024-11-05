import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Cadastro from '@/views/Cadastro.vue';
import Aplicativo from '@/views/Aplicativo.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/login', name: 'login', component: Login },
    { path: '/', name: 'home', component: Home },
    { path: '/cadastro', name: 'cadastro', component: Cadastro },
    { 
      path: '/aplicativo', 
      name: 'aplicativo', 
      component: Aplicativo,
      meta: { requiresAuth: true },
    },
  ];

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;

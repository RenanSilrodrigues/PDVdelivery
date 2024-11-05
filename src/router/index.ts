import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Cadastro from '../views/Cadastro.vue';
import Aplicativo from '../views/Aplicativo.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/', name: 'home', component: Home },
    { path: '/cadastro', name: 'cadastro', component: Cadastro },
    { path: '/aplicativo', name: 'aplicativo', component: Aplicativo }
  ],
})

export default router

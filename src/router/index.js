import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Cadastro from '../views/Cadastro.vue';
import Aplicativo from '../views/Aplicativo.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro,
  },
  {
    path: '/aplicativo',
    name: 'aplicativo',
    component: Aplicativo,
    meta: { requiresAuth: true } // Protegendo a página inicial
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Verifica se o usuário está logado
    if (!store.state.isAuthenticated) {
      // Se não estiver logado, redireciona para a página de login
      next({ name: 'login' });
    } else {
      next(); // Se estiver logado, permite o acesso
    }
  } else {
    next(); // Para rotas que não requerem autenticação
  }
});

export default router;

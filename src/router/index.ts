import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@views/HomeView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      requireToken: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@views/LoginView.vue'),
    meta: {
      requireToken: false,
    },
  },
  {
    path: '/resetPwd',
    name: 'resetPwd',
    component: () => import(/* webpackChunkName: "resetPwd" */ '@views/ResetPwd.vue'),
    meta: {
      requireToken: false,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@views/RegisterView.vue'),
    meta: {
      requireToken: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireToken) {
    const token = sessionStorage.getItem('token');
    if (!token) {
      next('/login');
    } else next();
  } else next();
});

export default router;

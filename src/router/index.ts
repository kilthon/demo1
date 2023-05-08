import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@views/HomeView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@views/LoginView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path != '/login') {
    const token = sessionStorage.getItem('token');
    if (!token) next('/login');
    else next();
  } else next();
});

export default router;

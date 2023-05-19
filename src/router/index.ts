import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import { storeToRefs } from 'pinia';
import { pinia, useUserStore } from '@/store';
import { genRoute } from '@/util/route';
// import HomeView from '@views/HomeView.vue';
import WorkSpace from '@views/Workspace/WorkspaceView.vue';
import LayoutIdxVue from '@/layouts/LayoutIdx.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: LayoutIdxVue,
    redirect: '/WorkSpace',
    children: [
      {
        path: '/WorkSpace',
        name: 'WorkSpace',
        component: WorkSpace,
        meta: {
          requireToken: true,
        },
      },
    ],
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
  {
    path: '/404',
    name: 'notFound',
    component: () => import(/* webpackChunkName: "notFound" */ '@views/NotFound.vue'),
    meta: {
      requireToken: false,
    },
  },
  {
    path: '/:W+',
    component: () => import(/* webpackChunkName: "baseLayout" */ '@/layouts/BaseLayout.vue'),
    name: 'BaseLayout',
    redirect: '/404',
    meta: {
      hidden: true,
    },
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore(pinia);
  if (to.fullPath === '/login' || to.fullPath === '/register') {
    next();
  } else {
    if (to.meta.requireToken === false && to.redirectedFrom === undefined) {
      next();
    } else {
      const token = sessionStorage.getItem('token');
      if (!token) {
        next('/login');
      } else {
        const dynRoutes = genRoute(userStore.menu);
        dynRoutes.forEach((item) => router.addRoute(item));
        if (router.getRoutes().findIndex((route) => route.path === to.path) !== -1) {
          if (
            to.fullPath === '/404' &&
            to.redirectedFrom !== undefined &&
            router.getRoutes().findIndex((route) => route.path === to.redirectedFrom?.fullPath) !==
              -1 &&
            routes.findIndex((item) => item.path === to.redirectedFrom?.fullPath) === -1
          ) {
            next({ path: to.redirectedFrom.fullPath, replace: true });
          } else {
            next();
          }
        } else {
          next('/');
        }
      }
    }
  }
});

export default router;

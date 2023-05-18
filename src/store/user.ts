import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { userType } from '@/types/user';
import { generateRoutes } from '@/util/route';
import { RouteRecordRaw } from 'vue-router';
import router from '@/router';
import { getMenuApi } from '@/api';

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      isLogin: ref(false),
      menu: reactive([] as any[]),
      userRoutes: reactive([] as RouteRecordRaw[]),
      users: [] as any[],
      user: {},
    };
  },
  actions: {
    genRoute() {
      const routes = generateRoutes('', this.menu);
      this.userRoutes = routes;
      routes.forEach((item) => router.addRoute(item));
    },
    getMenu(token: string, genRoute: boolean) {
      getMenuApi({ token: token }).then((res) => {
        if (res) {
          this.menu = res.menu;
          if (genRoute) this.genRoute();
        }
      });
    },
    async register(user: userType) {
      console.log(user, 'user register');
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'menu',
        storage: sessionStorage,
        paths: ['menu'],
      },
      {
        key: 'isLogin',
        storage: sessionStorage,
        paths: ['isLogin'],
      },
    ],
  },
});

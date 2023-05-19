import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { userType } from '@/types/user';
// import { generateRoutes } from '@/util/route';
// import { RouteRecordRaw } from 'vue-router';
// import router from '@/router';
// import { getMenuApi } from '@/api';

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      isLogin: ref(false),
      menu: reactive([] as any[]),
      users: [] as any[],
      user: {},
    };
  },
  actions: {
    setMenu(menu: [object]) {
      this.menu = menu;
    },
    setLogin(isLogin: boolean) {
      this.isLogin = isLogin;
    },
    setAccess() {
      console.log(this.menu);
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

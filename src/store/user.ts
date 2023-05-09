import { defineStore } from 'pinia';
import type { userType } from '@/types/user';

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      users: [],
      user: {},
    };
  },
  actions: {
    async register(user: userType) {
      console.log(user, 'user register');
    },
  },
});

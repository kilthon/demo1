import { defineStore } from 'pinia';
import { userType } from '@/types/user';

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
      await console.log(user, 'user register');
    },
  },
});

import { defineStore } from 'pinia';
import { authApi } from '@loginhub/api-client';
import type { LoginRequest } from '@notesapp/models';

const APP_ID = import.meta.env.VITE_LOGINHUB_APP_ID as string;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('awl_token') || null,
    requirePasswordChange: localStorage.getItem('requirePasswordChange') === 'true',
  }),
  getters: {
    isAuthenticated: () => authApi.isAuthenticated(),
    user: () => authApi.getUser(),
    role: () => authApi.getRole(),
  },
  actions: {
    async login(payload: LoginRequest) {
      const res = await authApi.login(payload.email, payload.password, APP_ID);
      this.token = localStorage.getItem('awl_token');
      this.requirePasswordChange = !!res.requirePasswordChange;
      
      localStorage.setItem('requirePasswordChange', this.requirePasswordChange.toString());
      
      return res;
    },
    async changePassword(novaSenha: string) {
      await authApi.changePassword(novaSenha);
      this.requirePasswordChange = false;
      localStorage.setItem('requirePasswordChange', 'false');
    },
    async refreshToken(): Promise<boolean> {
      const res = await authApi.refresh();
      if (res) {
        this.token = res.token;
        return true;
      }
      return false;
    },
    logout() {
      this.token = null;
      this.requirePasswordChange = false;
      localStorage.removeItem('requirePasswordChange');
      authApi.logout();
    }
  }
});

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import * as authApi from '../services/authApi'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      async signup(payload) {
        const { user, accessToken, refreshToken } = await authApi.signup(payload)
        set({ user, accessToken, refreshToken })
        return user
      },
      async login(payload) {
        const { user, accessToken, refreshToken } = await authApi.login(payload)
        set({ user, accessToken, refreshToken })
        return user
      },
      async logout() {
        await authApi.logout()
        set({ user: null, accessToken: null, refreshToken: null })
      },
      setVerified() {
        const user = get().user
        if (user) set({ user: { ...user, verified: true } })
      },
    }),
    {
      name: 'yap-auth',
      partialize: (s) => ({ user: s.user, accessToken: s.accessToken, refreshToken: s.refreshToken }),
    },
  ),
)

export const selectIsAuthenticated = (s) => Boolean(s.accessToken && s.user)
export const selectIsVerified = (s) => Boolean(s.user?.verified)

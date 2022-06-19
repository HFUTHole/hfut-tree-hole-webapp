import type { State } from 'zustand'
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware/persist'

interface AuthState extends State {
  status: 'login' | 'logout'
  login: () => void
  logout: () => void
}

export const useAuthStore = create(
  persist(
    immer(
      (set) => {
        const status: AuthState['status'] = 'logout'

        const login = () => set((state: AuthState) => {
          state.status = 'login'
        })

        const logout = () => set((state: AuthState) => {
          state.status = 'logout'
        })

        return {
          status,
          login,
          logout,
        }
      },
    )),
)


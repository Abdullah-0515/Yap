import { create } from 'zustand'

function current() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export const useThemeStore = create((set) => ({
  theme: current(),
  toggle() {
    const next = current() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('yap-theme', next) } catch { /* ignore */ }
    set({ theme: next })
  },
}))

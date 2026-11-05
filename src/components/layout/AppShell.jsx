import { Button } from '../ui'
import { useAuthStore } from '../../store/authStore'
import { usePostsStore } from '../../store/postsStore'
import { useThemeStore } from '../../store/themeStore'
import TrendingColumn from './TrendingColumn'

function NavButton({ active, onClick, icon, label }) {
  return (
    <button
      type="button" onClick={onClick} aria-current={active ? 'page' : undefined}
      className={`flex items-center gap-3 rounded-slip border-2 px-3 py-2 text-left font-extrabold md:w-full ${
        active ? 'border-ink bg-hl text-[#14120f] shadow-hard-sm' : 'border-transparent hover:bg-line/60'
      } max-md:flex-1 max-md:flex-col max-md:gap-0.5 max-md:text-[11px]`}
    >
      <span aria-hidden="true" className="text-lg">{icon}</span>
      {label}
    </button>
  )
}

export default function AppShell({ children }) {
  const tab = usePostsStore((s) => s.tab)
  const setTab = usePostsStore((s) => s.setTab)
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggle)

  const nav = (
    <>
      <NavButton active={tab === 'take'} onClick={() => setTab('take')} icon="🔥" label="Hot Takes" />
      <NavButton active={tab === 'confession'} onClick={() => setTab('confession')} icon="🫣" label="Confessions" />
    </>
  )

  return (
    <div className="min-h-screen">
      {/* Left sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-56 flex-col border-r-2 border-ink bg-card p-4 md:flex" aria-label="Main navigation">
        <p className="font-display text-4xl uppercase leading-none">Yap<span className="text-pink">!</span></p>
        <p className="mb-6 -rotate-2 font-marker text-sm text-muted">the campus wall</p>
        <nav className="flex flex-col gap-2">{nav}</nav>
        <div className="mt-auto space-y-2">
          <p className="truncate font-mono text-xs text-muted">{user?.email}</p>
          <Button variant="soft" className="w-full" onClick={logout}>Log out</Button>
        </div>
      </aside>

      {/* Bottom tab bar (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex gap-1 border-t-2 border-ink bg-card p-2 md:hidden" aria-label="Main navigation">
        {nav}
        <NavButton active={false} onClick={logout} icon="👋" label="Out" />
      </nav>

      <div className="md:pl-56 lg:pr-72">
        <main className="mx-auto max-w-2xl px-4 pb-44 pt-6 md:pb-32">
          <div className="mb-4 flex justify-end">
            <Button variant="soft" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              Flip paper
            </Button>
          </div>
          {children}
        </main>
      </div>

      {/* Right trending column (large screens) */}
      <aside className="fixed inset-y-0 right-0 hidden w-72 overflow-y-auto border-l-2 border-ink bg-card/60 p-4 lg:block" aria-label="Trending">
        <TrendingColumn />
      </aside>
    </div>
  )
}

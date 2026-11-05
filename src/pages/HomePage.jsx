import { Button, Card } from '../components/ui'
import { useAuthStore } from '../store/authStore'

// Placeholder: the real feed arrives in the feed milestone.
export default function HomePage() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  return (
    <main className="mx-auto max-w-xl p-5 pt-10">
      <Card tilt={0.6} tape className="p-6 pt-7">
        <h1 className="text-3xl">Hey {user?.name}</h1>
        <p className="mt-2 text-muted">You are in. The feed is coming soon.</p>
        <Button variant="soft" className="mt-4" onClick={logout}>Log out</Button>
      </Card>
    </main>
  )
}

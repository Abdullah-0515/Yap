import AuthShell from '../components/auth/AuthShell'
import { Button } from '../components/ui'
import { useAuthStore } from '../store/authStore'

// Placeholder: the 6-digit OTP flow is built in the next milestone.
export default function VerifyPage() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  return (
    <AuthShell title="Check your inbox" tagline={`We will send a code to ${user?.email}.`}>
      <p className="font-marker text-muted">OTP screen coming in the next milestone.</p>
      <Button variant="soft" className="mt-4" onClick={logout}>Log out</Button>
    </AuthShell>
  )
}

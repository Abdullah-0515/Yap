import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthShell from '../components/auth/AuthShell'
import PasswordInput from '../components/auth/PasswordInput'
import { Button, Input } from '../components/ui'
import { useAuthStore } from '../store/authStore'

export default function LoginPage() {
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()
  const location = useLocation()
  // Dummy prefilled values: login accepts anything in the frontend-only build.
  const [form, setForm] = useState({ email: 'demo@lhr.nu.edu.pk', password: 'password123' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    setErrors({})
    setFormError('')
    setLoading(true)
    try {
      const user = await login(form)
      navigate(user.verified ? location.state?.from?.pathname || '/' : '/verify', { replace: true })
    } catch (err) {
      setFormError(err?.message || 'Something broke. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      tagline="Your hot takes missed you."
      footer={<>New here? <Link to="/signup" className="font-extrabold underline">Sign up</Link></>}
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Input label="University email" type="email" autoComplete="email" placeholder="you@lhr.nu.edu.pk"
          value={form.email} onChange={set('email')} error={errors.email} />
        <PasswordInput label="Password" autoComplete="current-password"
          value={form.password} onChange={set('password')} error={errors.password} />
        {formError && <p role="alert" className="font-marker text-loss">{formError}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Checking...' : 'Log in'}
        </Button>
      </form>
    </AuthShell>
  )
}

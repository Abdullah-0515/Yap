import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/auth/AuthShell'
import PasswordInput from '../components/auth/PasswordInput'
import { Button, Input } from '../components/ui'
import { validateEmail, validateName, validatePassword } from '../lib/validators'
import { useAuthStore } from '../store/authStore'

export default function SignupPage() {
  const signup = useAuthStore((s) => s.signup)
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    const next = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    }
    setErrors(next)
    setFormError('')
    if (next.name || next.email || next.password) return
    setLoading(true)
    try {
      await signup(form)
      navigate('/verify', { replace: true })
    } catch (err) {
      setFormError(err?.message || 'Something broke. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Join the wall"
      tagline="University email only. We check, so no randoms."
      footer={<>Already in? <Link to="/login" className="font-extrabold underline">Log in</Link></>}
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Input label="Name" autoComplete="name" placeholder="What do people call you?"
          value={form.name} onChange={set('name')} error={errors.name} />
        <Input label="University email" type="email" autoComplete="email" placeholder="you@lhr.nu.edu.pk"
          value={form.email} onChange={set('email')} error={errors.email} hint=".edu and .edu.pk addresses work" />
        <PasswordInput label="Password" autoComplete="new-password"
          value={form.password} onChange={set('password')} error={errors.password} />
        {formError && <p role="alert" className="font-marker text-loss">{formError}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Making your account...' : 'Sign up'}
        </Button>
      </form>
    </AuthShell>
  )
}

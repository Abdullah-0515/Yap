import { describe, expect, it } from 'vitest'
import { login, signup } from '../services/authApi'

describe('authApi (dummy)', () => {
  it('signup returns an unverified user needing OTP', async () => {
    const res = await signup({ name: 'Sara', email: 'Sara@lhr.nu.edu.pk', password: 'x' })
    expect(res.user).toMatchObject({ name: 'Sara', email: 'sara@lhr.nu.edu.pk', verified: false })
    expect(res.otpRequired).toBe(true)
    expect(res.accessToken).toBeTruthy()
  })

  it('login accepts anything and returns a verified user', async () => {
    const res = await login({ email: 'anyone@uni.edu', password: 'whatever' })
    expect(res.user.verified).toBe(true)
    expect(res.refreshToken).toBeTruthy()
  })
})

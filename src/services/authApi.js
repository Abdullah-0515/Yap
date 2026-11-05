// DUMMY auth: no real checking. Any login works. The backend will replace this file later.
// Signatures are REST-shaped so only src/services/ needs to change.

const delay = (ms = 300) =>
  import.meta.env.MODE === 'test' ? Promise.resolve() : new Promise((r) => setTimeout(r, ms))

const DUMMY_TOKENS = { accessToken: 'dummy-access-token', refreshToken: 'dummy-refresh-token' }

// TODO(backend): replace with real endpoint  POST /auth/signup
export async function signup({ name, email }) {
  await delay()
  return {
    user: { id: 'u_dummy', name: name.trim(), email: email.trim().toLowerCase(), verified: false },
    ...DUMMY_TOKENS,
    otpRequired: true,
  }
}

// TODO(backend): replace with real endpoint  POST /auth/login
export async function login({ email }) {
  await delay()
  const e = (email || 'demo@lhr.nu.edu.pk').trim().toLowerCase()
  return {
    user: { id: 'u_dummy', name: e.split('@')[0] || 'Demo Student', email: e, verified: true },
    ...DUMMY_TOKENS,
  }
}

// TODO(backend): replace with real endpoint  POST /auth/logout
export async function logout() {
  await delay(100)
  return { ok: true }
}

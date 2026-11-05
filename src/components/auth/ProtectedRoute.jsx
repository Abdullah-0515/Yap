import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore, selectIsAuthenticated, selectIsVerified } from '../../store/authStore'

// Gate for the app: not signed in -> /login, signed in but unverified -> /verify.
export function ProtectedRoute() {
  const authed = useAuthStore(selectIsAuthenticated)
  const verified = useAuthStore(selectIsVerified)
  const location = useLocation()
  if (!authed) return <Navigate to="/login" replace state={{ from: location }} />
  if (!verified) return <Navigate to="/verify" replace />
  return <Outlet />
}

// Gate for /login and /signup: already signed in users bounce forward.
export function PublicOnlyRoute() {
  const authed = useAuthStore(selectIsAuthenticated)
  const verified = useAuthStore(selectIsVerified)
  if (authed) return <Navigate to={verified ? '/' : '/verify'} replace />
  return <Outlet />
}

// /verify requires a session, but not a verified user.
export function UnverifiedOnlyRoute() {
  const authed = useAuthStore(selectIsAuthenticated)
  const verified = useAuthStore(selectIsVerified)
  if (!authed) return <Navigate to="/login" replace />
  if (verified) return <Navigate to="/" replace />
  return <Outlet />
}

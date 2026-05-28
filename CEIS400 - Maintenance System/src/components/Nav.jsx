import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { navBar, navLink, navLogo, navLogoutBtn, colors } from '../styles'

// Top navigation bar. Only shows when someone is logged in.
export default function Nav() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // Login page has no nav — user is null until they sign in
  if (!user) {
    return null
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  const path = location.pathname

  return (
    <nav style={navBar}>
      <Link to="/dashboard" style={navLogo}>
        MMMS
      </Link>

      <div style={{ display: 'flex', gap: '4px' }}>
        <Link to="/dashboard" style={navLink(path === '/dashboard')}>
          Home
        </Link>
        <Link to="/checkout" style={navLink(path === '/checkout')}>
          Check Out
        </Link>
        <Link to="/return" style={navLink(path === '/return')}>
          Return
        </Link>
        {/* Supervisors get an extra tab the regular employees don't see */}
        {user.role === 'supervisor' && (
          <Link to="/supervisor" style={navLink(path === '/supervisor')}>
            Supervisor
          </Link>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
        <span style={{ color: colors.text }}>{user.first_name} {user.last_name}</span>
        <button type="button" onClick={handleLogout} style={navLogoutBtn}>
          Log out
        </button>
      </div>
    </nav>
  )
}

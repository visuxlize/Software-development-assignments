import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const styles = {
  nav: { background: '#1a1a1a', padding: '0 1.5rem', height: '48px',
         display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  brand: { color: '#fff', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', letterSpacing: '0.05em' },
  links: { display: 'flex', gap: '2px' },
  link: { color: '#ccc', textDecoration: 'none', fontSize: '13px', padding: '6px 10px', borderRadius: '4px' },
  activeLink: { color: '#fff', background: '#333', textDecoration: 'none', fontSize: '13px', padding: '6px 10px', borderRadius: '4px' },
  right: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#aaa' },
  logoutBtn: { background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '13px' },
}

export default function Nav() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }
  const isActive = path => location.pathname === path

  if (!user) return null

  return (
    <nav style={styles.nav}>
      <Link to="/dashboard" style={styles.brand}>MMMS</Link>
      <div style={styles.links}>
        <Link to="/dashboard" style={isActive('/dashboard') ? styles.activeLink : styles.link}>Home</Link>
        <Link to="/checkout"  style={isActive('/checkout')  ? styles.activeLink : styles.link}>Check Out</Link>
        <Link to="/return"    style={isActive('/return')    ? styles.activeLink : styles.link}>Return</Link>
        {user.role === 'supervisor' && (
          <Link to="/supervisor" style={isActive('/supervisor') ? styles.activeLink : styles.link}>Supervisor</Link>
        )}
      </div>
      <div style={styles.right}>
        <span style={{ color: '#fff' }}>{user.firstName} {user.lastName}</span>
        &mdash;
        <button onClick={handleLogout} style={styles.logoutBtn}>Log out</button>
      </div>
    </nav>
  )
}

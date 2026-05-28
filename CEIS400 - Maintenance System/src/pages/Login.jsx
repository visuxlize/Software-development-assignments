import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Message from '../components/Message'
import * as s from '../styles'

// Hard-coded accounts so we can test without the real database yet
const TEST_USERS = [
  { id: 'E001', name: 'Carlos' },
  { id: 'E002', name: 'Dana' },
  { id: 'E003', name: 'Mike' },
  { id: 'S001', name: 'Supervisor' },
]

const DEMO_PASSWORD = 'pass1234'

export default function Login() {
  const [empId, setEmpId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await login(empId, password)

      // Supervisors and employees land on different home pages
      if (user.role === 'supervisor') {
        navigate('/supervisor')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'ID not found or password incorrect.')
    } finally {
      setLoading(false)
    }
  }

  // Quick fill for demo — saves typing during presentations
  function fillDemo(id) {
    setEmpId(id)
    setPassword(DEMO_PASSWORD)
  }

  return (
    <div style={s.loginPage}>
      <div style={s.loginBox}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: s.colors.text }}>MMMS</h1>
          <p style={{ fontSize: '13px', color: s.colors.textMuted, marginTop: '4px' }}>
            GB Manufacturing — Maintenance Management System
          </p>
        </div>

        <div style={s.loginCard}>
          <p style={{ fontSize: '13px', color: s.colors.textMuted, marginBottom: '1rem' }}>
            Enter your employee ID and password to log in.
          </p>

          <Message text={error} type="error" />

          <form onSubmit={handleSubmit}>
            <label style={s.label}>Employee ID</label>
            <input
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              placeholder="e.g. E001"
              autoFocus
              autoComplete="off"
              style={s.loginIdInput}
            />

            <label style={s.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={s.loginInput}
            />

            <button
              type="submit"
              disabled={loading}
              style={{ ...s.btn('primary'), width: '100%', padding: '10px' }}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <hr style={s.divider} />

          <p style={{ fontSize: '12px', fontWeight: 'bold', color: s.colors.textMuted, marginBottom: '6px' }}>
            Test logins (password: {DEMO_PASSWORD})
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {TEST_USERS.map((u) => (
              <button key={u.id} type="button" onClick={() => fillDemo(u.id)} style={s.demoChip}>
                {u.id} — {u.name}
              </button>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: s.colors.textDim, marginTop: '1rem' }}>
          CEIS400 · Team 6
        </p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const s = {
  page: { minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  wrap: { width: '100%', maxWidth: '380px', padding: '1rem' },
  title: { textAlign: 'center', marginBottom: '1.5rem' },
  h1: { fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a' },
  sub: { fontSize: '13px', color: '#666', marginTop: '4px' },
  card: { background: '#fff', border: '1px solid #ddd', borderRadius: '6px', padding: '1.5rem' },
  label: { display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#333' },
  input: { width: '100%', padding: '9px 10px', border: '1px solid #ccc', borderRadius: '4px',
           fontSize: '15px', fontFamily: 'monospace', letterSpacing: '0.08em', color: '#1a1a1a',
           marginBottom: '1rem', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '10px', background: '#1a1a1a', color: '#fff', border: 'none',
         borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' },
  error: { background: '#fdecea', borderLeft: '4px solid #c0392b', color: '#7a1c1c',
           padding: '9px 12px', borderRadius: '4px', fontSize: '13px', marginBottom: '1rem' },
  divider: { border: 'none', borderTop: '1px solid #eee', margin: '1rem 0' },
  demoLabel: { fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '6px' },
  chips: { display: 'flex', flexWrap: 'wrap', gap: '5px' },
  chip: { fontFamily: 'monospace', fontSize: '12px', background: '#f0f0f0', border: '1px solid #ccc',
          borderRadius: '3px', padding: '3px 8px', cursor: 'pointer', color: '#333' },
  footer: { textAlign: 'center', fontSize: '12px', color: '#aaa', marginTop: '1rem' },
}

export default function Login() {
  const [empId,    setEmpId]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const user = await login(empId.toUpperCase(), password)
      navigate(user.role === 'supervisor' ? '/supervisor' : '/dashboard')
    } catch {
      setError('ID not found or password incorrect.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <div style={s.title}>
          <h1 style={s.h1}>MMMS</h1>
          <p style={s.sub}>GB Manufacturing — Maintenance Management System</p>
        </div>
        <div style={s.card}>
          <p style={{ fontSize: '13px', color: '#444', marginBottom: '1rem' }}>
            Scan your ID card or type your employee ID and password to log in.
          </p>
          {error && <div style={s.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <label style={s.label}>Employee ID</label>
            <input style={s.input} value={empId} onChange={e => setEmpId(e.target.value)}
                   placeholder="e.g. E001" autoFocus autoComplete="off" />
            <label style={s.label}>Password</label>
            <input style={s.input} type="password" value={password}
                   onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button style={s.btn} type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <hr style={s.divider} />
          <div style={s.demoLabel}>Demo IDs (password: pass1234):</div>
          <div style={s.chips}>
            {[['E001','Carlos'],['E002','Dana'],['E003','Mike'],['S001','Supervisor']].map(([id, name]) => (
              <span key={id} style={s.chip} onClick={() => { setEmpId(id); setPassword('pass1234') }}>
                {id} — {name}
              </span>
            ))}
          </div>
        </div>
        <div style={s.footer}>CEIS400 · Team 6 · Prototype</div>
      </div>
    </div>
  )
}

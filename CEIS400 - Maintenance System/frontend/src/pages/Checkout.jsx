import { useState, useEffect } from 'react'
import api from '../api/client'

const s = {
  page: { maxWidth: '960px', margin: '0 auto', padding: '1.75rem 1.25rem' },
  header: { marginBottom: '1.5rem' },
  h1: { fontSize: '20px', fontWeight: 'bold' },
  sub: { fontSize: '13px', color: '#666', marginTop: '3px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  card: { background: '#fff', border: '1px solid #ddd', borderRadius: '6px', padding: '1.25rem' },
  cardTitle: { fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' },
  label: { display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' },
  input: { width: '100%', padding: '8px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', marginBottom: '1rem', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '9px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' },
  alert: (type) => ({ padding: '10px 14px', borderRadius: '4px', fontSize: '13px', marginBottom: '1rem', borderLeft: `4px solid ${type === 'success' ? '#2a7a4b' : '#c0392b'}`, background: type === 'success' ? '#e6f4ec' : '#fdecea', color: type === 'success' ? '#1e5c38' : '#7a1c1c' }),
  toolGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: '8px' },
  toolCard: { border: '1px solid #ddd', borderRadius: '5px', padding: '10px 12px', background: '#fff', cursor: 'pointer' },
  toolId: { fontSize: '11px', color: '#888', fontFamily: 'monospace' },
  toolName: { fontSize: '13px', fontWeight: 'bold', margin: '3px 0 5px' },
  badge: { display: 'inline-block', padding: '2px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 'bold', background: '#e6f4ec', color: '#1e6b3a', border: '1px solid #b8dfc8' },
}

export default function Checkout() {
  const [equipId,   setEquipId]   = useState('')
  const [available, setAvailable] = useState([])
  const [message,   setMessage]   = useState(null)
  const [msgType,   setMsgType]   = useState('success')

  // Fetch all equipment and keep only those with quantAvail > 0
  const loadAvailable = () =>
    api.get('/equipment/')
      .then(r => setAvailable(r.data.filter(t => t.quantAvail > 0)))
      .catch(() => {})

  useEffect(() => { loadAvailable() }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage(null)
    try {
      const res = await api.post('/equipment/checkout/', { equipID: equipId })
      setMessage(res.data.message)
      setMsgType('success')
      setEquipId('')
      loadAvailable()
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong.')
      setMsgType('error')
    }
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.h1}>Check Out Equipment</h1>
        <p style={s.sub}>Scan a tool barcode or pick one from the list below.</p>
      </div>
      {message && <div style={s.alert(msgType)}>{message}</div>}
      <div style={s.grid2}>
        <div style={s.card}>
          <div style={s.cardTitle}>Scan or enter tool ID</div>
          <form onSubmit={handleSubmit}>
            <label style={s.label}>Tool ID</label>
            <input
              style={s.input}
              value={equipId}
              onChange={e => setEquipId(e.target.value)}
              placeholder="e.g. T001"
              autoFocus
              autoComplete="off"
            />
            <button style={s.btn} type="submit">Check Out</button>
          </form>
        </div>
        <div style={s.card}>
          <div style={s.cardTitle}>Available tools — click to fill</div>
          <div style={s.toolGrid}>
            {available.map(t => (
              <div key={t.equipID} style={s.toolCard} onClick={() => setEquipId(t.equipID)}>
                <div style={s.toolId}>{t.equipID}</div>
                <div style={s.toolName}>{t.equipName}</div>
                <span style={s.badge}>Available ({t.quantAvail})</span>
              </div>
            ))}
            {available.length === 0 && (
              <p style={{ color: '#888', fontSize: '13px' }}>No tools available right now.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

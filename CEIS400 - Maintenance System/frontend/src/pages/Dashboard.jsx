import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/client'

const s = {
  page: { maxWidth: '960px', margin: '0 auto', padding: '1.75rem 1.25rem' },
  header: { marginBottom: '1.5rem' },
  h1: { fontSize: '20px', fontWeight: 'bold' },
  sub: { fontSize: '13px', color: '#666', marginTop: '3px' },
  grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  stat: { background: '#fff', border: '1px solid #ddd', borderRadius: '6px', padding: '1rem', textAlign: 'center', cursor: 'pointer' },
  statNum: { fontSize: '28px', fontWeight: 'bold' },
  statLabel: { fontSize: '12px', color: '#888', marginTop: '3px' },
  card: { background: '#fff', border: '1px solid #ddd', borderRadius: '6px', padding: '1.25rem', marginBottom: '1rem' },
  cardTitle: { fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
  th: { textAlign: 'left', padding: '7px 10px', fontSize: '11px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase', borderBottom: '2px solid #ddd' },
  td: { padding: '9px 10px', borderBottom: '1px solid #eee' },
  badge: { display: 'inline-block', padding: '2px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 'bold', background: '#fff3e0', color: '#7a4500', border: '1px solid #f0c080' },
  btn: { display: 'inline-block', padding: '5px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', textDecoration: 'none', color: '#1a1a1a' },
  linkBtn: { display: 'inline-block', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none', color: '#1a1a1a', border: '1px solid #ccc', background: '#fff' },
}

export default function Dashboard() {
  const { user } = useAuth()
  const [myTools, setMyTools] = useState([])

  useEffect(() => {
    api.get('/equipment/mine/').then(r => setMyTools(r.data)).catch(() => {})
  }, [])

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.h1}>Welcome, {user?.firstName}</h1>
        <p style={s.sub}>What would you like to do today?</p>
      </div>

      <div style={s.grid3}>
        <div style={s.stat}>
          <div style={{ ...s.statNum, color: myTools.length > 0 ? '#e8a000' : '#2a7a4b' }}>{myTools.length}</div>
          <div style={s.statLabel}>Tools checked out</div>
        </div>
        <Link to="/checkout" style={{ ...s.stat, textDecoration: 'none', color: 'inherit' }}>
          <div style={{ ...s.statNum, fontSize: '18px', paddingTop: '4px' }}>Check Out</div>
          <div style={s.statLabel}>Borrow a tool</div>
        </Link>
        <Link to="/return" style={{ ...s.stat, textDecoration: 'none', color: 'inherit' }}>
          <div style={{ ...s.statNum, fontSize: '18px', paddingTop: '4px' }}>Return</div>
          <div style={s.statLabel}>Return a tool</div>
        </Link>
      </div>

      <div style={s.card}>
        <div style={s.cardTitle}>Your checked-out tools</div>
        {myTools.length > 0 ? (
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Tool ID</th>
                <th style={s.th}>Tool Name</th>
                <th style={s.th}>Status</th>
                <th style={s.th}></th>
              </tr>
            </thead>
            <tbody>
              {myTools.map(t => (
                <tr key={t.equipID}>
                  <td style={{ ...s.td, fontFamily: 'monospace', color: '#888', fontSize: '12px' }}>{t.equipID}</td>
                  <td style={{ ...s.td, fontWeight: '500' }}>{t.equipName}</td>
                  <td style={s.td}><span style={s.badge}>Checked Out</span></td>
                  <td style={s.td}><Link to="/return" style={s.btn}>Return</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#888', fontSize: '13px' }}>You don't have any tools checked out right now.</p>
        )}
      </div>

      <div style={s.grid2}>
        <div style={s.card}>
          <div style={s.cardTitle}>Check out a tool</div>
          <p style={{ color: '#666', marginBottom: '1rem', fontSize: '14px' }}>Scan a barcode or browse available tools.</p>
          <Link to="/checkout" style={{ ...s.linkBtn, background: '#1a1a1a', color: '#fff', border: 'none' }}>Go to Check Out</Link>
        </div>
        <div style={s.card}>
          <div style={s.cardTitle}>Return a tool</div>
          <p style={{ color: '#666', marginBottom: '1rem', fontSize: '14px' }}>Return any tools you currently have checked out.</p>
          <Link to="/return" style={s.linkBtn}>Go to Return</Link>
        </div>
      </div>
    </div>
  )
}

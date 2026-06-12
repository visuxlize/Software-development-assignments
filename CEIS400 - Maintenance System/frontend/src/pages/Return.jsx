import { useState, useEffect } from 'react'
import api from '../api/client'

const s = {
  page: { maxWidth: '960px', margin: '0 auto', padding: '1.75rem 1.25rem' },
  h1: { fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' },
  sub: { fontSize: '13px', color: '#666', marginBottom: '1.5rem' },
  card: { background: '#fff', border: '1px solid #ddd', borderRadius: '6px', padding: '1.25rem', marginBottom: '1rem' },
  cardTitle: { fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '1rem' },
  th: { textAlign: 'left', padding: '7px 10px', fontSize: '11px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase', borderBottom: '2px solid #ddd' },
  td: { padding: '9px 10px', borderBottom: '1px solid #eee' },
  btn: { padding: '8px 16px', background: '#2a7a4b', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' },
  alert: (type) => ({ padding: '10px 14px', borderRadius: '4px', fontSize: '13px', marginBottom: '1rem', borderLeft: `4px solid ${type === 'success' ? '#2a7a4b' : '#c0392b'}`, background: type === 'success' ? '#e6f4ec' : '#fdecea', color: type === 'success' ? '#1e5c38' : '#7a1c1c' }),
}

export default function Return() {
  const [myTools,  setMyTools]  = useState([])
  const [selected, setSelected] = useState('')
  const [message,  setMessage]  = useState(null)
  const [msgType,  setMsgType]  = useState('success')

  const load = () =>
    api.get('/equipment/mine/')
      .then(r => {
        setMyTools(r.data)
        if (r.data.length) setSelected(r.data[0].equipID)
      })
      .catch(() => {})

  useEffect(() => { load() }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage(null)
    try {
      const res = await api.post('/equipment/return/', { equipID: selected })
      setMessage(res.data.message)
      setMsgType('success')
      load()
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong.')
      setMsgType('error')
    }
  }

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Return Equipment</h1>
      <p style={s.sub}>Select the tool you are returning.</p>
      {message && <div style={s.alert(msgType)}>{message}</div>}
      {myTools.length > 0 ? (
        <div style={s.card}>
          <div style={s.cardTitle}>Your checked-out tools</div>
          <form onSubmit={handleSubmit}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Select</th>
                  <th style={s.th}>Tool ID</th>
                  <th style={s.th}>Tool Name</th>
                  <th style={s.th}>Qty Out</th>
                </tr>
              </thead>
              <tbody>
                {myTools.map(t => (
                  <tr key={t.equipID}>
                    <td style={s.td}>
                      <input
                        type="radio"
                        name="tool"
                        value={t.equipID}
                        checked={selected === t.equipID}
                        onChange={() => setSelected(t.equipID)}
                      />
                    </td>
                    <td style={{ ...s.td, fontFamily: 'monospace', fontSize: '12px', color: '#888' }}>{t.equipID}</td>
                    <td style={{ ...s.td, fontWeight: 'bold' }}>{t.equipName}</td>
                    <td style={s.td}>{t.quantTotal - t.quantAvail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button style={s.btn} type="submit">Confirm Return</button>
          </form>
        </div>
      ) : (
        <div style={s.card}>
          <p style={{ color: '#888', fontSize: '13px' }}>You don't have any tools checked out right now.</p>
        </div>
      )}
    </div>
  )
}

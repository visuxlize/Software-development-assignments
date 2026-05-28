import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { mockGetMyEquipment } from '../mock/api'
import * as s from '../styles'

// Home page after login — shows how many tools you have and shortcuts to checkout/return
export default function Dashboard() {
  const { user } = useAuth()
  const [myTools, setMyTools] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMyTools() {
      const data = await mockGetMyEquipment(user.emp_id)
      setMyTools(data)
      setLoading(false)
    }

    loadMyTools()
  }, [user])

  // Yellow if you have stuff out, green if zero — makes the number easy to spot
  const countColor = myTools.length > 0 ? s.colors.warning : s.colors.success

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Welcome, {user.first_name}</h1>
      <p style={s.sub}>What would you like to do today?</p>

      <div style={s.grid3}>
        <div style={s.statCard}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: countColor }}>{myTools.length}</div>
          <p style={{ fontSize: '12px', color: s.colors.textMuted, marginTop: '3px' }}>Tools checked out</p>
        </div>

        <Link to="/checkout" style={{ ...s.statCard, textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Check Out</div>
          <p style={{ fontSize: '12px', color: s.colors.textMuted, marginTop: '3px' }}>Borrow a tool</p>
        </Link>

        <Link to="/return" style={{ ...s.statCard, textDecoration: 'none', color: 'inherit' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Return</div>
          <p style={{ fontSize: '12px', color: s.colors.textMuted, marginTop: '3px' }}>Return a tool</p>
        </Link>
      </div>

      <div style={s.card}>
        <div style={s.cardTitle}>Your checked-out tools</div>

        {loading && <p style={s.mutedText}>Loading...</p>}

        {!loading && myTools.length === 0 && (
          <p style={s.mutedText}>You don't have any tools checked out right now.</p>
        )}

        {!loading && myTools.length > 0 && (
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Tool ID</th>
                <th style={s.th}>Tool Name</th>
                <th style={s.th}>Description</th>
                <th style={s.th}>Status</th>
                <th style={s.th}></th>
              </tr>
            </thead>
            <tbody>
              {myTools.map((tool) => (
                <tr key={tool.id}>
                  <td style={{ ...s.td, ...s.mono }}>{tool.equip_id}</td>
                  <td style={s.td}>{tool.equip_name}</td>
                  <td style={{ ...s.td, color: s.colors.textMuted }}>{tool.equip_desc}</td>
                  <td style={s.td}>
                    <span style={s.badge('checked_out')}>Checked out</span>
                  </td>
                  <td style={s.td}>
                    <Link to="/return" style={s.btn('sm')}>
                      Return
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

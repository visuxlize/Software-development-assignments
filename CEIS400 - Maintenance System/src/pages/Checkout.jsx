import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { mockGetEquipment, mockCheckout } from '../mock/api'
import Message from '../components/Message'
import * as s from '../styles'

// Page where an employee borrows a tool by ID (like scanning a barcode)
export default function Checkout() {
  const { user } = useAuth()
  const [equipId, setEquipId] = useState('')
  const [available, setAvailable] = useState([])
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    loadAvailable()
  }, [])

  async function loadAvailable() {
    const list = await mockGetEquipment('available')
    setAvailable(list)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    try {
      const result = await mockCheckout(equipId, user.emp_id)
      setMessage(result.message)
      setMessageType('success')
      setEquipId('')
      loadAvailable()
    } catch (err) {
      setMessage(err.message)
      setMessageType('error')
    }
  }

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Check Out Equipment</h1>
      <p style={s.sub}>Enter a tool ID or pick one from the list.</p>

      <Message text={message} type={messageType} />

      <div style={s.grid2}>
        <div style={s.card}>
          <div style={s.cardTitle}>Enter tool ID</div>
          <form onSubmit={handleSubmit}>
            <label style={s.label}>Tool ID</label>
            <input
              style={s.input}
              value={equipId}
              onChange={(e) => setEquipId(e.target.value)}
              placeholder="e.g. T001"
              autoFocus
              autoComplete="off"
            />
            <button type="submit" style={{ ...s.btn('primary'), width: '100%' }}>
              Check Out
            </button>
          </form>
        </div>

        <div style={s.card}>
          <div style={s.cardTitle}>Available tools</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '8px' }}>
            {available.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => setEquipId(tool.equip_id)}
                style={{ ...s.toolCard, textAlign: 'left' }}
              >
                <div style={s.mono}>{tool.equip_id}</div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', margin: '4px 0' }}>{tool.equip_name}</div>
                <span style={s.badge('available')}>Available</span>
              </button>
            ))}
          </div>
          {available.length === 0 && (
            <p style={{ ...s.mutedText, marginTop: '8px' }}>No tools available right now.</p>
          )}
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { mockGetMyEquipment, mockReturn } from '../mock/api'
import Message from '../components/Message'
import * as s from '../styles'

// Page to bring tools back and mark them good or damaged
export default function Return() {
  const { user } = useAuth()
  const [myTools, setMyTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState('')
  const [condition, setCondition] = useState('good')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    loadMyTools()
  }, [])

  async function loadMyTools() {
    const data = await mockGetMyEquipment(user.emp_id)
    setMyTools(data)
    setLoading(false)

    // Auto-select the first tool so the form isn't empty
    if (data.length > 0) {
      setSelectedId(data[0].equip_id)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    try {
      const result = await mockReturn(selectedId, user.emp_id, condition)
      setMessage(result.message)
      setMessageType('success')
      setCondition('good')
      loadMyTools()
    } catch (err) {
      setMessage(err.message)
      setMessageType('error')
    }
  }

  if (loading) {
    return (
      <div style={s.page}>
        <h1 style={s.h1}>Return Equipment</h1>
        <p style={s.mutedText}>Loading...</p>
      </div>
    )
  }

  if (myTools.length === 0) {
    return (
      <div style={s.page}>
        <h1 style={s.h1}>Return Equipment</h1>
        <p style={s.sub}>Pick the tool you are returning and its condition.</p>
        <div style={s.card}>
          <p style={s.mutedText}>You don't have any tools checked out right now.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Return Equipment</h1>
      <p style={s.sub}>Pick the tool you are returning and its condition.</p>

      <Message text={message} type={messageType} />

      <div style={s.card}>
        <div style={s.cardTitle}>Your checked-out tools</div>

        <form onSubmit={handleSubmit}>
          <table style={{ ...s.table, marginBottom: '1rem' }}>
            <thead>
              <tr>
                <th style={s.th}>Select</th>
                <th style={s.th}>Tool ID</th>
                <th style={s.th}>Tool Name</th>
                <th style={s.th}>Description</th>
              </tr>
            </thead>
            <tbody>
              {myTools.map((tool) => (
                <tr key={tool.id}>
                  <td style={s.td}>
                    <input
                      type="radio"
                      name="tool"
                      checked={selectedId === tool.equip_id}
                      onChange={() => setSelectedId(tool.equip_id)}
                    />
                  </td>
                  <td style={{ ...s.td, ...s.mono }}>{tool.equip_id}</td>
                  <td style={s.td}>{tool.equip_name}</td>
                  <td style={{ ...s.td, color: s.colors.textMuted }}>{tool.equip_desc}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr style={s.divider} />

          <label style={s.label}>Condition</label>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', color: s.colors.text }}>
            <label style={{ fontSize: '13px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="condition"
                value="good"
                checked={condition === 'good'}
                onChange={() => setCondition('good')}
              />{' '}
              Good
            </label>
            <label style={{ fontSize: '13px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="condition"
                value="damaged"
                checked={condition === 'damaged'}
                onChange={() => setCondition('damaged')}
              />{' '}
              Damaged
            </label>
          </div>

          <button type="submit" style={s.btn('success')}>
            Confirm Return
          </button>
        </form>
      </div>
    </div>
  )
}

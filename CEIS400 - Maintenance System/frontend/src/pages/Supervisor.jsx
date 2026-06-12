import { useState, useEffect } from 'react'
import api from '../api/client'

const s = {
  page: { maxWidth: '960px', margin: '0 auto', padding: '1.75rem 1.25rem' },
  h1: { fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' },
  sub: { fontSize: '13px', color: '#666', marginBottom: '1.5rem' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' },
  card: { background: '#fff', border: '1px solid #ddd', borderRadius: '6px', padding: '1.25rem' },
  cardTitle: { fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '1rem' },
  th: { textAlign: 'left', padding: '7px 10px', fontSize: '11px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase', borderBottom: '2px solid #ddd' },
  td: { padding: '9px 10px', borderBottom: '1px solid #eee', verticalAlign: 'middle' },
  label: { display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px', marginTop: '10px' },
  input: { width: '100%', padding: '7px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' },
  select: { width: '100%', padding: '7px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' },
  addBtn: { marginTop: '1rem', width: '100%', padding: '9px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' },
  deleteBtn: { padding: '4px 10px', background: '#c0392b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  alert: (type) => ({ padding: '9px 12px', borderRadius: '4px', fontSize: '13px', marginBottom: '1rem', borderLeft: `4px solid ${type === 'success' ? '#2a7a4b' : '#c0392b'}`, background: type === 'success' ? '#e6f4ec' : '#fdecea', color: type === 'success' ? '#1e5c38' : '#7a1c1c' }),
  badge: (role) => ({ display: 'inline-block', padding: '2px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 'bold', background: role === 'supervisor' ? '#e8edf5' : '#f0f0f0', color: role === 'supervisor' ? '#1a3a6b' : '#444', border: `1px solid ${role === 'supervisor' ? '#b8c8e8' : '#ccc'}` }),
}

export default function Supervisor() {
  // ── Employees ──────────────────────────────────────────────
  const [employees, setEmployees] = useState([])
  const [empMsg,    setEmpMsg]    = useState(null)
  const [empMsgType, setEmpMsgType] = useState('success')
  const [empForm,   setEmpForm]   = useState({ empID: '', firstName: '', lastName: '', role: 'employee', password: '' })

  const loadEmployees = () =>
    api.get('/supervisor/employees/').then(r => setEmployees(r.data)).catch(() => {})

  useEffect(() => { loadEmployees() }, [])

  const handleAddEmp = async e => {
    e.preventDefault()
    try {
      await api.post('/supervisor/employees/', empForm)
      setEmpMsg(`Employee ${empForm.empID} added.`)
      setEmpMsgType('success')
      setEmpForm({ empID: '', firstName: '', lastName: '', role: 'employee', password: '' })
      loadEmployees()
    } catch (err) {
      setEmpMsg(err.response?.data?.error || 'Could not add employee.')
      setEmpMsgType('error')
    }
  }

  const handleRemoveEmp = async (id, empID) => {
    if (!window.confirm(`Remove employee ${empID}?`)) return
    try {
      await api.delete(`/supervisor/employees/${id}/`)
      setEmpMsg(`Employee ${empID} removed.`)
      setEmpMsgType('success')
      loadEmployees()
    } catch {
      setEmpMsg('Could not remove employee.')
      setEmpMsgType('error')
    }
  }

  // ── Equipment ──────────────────────────────────────────────
  const [equipment,    setEquipment]    = useState([])
  const [equipMsg,     setEquipMsg]     = useState(null)
  const [equipMsgType, setEquipMsgType] = useState('success')
  const [equipForm,    setEquipForm]    = useState({ equipID: '', equipName: '', equipDesc: '', quantTotal: '' })

  const loadEquipment = () =>
    api.get('/equipment/').then(r => setEquipment(r.data)).catch(() => {})

  useEffect(() => { loadEquipment() }, [])

  const handleAddEquip = async e => {
    e.preventDefault()
    try {
      await api.post('/equipment/', {
        ...equipForm,
        quantTotal: parseInt(equipForm.quantTotal),
        quantAvail: parseInt(equipForm.quantTotal),
      })
      setEquipMsg(`Equipment ${equipForm.equipID} added.`)
      setEquipMsgType('success')
      setEquipForm({ equipID: '', equipName: '', equipDesc: '', quantTotal: '' })
      loadEquipment()
    } catch (err) {
      setEquipMsg(err.response?.data?.error || 'Could not add equipment.')
      setEquipMsgType('error')
    }
  }

  const handleRemoveEquip = async (id, equipID) => {
    if (!window.confirm(`Remove equipment ${equipID}?`)) return
    try {
      await api.delete(`/equipment/${id}/`)
      setEquipMsg(`Equipment ${equipID} removed.`)
      setEquipMsgType('success')
      loadEquipment()
    } catch {
      setEquipMsg('Could not remove equipment.')
      setEquipMsgType('error')
    }
  }

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Supervisor Dashboard</h1>
      <p style={s.sub}>Manage employees and equipment.</p>

      <div style={s.grid2}>

        {/* ── Employee Management ── */}
        <div>
          <div style={s.card}>
            <div style={s.cardTitle}>Employees</div>
            {empMsg && <div style={s.alert(empMsgType)}>{empMsg}</div>}
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>ID</th>
                  <th style={s.th}>Name</th>
                  <th style={s.th}>Role</th>
                  <th style={s.th}></th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.empID}>
                    <td style={{ ...s.td, fontFamily: 'monospace', fontSize: '12px', color: '#888' }}>{emp.empID}</td>
                    <td style={s.td}>{emp.firstName} {emp.lastName}</td>
                    <td style={s.td}><span style={s.badge(emp.role)}>{emp.role}</span></td>
                    <td style={s.td}>
                      <button style={s.deleteBtn} onClick={() => handleRemoveEmp(emp.id, emp.empID)}>Remove</button>
                    </td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr><td style={s.td} colSpan={4}><span style={{ color: '#888' }}>No employees yet.</span></td></tr>
                )}
              </tbody>
            </table>

            <div style={s.cardTitle}>Add Employee</div>
            <form onSubmit={handleAddEmp}>
              <label style={s.label}>Employee ID</label>
              <input style={s.input} placeholder="e.g. E004" value={empForm.empID}
                onChange={e => setEmpForm({ ...empForm, empID: e.target.value })} required />
              <label style={s.label}>First Name</label>
              <input style={s.input} placeholder="First name" value={empForm.firstName}
                onChange={e => setEmpForm({ ...empForm, firstName: e.target.value })} required />
              <label style={s.label}>Last Name</label>
              <input style={s.input} placeholder="Last name" value={empForm.lastName}
                onChange={e => setEmpForm({ ...empForm, lastName: e.target.value })} required />
              <label style={s.label}>Role</label>
              <select style={s.select} value={empForm.role}
                onChange={e => setEmpForm({ ...empForm, role: e.target.value })}>
                <option value="employee">Employee</option>
                <option value="supervisor">Supervisor</option>
              </select>
              <label style={s.label}>Password</label>
              <input style={s.input} type="password" placeholder="Temporary password" value={empForm.password}
                onChange={e => setEmpForm({ ...empForm, password: e.target.value })} required />
              <button style={s.addBtn} type="submit">Add Employee</button>
            </form>
          </div>
        </div>

        {/* ── Equipment Management ── */}
        <div>
          <div style={s.card}>
            <div style={s.cardTitle}>Equipment</div>
            {equipMsg && <div style={s.alert(equipMsgType)}>{equipMsg}</div>}
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>ID</th>
                  <th style={s.th}>Name</th>
                  <th style={s.th}>Avail</th>
                  <th style={s.th}></th>
                </tr>
              </thead>
              <tbody>
                {equipment.map(t => (
                  <tr key={t.equipID}>
                    <td style={{ ...s.td, fontFamily: 'monospace', fontSize: '12px', color: '#888' }}>{t.equipID}</td>
                    <td style={s.td}>{t.equipName}</td>
                    <td style={s.td}>{t.quantAvail} / {t.quantTotal}</td>
                    <td style={s.td}>
                      <button style={s.deleteBtn} onClick={() => handleRemoveEquip(t.id, t.equipID)}>Remove</button>
                    </td>
                  </tr>
                ))}
                {equipment.length === 0 && (
                  <tr><td style={s.td} colSpan={4}><span style={{ color: '#888' }}>No equipment yet.</span></td></tr>
                )}
              </tbody>
            </table>

            <div style={s.cardTitle}>Add Equipment</div>
            <form onSubmit={handleAddEquip}>
              <label style={s.label}>Equipment ID</label>
              <input style={s.input} placeholder="e.g. T004" value={equipForm.equipID}
                onChange={e => setEquipForm({ ...equipForm, equipID: e.target.value })} required />
              <label style={s.label}>Name</label>
              <input style={s.input} placeholder="Tool name" value={equipForm.equipName}
                onChange={e => setEquipForm({ ...equipForm, equipName: e.target.value })} required />
              <label style={s.label}>Description</label>
              <input style={s.input} placeholder="Brief description" value={equipForm.equipDesc}
                onChange={e => setEquipForm({ ...equipForm, equipDesc: e.target.value })} />
              <label style={s.label}>Total Quantity</label>
              <input style={s.input} type="number" min="1" placeholder="e.g. 3" value={equipForm.quantTotal}
                onChange={e => setEquipForm({ ...equipForm, quantTotal: e.target.value })} required />
              <button style={s.addBtn} type="submit">Add Equipment</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

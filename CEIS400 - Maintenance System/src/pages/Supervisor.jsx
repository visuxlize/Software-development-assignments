import { useState, useEffect } from 'react'
import {
  mockGetEmployees,
  mockAddEmployee,
  mockRemoveEmployee,
  mockGetAllEquipment,
  mockAddEquipment,
  mockRemoveEquipment,
  mockGetTransactions,
} from '../mock/api'
import Modal from '../components/Modal'
import Message from '../components/Message'
import * as s from '../styles'

// Blank forms we reset back to after saving
const emptyEmployee = { emp_id: '', first_name: '', last_name: '', role: 'employee' }
const emptyEquipment = { equip_id: '', equip_name: '', equip_desc: '' }

// Only supervisors should see this page (main.jsx blocks everyone else)
export default function Supervisor() {
  const [employees, setEmployees] = useState([])
  const [equipment, setEquipment] = useState([])
  const [transactions, setTransactions] = useState([])
  const [tab, setTab] = useState('employees')

  const [showEmployeeForm, setShowEmployeeForm] = useState(false)
  const [showEquipmentForm, setShowEquipmentForm] = useState(false)

  const [employeeForm, setEmployeeForm] = useState(emptyEmployee)
  const [equipmentForm, setEquipmentForm] = useState(emptyEquipment)

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    loadData()
  }, [])

  // Pull all three lists from the mock API at once
  async function loadData() {
    const empList = await mockGetEmployees()
    const equipList = await mockGetAllEquipment()
    const txList = await mockGetTransactions()
    setEmployees(empList)
    setEquipment(equipList)
    setTransactions(txList)
  }

  async function handleAddEmployee(e) {
    e.preventDefault()
    try {
      const result = await mockAddEmployee(employeeForm)
      setMessage(result.message)
      setMessageType('success')
      setShowEmployeeForm(false)
      setEmployeeForm(emptyEmployee)
      loadData()
    } catch (err) {
      setMessage(err.message)
      setMessageType('error')
    }
  }

  async function handleRemoveEmployee(id, name) {
    const ok = window.confirm(`Remove ${name}?`)
    if (!ok) return

    try {
      const result = await mockRemoveEmployee(id)
      setMessage(result.message)
      setMessageType('success')
      loadData()
    } catch (err) {
      setMessage(err.message)
      setMessageType('error')
    }
  }

  async function handleAddEquipment(e) {
    e.preventDefault()
    try {
      const result = await mockAddEquipment(equipmentForm)
      setMessage(result.message)
      setMessageType('success')
      setShowEquipmentForm(false)
      setEquipmentForm(emptyEquipment)
      loadData()
    } catch (err) {
      setMessage(err.message)
      setMessageType('error')
    }
  }

  async function handleRemoveEquipment(id, name) {
    const ok = window.confirm(`Remove ${name}?`)
    if (!ok) return

    try {
      const result = await mockRemoveEquipment(id)
      setMessage(result.message)
      setMessageType('success')
      loadData()
    } catch (err) {
      setMessage(err.message)
      setMessageType('error')
    }
  }

  let checkedOutCount = 0
  for (const item of equipment) {
    if (item.status === 'checked_out') {
      checkedOutCount++
    }
  }

  const statLabel = { fontSize: '12px', color: s.colors.textMuted }

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Supervisor Dashboard</h1>
      <p style={s.sub}>Manage employees, equipment, and view transactions.</p>

      <Message text={message} type={messageType} />

      <div style={s.grid3}>
        <div style={s.statCard}>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{employees.length}</div>
          <p style={statLabel}>Employees</p>
        </div>
        <div style={s.statCard}>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{equipment.length}</div>
          <p style={statLabel}>Equipment items</p>
        </div>
        <div style={s.statCard}>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{checkedOutCount}</div>
          <p style={statLabel}>Checked out</p>
        </div>
      </div>

      <div style={s.card}>
        <div style={{ display: 'flex', borderBottom: `2px solid ${s.colors.border}`, marginBottom: '1rem' }}>
          <button type="button" style={s.tabBtn(tab === 'employees')} onClick={() => setTab('employees')}>
            Employees
          </button>
          <button type="button" style={s.tabBtn(tab === 'equipment')} onClick={() => setTab('equipment')}>
            Equipment
          </button>
          <button type="button" style={s.tabBtn(tab === 'transactions')} onClick={() => setTab('transactions')}>
            Transactions
          </button>
        </div>

        {tab === 'employees' && (
          <>
            <div style={{ textAlign: 'right', marginBottom: '0.75rem' }}>
              <button type="button" style={s.btn('smPrimary')} onClick={() => setShowEmployeeForm(true)}>
                + Add Employee
              </button>
            </div>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>ID</th>
                  <th style={s.th}>Name</th>
                  <th style={s.th}>Role</th>
                  <th style={s.th}>Status</th>
                  <th style={s.th}></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td style={{ ...s.td, ...s.mono }}>{emp.emp_id}</td>
                    <td style={s.td}>
                      {emp.first_name} {emp.last_name}
                    </td>
                    <td style={s.td}>
                      <span style={s.badge(emp.role)}>{emp.role}</span>
                    </td>
                    <td style={s.td}>{emp.is_active ? 'Active' : 'Inactive'}</td>
                    <td style={s.td}>
                      <button
                        type="button"
                        style={s.btn('smDanger')}
                        onClick={() => handleRemoveEmployee(emp.id, `${emp.first_name} ${emp.last_name}`)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === 'equipment' && (
          <>
            <div style={{ textAlign: 'right', marginBottom: '0.75rem' }}>
              <button type="button" style={s.btn('smPrimary')} onClick={() => setShowEquipmentForm(true)}>
                + Add Equipment
              </button>
            </div>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>ID</th>
                  <th style={s.th}>Name</th>
                  <th style={s.th}>Description</th>
                  <th style={s.th}>Status</th>
                  <th style={s.th}></th>
                </tr>
              </thead>
              <tbody>
                {equipment.map((item) => (
                  <tr key={item.id}>
                    <td style={{ ...s.td, ...s.mono }}>{item.equip_id}</td>
                    <td style={s.td}>{item.equip_name}</td>
                    <td style={{ ...s.td, color: s.colors.textMuted }}>{item.equip_desc}</td>
                    <td style={s.td}>
                      <span style={s.badge(item.status)}>{item.status.replace('_', ' ')}</span>
                    </td>
                    <td style={s.td}>
                      <button
                        type="button"
                        style={s.btn('smDanger')}
                        onClick={() => handleRemoveEquipment(item.id, item.equip_name)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === 'transactions' && (
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Employee</th>
                <th style={s.th}>Tool</th>
                <th style={s.th}>Action</th>
                <th style={s.th}>Condition</th>
                <th style={s.th}>Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 && (
                <tr>
                  <td style={s.td} colSpan={5}>
                    No transactions yet.
                  </td>
                </tr>
              )}
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td style={{ ...s.td, ...s.mono }}>{tx.emp_id}</td>
                  <td style={{ ...s.td, ...s.mono }}>{tx.equip_id}</td>
                  <td style={s.td}>{tx.action}</td>
                  <td style={s.td}>{tx.condition || '—'}</td>
                  <td style={{ ...s.td, color: s.colors.textMuted }}>{new Date(tx.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showEmployeeForm && (
        <Modal title="Add Employee" onClose={() => setShowEmployeeForm(false)}>
          <form onSubmit={handleAddEmployee}>
            <label style={s.label}>Employee ID</label>
            <input
              style={s.input}
              value={employeeForm.emp_id}
              onChange={(e) => setEmployeeForm({ ...employeeForm, emp_id: e.target.value })}
            />

            <label style={s.label}>First Name</label>
            <input
              style={s.input}
              value={employeeForm.first_name}
              onChange={(e) => setEmployeeForm({ ...employeeForm, first_name: e.target.value })}
            />

            <label style={s.label}>Last Name</label>
            <input
              style={s.input}
              value={employeeForm.last_name}
              onChange={(e) => setEmployeeForm({ ...employeeForm, last_name: e.target.value })}
            />

            <label style={s.label}>Role</label>
            <select
              style={{ ...s.input, marginBottom: '1rem' }}
              value={employeeForm.role}
              onChange={(e) => setEmployeeForm({ ...employeeForm, role: e.target.value })}
            >
              <option value="employee">employee</option>
              <option value="supervisor">supervisor</option>
            </select>

            <button type="submit" style={s.btn('smPrimary')}>
              Save Employee
            </button>
          </form>
        </Modal>
      )}

      {showEquipmentForm && (
        <Modal title="Add Equipment" onClose={() => setShowEquipmentForm(false)}>
          <form onSubmit={handleAddEquipment}>
            <label style={s.label}>Equipment ID</label>
            <input
              style={s.input}
              value={equipmentForm.equip_id}
              onChange={(e) => setEquipmentForm({ ...equipmentForm, equip_id: e.target.value })}
            />

            <label style={s.label}>Equipment Name</label>
            <input
              style={s.input}
              value={equipmentForm.equip_name}
              onChange={(e) => setEquipmentForm({ ...equipmentForm, equip_name: e.target.value })}
            />

            <label style={s.label}>Description</label>
            <input
              style={s.input}
              value={equipmentForm.equip_desc}
              onChange={(e) => setEquipmentForm({ ...equipmentForm, equip_desc: e.target.value })}
            />

            <button type="submit" style={s.btn('smPrimary')}>
              Save Equipment
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}

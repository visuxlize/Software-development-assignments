// Pretend backend — stores data in memory while we build the real Django API.
// Every function returns a Promise so pages can use async/await like a real fetch call.

// Tiny wait so it feels like a network request (optional but nice for demos)
function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// --- starting data (resets when you refresh the page) ---

let employees = [
  { id: 1, emp_id: 'E001', first_name: 'Carlos', last_name: 'Rivera', role: 'employee', is_active: true },
  { id: 2, emp_id: 'E002', first_name: 'Dana', last_name: 'Park', role: 'employee', is_active: true },
  { id: 3, emp_id: 'E003', first_name: 'Mike', last_name: 'Torres', role: 'employee', is_active: true },
  { id: 4, emp_id: 'S001', first_name: 'Janet', last_name: 'Williams', role: 'supervisor', is_active: true },
]

let equipment = [
  { id: 1, equip_id: 'T001', equip_name: 'Power Drill', equip_desc: 'Standard cordless drill', status: 'available', checked_out_by: null },
  { id: 2, equip_id: 'T002', equip_name: 'Circular Saw', equip_desc: '7.25 inch blade', status: 'available', checked_out_by: null },
  { id: 3, equip_id: 'T003', equip_name: 'Voltage Tester', equip_desc: 'Non-contact tester', status: 'available', checked_out_by: null },
  { id: 4, equip_id: 'T004', equip_name: 'Pipe Wrench', equip_desc: '14 inch heavy duty', status: 'available', checked_out_by: null },
  { id: 5, equip_id: 'T005', equip_name: 'Extension Ladder', equip_desc: '24 foot aluminum', status: 'available', checked_out_by: null },
  { id: 6, equip_id: 'T006', equip_name: 'Paint Sprayer', equip_desc: 'Airless sprayer', status: 'damaged', checked_out_by: null },
]

let transactions = []
let nextEmpId = 5
let nextEquipId = 7

// --- login ---

export async function mockLogin(emp_id, password) {
  await delay()
  const user = employees.find((e) => e.emp_id === emp_id.toUpperCase() && e.is_active)
  if (!user || password !== 'pass1234') {
    throw new Error('ID not found or password incorrect.')
  }
  return { ...user, token: 'mock-token' }
}

// --- equipment (employee pages) ---

export async function mockGetEquipment(status = null) {
  await delay()
  if (status) {
    return equipment.filter((e) => e.status === status)
  }
  return [...equipment]
}

export async function mockGetMyEquipment(emp_id) {
  await delay()
  return equipment.filter((e) => e.checked_out_by === emp_id)
}

export async function mockCheckout(equip_id, emp_id) {
  await delay()
  const item = equipment.find((e) => e.equip_id === equip_id.toUpperCase())
  if (!item) {
    throw new Error(`Tool ID ${equip_id} not found.`)
  }
  if (item.status !== 'available') {
    throw new Error(`${item.equip_name} is not available right now.`)
  }

  item.status = 'checked_out'
  item.checked_out_by = emp_id
  transactions.push({
    id: Date.now(),
    emp_id,
    equip_id,
    action: 'checkout',
    timestamp: new Date().toISOString(),
  })

  return { message: `You checked out the ${item.equip_name} successfully.`, equipment: { ...item } }
}

export async function mockReturn(equip_id, emp_id, condition) {
  await delay()
  const item = equipment.find((e) => e.equip_id === equip_id.toUpperCase() && e.checked_out_by === emp_id)
  if (!item) {
    throw new Error('That tool is not checked out under your account.')
  }

  item.status = condition === 'damaged' ? 'damaged' : 'available'
  item.checked_out_by = null
  transactions.push({
    id: Date.now(),
    emp_id,
    equip_id,
    action: 'return',
    condition,
    timestamp: new Date().toISOString(),
  })

  return { message: `${item.equip_name} returned. Condition: ${condition}.` }
}

// --- supervisor: employees ---

export async function mockGetEmployees() {
  await delay()
  return [...employees]
}

export async function mockAddEmployee({ emp_id, first_name, last_name, role }) {
  await delay()
  if (employees.find((e) => e.emp_id === emp_id.toUpperCase())) {
    throw new Error('Employee ID already exists.')
  }
  const newEmp = {
    id: nextEmpId++,
    emp_id: emp_id.toUpperCase(),
    first_name,
    last_name,
    role,
    is_active: true,
  }
  employees.push(newEmp)
  return { message: `Employee ${emp_id} added.`, employee: newEmp }
}

export async function mockRemoveEmployee(id) {
  await delay()
  const index = employees.findIndex((e) => e.id === id)
  if (index === -1) {
    throw new Error('Employee not found.')
  }
  employees.splice(index, 1)
  return { message: 'Employee removed.' }
}

// --- supervisor: equipment ---

export async function mockGetAllEquipment() {
  await delay()
  return [...equipment]
}

export async function mockAddEquipment({ equip_id, equip_name, equip_desc }) {
  await delay()
  if (equipment.find((e) => e.equip_id === equip_id.toUpperCase())) {
    throw new Error('Equipment ID already exists.')
  }
  const newItem = {
    id: nextEquipId++,
    equip_id: equip_id.toUpperCase(),
    equip_name,
    equip_desc: equip_desc || '',
    status: 'available',
    checked_out_by: null,
  }
  equipment.push(newItem)
  return { message: `Equipment ${equip_id} added.`, equipment: newItem }
}

export async function mockRemoveEquipment(id) {
  await delay()
  const index = equipment.findIndex((e) => e.id === id)
  if (index === -1) {
    throw new Error('Equipment not found.')
  }
  equipment.splice(index, 1)
  return { message: 'Equipment removed.' }
}

// --- supervisor: history log ---

export async function mockGetTransactions() {
  await delay()
  return [...transactions].reverse()
}

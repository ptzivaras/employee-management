import api from './api'

// GET /employees
export async function listEmployees() {
  const { data } = await api.get('/employees')
  // Support both array and {content:[]}
  return Array.isArray(data) ? data : (data?.content ?? [])
}

// GET /employees/{id}
export async function getEmployeeById(id) {
  const { data } = await api.get(`/employees/${id}`)
  return data
}

// POST /employees
export async function createEmployee(payload) {
  // expected: { firstName, lastName, email, departmentId }
  const { data } = await api.post('/employees', payload)
  return data
}

// PUT /employees/{id}
export async function updateEmployee(id, payload) {
  const { data } = await api.put(`/employees/${id}`, payload)
  return data
}

// DELETE /employees/{id}
export async function deleteEmployee(id) {
  const { data } = await api.delete(`/employees/${id}`)
  return data
}

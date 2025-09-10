import api from './api'

// Matches backend: GET /api/v1/employees/{id}/tasks
export async function listTasksByEmployeeId(employeeId) {
  const { data } = await api.get(`/employees/${employeeId}/tasks`)
  return Array.isArray(data) ? data : []
}

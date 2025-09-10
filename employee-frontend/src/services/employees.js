import api from './api'

export async function listEmployees() {
  const { data } = await api.get('/employees')
  return Array.isArray(data) ? data : (data?.content ?? [])
}

export async function getEmployeeById(id) {
  const { data } = await api.get(`/employees/${id}`)
  return data
}

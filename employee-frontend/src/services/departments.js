import api from './api'

// GET /departments
export async function listDepartments() {
  const { data } = await api.get('/departments')
  return Array.isArray(data) ? data : (data?.content ?? [])
}

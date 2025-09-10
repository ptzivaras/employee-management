import api from './api'

export async function listEmployees() {
  const { data } = await api.get('/employees')
  // Expecting an array; if backend wraps in {content: [], ...}, adapt here:
  return Array.isArray(data) ? data : (data?.content ?? [])
}

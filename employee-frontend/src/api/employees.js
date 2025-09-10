import http from './http';

export async function listEmployees() {
  const res = await http.get('/api/v1/employees');
  return res.data;
}

export async function getEmployee(id) {
  const res = await http.get(`/api/v1/employees/${id}`);
  return res.data;
}

export async function createEmployee(payload) {
  // payload: { firstName, lastName, email, departmentId }
  const res = await http.post('/api/v1/employees', payload);
  return res.data;
}

export async function updateEmployee(id, payload) {
  const res = await http.put(`/api/v1/employees/${id}`, payload);
  return res.data;
}

export async function deleteEmployee(id) {
  await http.delete(`/api/v1/employees/${id}`);
}

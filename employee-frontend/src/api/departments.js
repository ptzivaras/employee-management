import http from './http';

export async function listDepartments() {
  const res = await http.get('/api/v1/departments');
  return res.data;
}

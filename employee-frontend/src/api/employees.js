import client from "./client";

// Try new endpoints, fall back to legacy /employees2
async function tryWithFallback(tryCall, fallbackCall) {
  try {
    return await tryCall();
  } catch (err) {
    if (err?.response?.status === 404) return await fallbackCall();
    throw err;
  }
}

// Normalize a list payload into an array
function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.content)) return data.content;
  console.warn("Employees API returned non-array:", data);
  return [];
}

export async function listEmployees() {
  const data = await tryWithFallback(
    async () => (await client.get("/employees")).data,
    async () => (await client.get("/employees2")).data
  );
  return normalizeList(data);
}

export async function getEmployee(id) {
  return await tryWithFallback(
    async () => (await client.get(`/employees/${id}`)).data,
    async () => (await client.get(`/employees2/${id}`)).data
  );
}

// Create employee
// New API: { firstName, lastName, email, departmentId }
// Legacy : { firstName, lastName, emailId, compId }
export async function createEmployee(payload) {
  const modern = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    departmentId: Number(payload.departmentId),
  };
  const legacy = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    emailId: payload.email,
    compId: Number(payload.departmentId),
  };
  return await tryWithFallback(
    async () => (await client.post("/employees", modern)).data,
    async () => (await client.post("/employees2", legacy)).data
  );
}

export async function updateEmployee(id, payload) {
  const modern = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    departmentId: Number(payload.departmentId),
  };
  const legacy = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    emailId: payload.email,
    compId: Number(payload.departmentId),
  };
  return await tryWithFallback(
    async () => (await client.put(`/employees/${id}`, modern)).data,
    async () => (await client.put(`/employees2/${id}`, legacy)).data
  );
}

export async function deleteEmployee(id) {
  return await tryWithFallback(
    async () => (await client.delete(`/employees/${id}`)).data,
    async () => (await client.delete(`/employees2/${id}`)).data
  );
}

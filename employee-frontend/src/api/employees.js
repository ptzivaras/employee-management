import client from "./client";

// Try primary; on 404 **or 422** fall back (so we handle both "missing endpoint" and "validation rejects body")
async function tryPrimaryFallback(primary, fallback) {
  try {
    return await primary();
  } catch (err) {
    const status = err?.response?.status;
    if ((status === 404 || status === 422) && typeof fallback === "function") {
      return await fallback();
    }
    throw err;
  }
}

// Normalize arrays (some backends return Page<T> with .content)
function toArray(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.content)) return data.content;
  return [];
}

export async function listEmployees() {
  const data = await tryPrimaryFallback(
    async () => (await client.get("/employees")).data,
    async () => (await client.get("/employees2")).data
  );
  return toArray(data);
}

export async function getEmployee(id) {
  return tryPrimaryFallback(
    async () => (await client.get(`/employees/${id}`)).data,
    async () => (await client.get(`/employees2/${id}`)).data
  );
}

export async function createEmployee(payload) {
  // NEW api
  const modernBody = {
    firstName: payload.firstName,
    lastName:  payload.lastName,
    email:     payload.email,
    departmentId: Number(payload.departmentId),
  };
  // LEGACY api
  const legacyBody = {
    firstName: payload.firstName,
    lastName:  payload.lastName,
    emailId:   payload.email,
    compId:    Number(payload.departmentId),
  };

  return tryPrimaryFallback(
    async () => (await client.post("/employees", modernBody)).data,
    async () => (await client.post("/employees2", legacyBody)).data
  );
}

export async function updateEmployee(id, payload) {
  const modernBody = {
    firstName: payload.firstName,
    lastName:  payload.lastName,
    email:     payload.email,
    departmentId: Number(payload.departmentId),
  };
  const legacyBody = {
    firstName: payload.firstName,
    lastName:  payload.lastName,
    emailId:   payload.email,
    compId:    Number(payload.departmentId),
  };

  return tryPrimaryFallback(
    async () => (await client.put(`/employees/${id}`, modernBody)).data,
    async () => (await client.put(`/employees2/${id}`, legacyBody)).data
  );
}

export async function deleteEmployee(id) {
  return tryPrimaryFallback(
    async () => (await client.delete(`/employees/${id}`)).data,
    async () => (await client.delete(`/employees2/${id}`)).data
  );
}

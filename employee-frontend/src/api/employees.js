import client from "./client";

// GET /employees  (fallback to /employees2 from your legacy API)
export async function listEmployees() {
  try {
    const res = await client.get("/employees");
    return res.data;
  } catch (err) {
    if (err?.response?.status === 404) {
      const res = await client.get("/employees2");
      return res.data;
    }
    throw err;
  }
}

// GET /employees/{id} (fallback /employees2/{id})
export async function getEmployee(id) {
  try {
    const res = await client.get(`/employees/${id}`);
    return res.data;
  } catch (err) {
    if (err?.response?.status === 404) {
      const res = await client.get(`/employees2/${id}`);
      return res.data;
    }
    throw err;
  }
}

// POST /employees  (fallback /employees2)
export async function createEmployee(body) {
  try {
    const res = await client.post("/employees", body);
    return res.data;
  } catch (err) {
    if (err?.response?.status === 404) {
      const res = await client.post("/employees2", body);
      return res.data;
    }
    throw err;
  }
}

// PUT /employees/{id} (fallback /employees2/{id})
export async function updateEmployee(id, body) {
  try {
    const res = await client.put(`/employees/${id}`, body);
    return res.data;
  } catch (err) {
    if (err?.response?.status === 404) {
      const res = await client.put(`/employees2/${id}`, body);
      return res.data;
    }
    throw err;
  }
}

// DELETE /employees/{id} (fallback /employees2/{id})
export async function deleteEmployee(id) {
  try {
    const res = await client.delete(`/employees/${id}`);
    return res.data;
  } catch (err) {
    if (err?.response?.status === 404) {
      const res = await client.delete(`/employees2/${id}`);
      return res.data;
    }
    throw err;
  }
}

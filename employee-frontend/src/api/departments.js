import client from "./client";

// Local helper so this file stands alone.
async function tryWithFallback(tryCall, fallbackCall) {
  try {
    return await tryCall();
  } catch (err) {
    if (err?.response?.status === 404) {
      return await fallbackCall();
    }
    throw err;
  }
}

// GET /departments  (fallback: GET /companies)
export async function listDepartments() {
  return tryWithFallback(
    async () => (await client.get("/departments")).data, // [{id,name}]
    async () => {
      const res = await client.get("/companies");        // [{id,companyName}]
      const companies = res.data ?? [];
      return companies.map((c) => ({ id: c.id, name: c.companyName }));
    }
  );
}

// POST /departments {name}  (fallback: POST /companies {companyName})
export async function createDepartment(name) {
  return tryWithFallback(
    async () => (await client.post("/departments", { name })).data,
    async () => {
      const res = await client.post("/companies", { companyName: name });
      const c = res.data;
      return { id: c.id, name: c.companyName };
    }
  );
}

// DELETE /departments/{id}  (fallback: DELETE /companies/{id})
export async function deleteDepartment(id) {
  return tryWithFallback(
    async () => (await client.delete(`/departments/${id}`)).data,
    async () => (await client.delete(`/companies/${id}`)).data
  );
}

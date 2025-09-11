import client from "./client";

export async function listDepartments() {
  const res = await client.get("/departments");
  return Array.isArray(res.data) ? res.data : [];
}

export async function createDepartment(name) {
  // Backend expects { name }
  const res = await client.post("/departments", { name: String(name || "").trim() });
  return res.data;
}

export async function deleteDepartment(id) {
  await client.delete(`/departments/${id}`);
}

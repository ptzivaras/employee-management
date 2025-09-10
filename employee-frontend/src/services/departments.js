import client from "./client";

// GET /departments
export async function listDepartments() {
  const res = await client.get("/departments");
  return res.data; // [{id, name}, ...]
}

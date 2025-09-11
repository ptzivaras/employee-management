import client from "./client";

// List tasks for an employee
export async function listTasksByEmployee(employeeId) {
  const res = await client.get("/tasks", { params: { empId: Number(employeeId) } });
  const data = res.data;

  // If controller returns Page<TaskResponse>
  if (data && Array.isArray(data.content)) return data.content;

  // If it ever returns a plain array
  if (Array.isArray(data)) return data;

  // Fallback
  return [];
}

// Create a task for an employee
export async function createTask(employeeId, taskName) {
  const payload = { empId: Number(employeeId), taskName: String(taskName) }; // <-- empId, not emp_id
  const res = await client.post("/tasks", payload);
  return res.data;
}

// Delete a task
export async function deleteTask(taskId) {
  await client.delete(`/tasks/${taskId}`);
}

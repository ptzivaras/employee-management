import client from "./client";

// List tasks for an employee
// Primary: GET /employees/{id}/tasks  (your backend already has this)
export async function listTasksByEmployee(employeeId) {
  const res = await client.get(`/employees/${employeeId}/tasks`);
  return res.data ?? [];
}

// Create a task for an employee
// Your backend: POST /tasks  { emp_id, taskName }
export async function createTask(employeeId, taskName) {
  const payload = { emp_id: Number(employeeId), taskName: String(taskName) };
  const res = await client.post("/tasks", payload);
  return res.data;
}

// Delete a task
// DELETE /tasks/{id}
export async function deleteTask(taskId) {
  const res = await client.delete(`/tasks/${taskId}`);
  return res.data;
}

// src/pages/EmployeeDetails.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getEmployee } from "../api/employees";
import { listTasksByEmployee, createTask, deleteTask } from "../api/tasks";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [taskName, setTaskName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const [emp, taskList] = await Promise.all([
        getEmployee(id),
        listTasksByEmployee(id),
      ]);
      setEmployee(emp);
      setTasks(Array.isArray(taskList) ? taskList : []);
      setError("");
    } catch (e) {
      setError("Failed to load employee.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function onAddTask(e) {
    e.preventDefault();
    const name = taskName.trim();
    if (!name) return;
    try {
      setSaving(true);
      const created = await createTask(id, name);
      setTasks((prev) => [created, ...prev]);
      setTaskName("");
    } catch (e) {
      alert(e?.response?.data?.detail || e?.message || "Create failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDeleteTask(taskId) {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (e) {
      alert(e?.response?.data?.detail || e?.message || "Delete failed");
    }
  }

  if (loading) return <div className="container">Loading…</div>;
  if (error) return <div className="container"><div className="alert alert-danger">{error}</div></div>;
  if (!employee) return <div className="container">Not found</div>;

  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>← Back</button>
          <h3 className="m-0">Employee Details</h3>
        </div>
        <div>
          <Link to={`/employees/${id}/edit`} className="btn btn-primary">Edit</Link>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <strong>First name</strong>
              <div>{employee.firstName ?? employee.first_name ?? "-"}</div>
            </div>
            <div className="col-md-4">
              <strong>Last name</strong>
              <div>{employee.lastName ?? employee.last_name ?? "-"}</div>
            </div>
            <div className="col-md-4">
              <strong>Email</strong>
              <div>{employee.email ?? employee.emailId ?? "-"}</div>
            </div>
            <div className="col-md-4">
              <strong>Department</strong>
              <div>
                {employee.department?.name ??
                  employee.departmentName ??
                  employee.companyName ??
                  "-"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><strong>Tasks</strong></div>
        <div className="card-body">
          <form className="row g-2 align-items-end mb-3" onSubmit={onAddTask}>
            <div className="col-md-8">
              <label className="form-label">Task name</label>
              <input
                className="form-control"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="e.g., Prepare onboarding docs"
                disabled={saving}
              />
            </div>
            <div className="col-md-4">
              <button className="btn btn-success w-100" type="submit" disabled={saving}>
                {saving ? "Saving…" : "Add Task"}
              </button>
            </div>
          </form>

          {tasks.length === 0 ? (
            <div className="alert alert-info">No tasks yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th style={{ width: 120 }}>ID</th>
                    <th>Task</th>
                    <th style={{ width: 140 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t) => (
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{t.taskName ?? t.name ?? `Task #${t.id}`}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onDeleteTask(t.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

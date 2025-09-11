import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getEmployee } from "../api/employees";
import { listTasksByEmployee, createTask, deleteTask } from "../api/tasks";
import { pushToast } from "../components/ToastHost";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [taskName, setTaskName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const [emp, taskList] = await Promise.all([
          getEmployee(id),
          listTasksByEmployee(id), // -> /tasks?empId=ID
        ]);
        if (!alive) return;
        setEmployee(emp);
        setTasks(Array.isArray(taskList) ? taskList : []);
      } catch {
        navigate("/employees");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id, navigate]);

  async function onAddTask(e) {
    e.preventDefault();
    const trimmed = taskName.trim();
    if (!trimmed) return;

    try {
      setSaving(true);
      const created = await createTask(id, trimmed); // POST /tasks
      setTasks((prev) => [created, ...prev]);
      setTaskName("");
      pushToast({ type: "success", text: "Task created" });
    } catch {
      // interceptor/toast handles errors
    } finally {
      setSaving(false);
    }
  }

  async function onDeleteTask(taskId) {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(taskId); // DELETE /tasks/{id}
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      pushToast({ type: "success", text: "Task deleted" });
    } catch {
      // interceptor/toast handles errors
    }
  }

  if (loading) return <p>Loading…</p>;
  if (!employee) return <p>Employee not found.</p>;

  return (
    <div className="d-grid gap-3">
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 className="m-0">Employee Details</h2>
      </div>

      <div className="card card-body">
        <div className="row">
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
        </div>
        <div className="mt-3">
          <Link className="btn btn-sm btn-primary" to={`/employees/${id}/edit`}>
            Edit
          </Link>
        </div>
      </div>

      <div className="card card-body">
        <h4 className="mb-3">Tasks</h4>

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
            <table className="table table-striped table-hover">
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
                    <td>{t.taskName ?? t.name}</td>
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
  );
}

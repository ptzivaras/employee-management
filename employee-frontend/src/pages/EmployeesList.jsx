import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listEmployees, deleteEmployee } from "../api/employees";

export default function EmployeesList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await listEmployees();
        if (!alive) return;
        setRows(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        alert("Failed to load employees. See console for details.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  async function onDelete(id) {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await deleteEmployee(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert(
        "Delete failed. If the employee has tasks, the backend may reject deletion."
      );
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Employees</h2>
        <button className="btn btn-primary" onClick={() => nav("/employees/new")}>
          + Add Employee
        </button>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : rows.length === 0 ? (
        <div className="alert alert-info">No employees yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th>Email</th>
                <th>Department/Company</th>
                <th style={{ width: 180 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => {
                const email = e.email ?? e.emailId ?? "";
                const dept =
                  e.departmentName ??
                  e.companyName ??
                  e.department?.name ??
                  e.company ??
                  "";
                return (
                  <tr key={e.id}>
                    <td>{e.firstName}</td>
                    <td>{e.lastName}</td>
                    <td>{email}</td>
                    <td>{dept}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => nav(`/employees/${e.id}/edit`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(e.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

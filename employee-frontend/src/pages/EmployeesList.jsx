import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listEmployees, deleteEmployee } from "../api/employees";
import { pushToast } from "../components/ToastHost";

export default function EmployeesList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await listEmployees();
        if (!alive) return;
        setRows(Array.isArray(data) ? data : []);
      } catch (err) {
        // interceptor already showed toast
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
      setRows((prev) => prev.filter((e) => e.id !== id));
      pushToast({ type: "success", text: "Employee deleted" });
    } catch {
      // interceptor showed toast
    }
  }

  return (
    <div className="d-grid gap-3">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="m-0">Employees</h2>
        <Link to="/employees/new" className="btn btn-primary">+ Add Employee</Link>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : rows.length === 0 ? (
        <div className="alert alert-info">No employees yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th style={{ width: 120 }}>ID</th>
                <th>First</th>
                <th>Last</th>
                <th>Email</th>
                <th style={{ width: 260 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.firstName}</td>
                  <td>{e.lastName}</td>
                  <td>{e.emailId}</td>
                  <td className="d-flex gap-2">
                    <Link className="btn btn-sm btn-outline-secondary" to={`/employees/${e.id}`}>
                      View
                    </Link>
                    <Link className="btn btn-sm btn-outline-primary" to={`/employees/${e.id}/edit`}>
                      Edit
                    </Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(e.id)}>
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
  );
}

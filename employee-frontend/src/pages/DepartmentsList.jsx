import { useEffect, useState } from "react";
import { listDepartments, createDepartment, deleteDepartment } from "../api/departments";

export default function DepartmentsList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await listDepartments();
        if (!alive) return;
        setRows(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        alert("Failed to load departments.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  async function onCreate(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      alert("Department name is required.");
      return;
    }
    try {
      setSaving(true);
      const created = await createDepartment(trimmed);
      setRows((prev) => [created, ...prev]);
      setName("");
      setShowAdd(false);
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.detail || err?.response?.data?.message || "Create failed.";
      alert(msg);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id) {
    if (!window.confirm("Delete this department? Employees linked to it will block deletion.")) return;
    try {
      await deleteDepartment(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Delete failed. It may be referenced by employees.";
      alert(msg);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Departments</h2>
        <button className="btn btn-primary" onClick={() => setShowAdd((s) => !s)}>
          {showAdd ? "Close" : "+ Add Department"}
        </button>
      </div>

      {showAdd && (
        <form className="card card-body mb-3" onSubmit={onCreate}>
          <div className="row g-2 align-items-end">
            <div className="col-md-8">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                placeholder="e.g., Engineering"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={saving}
              />
            </div>
            <div className="col-md-4 d-flex gap-2">
              <button className="btn btn-success" type="submit" disabled={saving}>
                {saving ? "Saving…" : "Create"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setShowAdd(false);
                  setName("");
                }}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {loading ? (
        <p>Loading…</p>
      ) : rows.length === 0 ? (
        <div className="alert alert-info">No departments yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th style={{ width: 120 }}>ID</th>
                <th>Name</th>
                <th style={{ width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(d.id)}>
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

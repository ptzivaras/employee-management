import { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../api/employees';
import { Link } from 'react-router-dom';

export default function EmployeesList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  async function load() {
    try {
      setLoading(true);
      const data = await listEmployees();
      setRows(Array.isArray(data) ? data : []);   // <-- guard
      setErr('');
    } catch (e) {
      console.warn('Employees fetch error:', e?.response?.data || e);
      setErr('Failed to fetch employees.');
      setRows([]);                                // <-- guard
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function onDelete(id) {
    if (!confirm('Delete this employee?')) return;
    try {
      await deleteEmployee(id);
      await load();
    } catch (e) {
      alert('Delete failed (maybe the employee has tasks).');
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Employees</h3>
        <Link to="/employees/new" className="btn btn-primary">Add Employee</Link>
      </div>

      {loading && <div>Loading…</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      {!loading && !err && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th>Email</th>
                <th>Department</th>
                <th style={{ width: 180 }}></th>
              </tr>
            </thead>
            <tbody>
              {(rows ?? []).map(r => (   // <-- guard when rendering
                <tr key={r.id}>
                  <td>{r.firstName ?? r.first_name}</td>
                  <td>{r.lastName ?? r.last_name}</td>
                  <td>{r.email ?? r.emailId}</td>
                  <td>{r.departmentName ?? r.department?.name ?? r.companyName ?? '-'}</td>
                  <td>
                    <Link to={`/employees/${r.id}`} className="btn btn-sm btn-outline-secondary me-2">View</Link>
                    <Link to={`/employees/${r.id}/edit`} className="btn btn-sm btn-outline-primary me-2">Edit</Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {!rows?.length && (
                <tr><td colSpan="5" className="text-center text-muted">No employees yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEmployee } from '../api/employees';

export default function EmployeeView() {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const e = await getEmployee(id);
        setModel(e);
        setErr('');
      } catch {
        setErr('Failed to load employee.');
      }
    })();
  }, [id]);

  if (err) return <div className="container"><div className="alert alert-danger">{err}</div></div>;
  if (!model) return <div className="container">Loading…</div>;

  return (
    <div className="container" style={{maxWidth: 720}}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Employee Details</h3>
        <div>
          <Link to={`/employees/${id}/edit`} className="btn btn-outline-primary me-2">Edit</Link>
          <Link to="/employees" className="btn btn-secondary">Back</Link>
        </div>
      </div>

      <table className="table">
        <tbody>
          <tr><th>First name</th><td>{model.firstName}</td></tr>
          <tr><th>Last name</th><td>{model.lastName}</td></tr>
          <tr><th>Email</th><td>{model.email}</td></tr>
          <tr><th>Department</th><td>{model.departmentName ?? '-'}</td></tr>
        </tbody>
      </table>
    </div>
  );
}

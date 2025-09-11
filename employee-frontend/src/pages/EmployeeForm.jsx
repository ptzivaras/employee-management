import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../api/employees';
import { listDepartments } from '../api/departments';

export default function EmployeeForm() {
  const { id } = useParams();           // undefined for create, defined for edit
  const isEdit = !!id;
  const nav = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    departmentId: '',
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    async function init() {
      try {
        const deps = await listDepartments();
        setDepartments(Array.isArray(deps) ? deps : []);

        if (isEdit) {
          const e = await getEmployee(id);
          setForm({
            firstName: e.firstName ?? e.first_name ?? '',
            lastName:  e.lastName  ?? e.last_name  ?? '',
            email:     e.email     ?? e.emailId    ?? '',
            // support both new and old payloads
            departmentId:
              e.departmentId ??
              e.department?.id ??
              e.compId ??
              '',
          });
        }
      } catch {
        setErr('Failed to load form data.');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [id, isEdit]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setErr('');

    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName:  form.lastName.trim(),
        email:     form.email.trim(),            // API layer maps to legacy if needed
        departmentId: Number(form.departmentId), // ensure number
      };

      if (!payload.firstName || !payload.lastName || !payload.email || !payload.departmentId) {
        throw new Error('All fields are required.');
      }

      if (isEdit) await updateEmployee(id, payload);
      else        await createEmployee(payload);

      nav('/employees');
    } catch (ex) {
      const d = ex?.response?.data;
      const msg =
        d?.detail ||
        d?.message ||
        (d?.fieldErrors && Object.entries(d.fieldErrors).map(([k,v]) => `${k}: ${v}`).join(', ')) ||
        ex?.message ||
        'Save failed.';
      setErr(msg);
      console.warn('Save error', d || ex);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="container">Loading…</div>;

  return (
    <div className="container" style={{maxWidth: 720}}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={() => nav(-1)}>
            ← Back
          </button>
          <h3 className="m-0">{isEdit ? 'Edit Employee' : 'Add Employee'}</h3>
        </div>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">First name</label>
          <input className="form-control" name="firstName" value={form.firstName} onChange={onChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Last name</label>
          <input className="form-control" name="lastName" value={form.lastName} onChange={onChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={onChange} required />
        </div>

        <div className="mb-4">
          <label className="form-label">Department</label>
          <select className="form-select" name="departmentId" value={form.departmentId} onChange={onChange} required>
            <option value="">-- Select --</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => nav('/employees')} disabled={saving}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

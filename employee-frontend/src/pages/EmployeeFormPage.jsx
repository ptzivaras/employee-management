import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeeById, createEmployee, updateEmployee } from '../services/employees.js'
import { listDepartments } from '../services/departments.js'

export default function EmployeeFormPage({ mode = 'create' }) {
  const navigate = useNavigate()
  const { id } = useParams()

  const isEdit = mode === 'edit'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [departmentId, setDepartmentId] = useState('')

  const [departments, setDepartments] = useState([])

  useEffect(() => {
    let mounted = true
    setLoading(true)

    const fetches = [listDepartments()]
    if (isEdit && id) fetches.push(getEmployeeById(id))

    Promise.all(fetches)
      .then(([depts, emp]) => {
        if (!mounted) return
        setDepartments(depts ?? [])
        if (emp) {
          setFirstName(emp.firstName ?? emp.first_name ?? '')
          setLastName(emp.lastName ?? emp.last_name ?? '')
          setEmail(emp.email ?? emp.emailId ?? '')
          // Support both new and old shapes
          const deptId =
            emp.departmentId ??
            emp.department?.id ??
            emp.compId ??
            ''
          setDepartmentId(String(deptId || ''))
        }
        setError(null)
      })
      .catch((err) => setError(err?.message || 'Failed to load form'))
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [id, isEdit])

  const canSubmit = useMemo(() =>
    firstName.trim() && lastName.trim() && email.trim() && departmentId, [firstName, lastName, email, departmentId]
  )

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      departmentId: Number(departmentId),
    }

    try {
      if (isEdit) {
        await updateEmployee(id, payload)
      } else {
        await createEmployee(payload)
      }
      navigate('/employees')
    } catch (ex) {
      const details = ex?.response?.data
      const msg =
        details?.detail ||
        details?.message ||
        Object.values(details?.fieldErrors || {})?.join(', ') ||
        ex?.message ||
        'Save failed'
      alert(msg)
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <strong>{isEdit ? 'Update' : 'Add'} Employee</strong>
      </div>
      <div className="card-body">
        {loading && <div className="alert alert-secondary">Loading…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">First name</label>
              <input className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Last name</label>
              <input className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Department</label>
              <select className="form-select" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
                <option value="">-- Select department --</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-success" type="submit" disabled={!canSubmit}>
                {isEdit ? 'Update' : 'Save'}
              </button>
              <button className="btn btn-outline-secondary" type="button" onClick={() => navigate('/employees')}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

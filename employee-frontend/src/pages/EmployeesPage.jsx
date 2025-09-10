import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { listEmployees, deleteEmployee } from '../services/employees.js'

export default function EmployeesPage() {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [busyId, setBusyId] = useState(null)

  const load = () => {
    setLoading(true)
    listEmployees()
      .then((data) => {
        setEmployees(data)
        setError(null)
      })
      .catch((err) => setError(err?.message || 'Failed to load employees'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const onDelete = async (id) => {
    if (!confirm('Delete this employee?')) return
    try {
      setBusyId(id)
      await deleteEmployee(id)
      setEmployees((prev) => prev.filter((e) => String(e.id) !== String(id)))
    } catch (e) {
      alert(e?.response?.data?.detail || e?.message || 'Delete failed')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Employees</h3>
        <Link className="btn btn-primary" to="/employees/new">Add Employee</Link>
      </div>

      {loading && <div className="alert alert-secondary">Loading…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="scrollTable">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th>Email</th>
                <th>Department</th>
                <th style={{width: 220}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 && (
                <tr><td colSpan="5" className="text-muted">No employees.</td></tr>
              )}
              {employees.map((e) => {
                const first = e.firstName ?? e.first_name
                const last = e.lastName ?? e.last_name
                const email = e.email ?? e.emailId
                const dept =
                  e.department?.name ??
                  e.departmentName ??
                  e.companyName ?? '-' // fallback for old payloads

                return (
                  <tr key={e.id}>
                    <td>{first}</td>
                    <td>{last}</td>
                    <td>{email}</td>
                    <td>{dept}</td>
                    <td className="d-flex gap-2">
                      <Link className="btn btn-outline-secondary btn-sm" to={`/employees/${e.id}`}>View</Link>
                      <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/employees/${e.id}/edit`)}>Edit</button>
                      <button
                        className="btn btn-danger btn-sm"
                        disabled={busyId === e.id}
                        onClick={() => onDelete(e.id)}
                      >
                        {busyId === e.id ? 'Deleting…' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

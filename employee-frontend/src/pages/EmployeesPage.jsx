import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listEmployees } from '../services/employees.js'

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    listEmployees()
      .then((res) => {
        if (!mounted) return
        setEmployees(res)
        setError(null)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err?.message || 'Failed to load employees')
      })
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Employees</h2>
        {/* Future: add buttons for create, filters, etc. */}
      </div>

      {loading && <div className="alert alert-secondary">Loading…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive scrollTable">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={{ width: 80 }}>ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Department</th>
                <th style={{ width: 220 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    No employees found.
                  </td>
                </tr>
              )}
              {employees.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.firstName ?? e.first_name ?? '-'}</td>
                  <td>{e.lastName ?? e.last_name ?? '-'}</td>
                  <td>{e.email ?? e.emailId ?? '-'}</td>
                  <td>
                    {e.departmentName ??
                      e.companyName /* fallback for old payloads */ ??
                      e.department?.name ??
                      '-'}
                  </td>
                  <td>
                    <div className="btn-group">
                      <Link to={`/employees/${e.id}`} className="btn btn-outline-primary btn-sm">
                        View
                      </Link>
                      <Link to={`/employees/${e.id}/edit`} className="btn btn-outline-secondary btn-sm">
                        Edit
                      </Link>
                      <button className="btn btn-outline-danger btn-sm" disabled>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

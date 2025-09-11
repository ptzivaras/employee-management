import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getEmployeeById } from '../api/employees.js'
import { listTasksByEmployeeId } from '../api/tasks.js'

export default function EmployeeDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [employee, setEmployee] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    Promise.all([
      getEmployeeById(id),
      listTasksByEmployeeId(id),
    ])
      .then(([emp, tks]) => {
        if (!mounted) return
        setEmployee(emp)
        setTasks(tks)
        setError(null)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err?.message || 'Failed to load details')
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [id])

  return (
    <div>
      <div className="d-flex gap-2 mb-3">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <Link to="/employees" className="btn btn-outline-primary">Employees</Link>
      </div>

      {loading && <div className="alert alert-secondary">Loading…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && employee && (
        <>
          {/* Employee card */}
          <div className="card mb-3">
            <div className="card-header">
              <strong>Employee Details</strong>
            </div>
            <div className="card-body">
              <table className="table mb-0">
                <tbody>
                  <tr>
                    <th style={{width: 180}}>ID</th>
                    <td>{employee.id}</td>
                  </tr>
                  <tr>
                    <th>First name</th>
                    <td>{employee.firstName ?? employee.first_name ?? '-'}</td>
                  </tr>
                  <tr>
                    <th>Last name</th>
                    <td>{employee.lastName ?? employee.last_name ?? '-'}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{employee.email ?? employee.emailId ?? '-'}</td>
                  </tr>
                  <tr>
                    <th>Department</th>
                    <td>
                      {employee.departmentName ??
                        employee.companyName /* for older payloads */ ??
                        employee.department?.name ??
                        '-'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tasks list */}
          <div className="card">
            <div className="card-header">
              <strong>Tasks</strong>
            </div>
            <div className="card-body scrollTasks">
              {tasks.length === 0 ? (
                <div className="text-muted">No tasks found for this employee.</div>
              ) : (
                <ul className="list-group">
                  {tasks.map((t) => (
                    <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{t.taskName ?? t.name ?? `Task #${t.id}`}</span>
                      {/* Read-only for now */}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

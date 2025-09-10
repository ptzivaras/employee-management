import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="text-center mt-5">
      <h1 className="mb-3">Welcome</h1>
      <p className="text-muted">
        This is the new React (Vite) frontend. Use the navigation to access features.
      </p>
      <Link to="/employees" className="btn btn-primary mt-3">
        Go to Employees
      </Link>
    </div>
  )
}

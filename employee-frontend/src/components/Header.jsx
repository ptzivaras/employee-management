import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">Employee Management</Link>
          <div className="navbar-nav">
            <NavLink to="/" end className="nav-link">Home</NavLink>
            <NavLink to="/employees" className="nav-link">Employees</NavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

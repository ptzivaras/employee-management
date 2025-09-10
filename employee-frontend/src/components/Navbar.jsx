import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">Employee Manager</Link>
        <div className="navbar-nav">
          <NavLink to="/employees" className="nav-link">Employees</NavLink>
          <NavLink to="/employees/new" className="nav-link">Add</NavLink>
        </div>
      </div>
    </nav>
  );
}

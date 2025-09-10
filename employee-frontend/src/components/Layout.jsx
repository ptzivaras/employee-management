import { NavLink } from "react-router-dom";
import ToastHost from "./ToastHost";

export default function Layout({ children }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink to="/" className="navbar-brand">Employee Management</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div id="mainNav" className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/employees" className="nav-link">Employees</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/departments" className="nav-link">Departments</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        {children}
      </main>

      <ToastHost />
    </>
  );
}

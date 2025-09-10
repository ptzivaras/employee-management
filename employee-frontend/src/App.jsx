import { BrowserRouter, Routes, Route, Navigate, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeesList from "./pages/EmployeesList.jsx";
import EmployeeForm from "./pages/EmployeeForm.jsx";
import DepartmentsList from "./pages/DepartmentsList.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container py-3">
        <header className="mb-4">
          <h1 className="mb-3">Employee Management</h1>
          <ul className="nav nav-pills gap-2">
            <li className="nav-item">
              <NavLink to="/employees" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Employees
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/departments" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Departments
              </NavLink>
            </li>
          </ul>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<EmployeesList />} />
          <Route path="/employees/new" element={<EmployeeForm mode="create" />} />
          <Route path="/employees/:id/edit" element={<EmployeeForm mode="edit" />} />
          <Route path="/departments" element={<DepartmentsList />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

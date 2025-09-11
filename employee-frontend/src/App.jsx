import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';          // shows navbar + toasts
import HomePage from './pages/HomePage';
import EmployeesList from './pages/EmployeesList';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeDetails from './pages/EmployeeDetails';
import DepartmentsList from './pages/DepartmentsList';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Home -> redirect to Employees */}
          <Route index element={<Navigate to="/employees" replace />} />

          {/* Employees */}
          <Route path="/employees" element={<EmployeesList />} />
          <Route path="/employees/new" element={<EmployeeForm />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/employees/:id/edit" element={<EmployeeForm />} />

          {/* Departments */}
          <Route path="/departments" element={<DepartmentsList />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

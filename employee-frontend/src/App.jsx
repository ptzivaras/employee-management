import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import EmployeesList from "./pages/EmployeesList.jsx";
import EmployeeForm from "./pages/EmployeeForm.jsx";
import EmployeeDetails from "./pages/EmployeeDetails.jsx";
import DepartmentsList from "./pages/DepartmentsList.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<EmployeesList />} />
        <Route path="/employees/new" element={<EmployeeForm mode="create" />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/employees/:id/edit" element={<EmployeeForm mode="edit" />} />
        <Route path="/departments" element={<DepartmentsList />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </Layout>
  );
}

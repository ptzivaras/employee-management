import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EmployeesList from './pages/EmployeesList';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeView from './pages/EmployeeView';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<EmployeesList />} />
        <Route path="/employees/new" element={<EmployeeForm />} />
        <Route path="/employees/:id" element={<EmployeeView />} />
        <Route path="/employees/:id/edit" element={<EmployeeForm />} />
        <Route path="*" element={<div className="container">Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

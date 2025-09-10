import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

// Pages (we will implement EmployeesPage in FE-2)
import HomePage from './pages/HomePage.jsx'

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="container my-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* FE-2 will add: <Route path="/employees" element={<EmployeesPage />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

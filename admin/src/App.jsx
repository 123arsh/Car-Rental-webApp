import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/login.jsx';
import Signup from './components/auth/signup.jsx';
import AdminDashboard from './components/dashboard.jsx';

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const isAuthenticated = !!localStorage.getItem('adminToken');
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/admin/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
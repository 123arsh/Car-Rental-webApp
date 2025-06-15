import { useState } from 'react'
import Login from './auth/login.jsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />
  }

  // Placeholder for dashboard
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h2>
        <p>Welcome, admin! (Dashboard content will go here.)</p>
      </div>
    </div>
  )
}

export default App

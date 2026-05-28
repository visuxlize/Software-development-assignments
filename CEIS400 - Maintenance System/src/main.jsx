import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Nav from './components/Nav'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Checkout from './pages/Checkout'
import Return from './pages/Return'
import Supervisor from './pages/Supervisor'
import { mutedText } from './styles'

// Guard for pages that need you to be logged in.
// supervisorOnly sends regular employees back to dashboard if they try /supervisor
function PrivateRoute({ children, supervisorOnly = false }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <p style={{ ...mutedText, padding: '2rem', textAlign: 'center' }}>Loading...</p>
  }

  if (!user) {
    return <Navigate to="/" />
  }

  if (supervisorOnly && user.role !== 'supervisor') {
    return <Navigate to="/dashboard" />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/return"
            element={
              <PrivateRoute>
                <Return />
              </PrivateRoute>
            }
          />
          <Route
            path="/supervisor"
            element={
              <PrivateRoute supervisorOnly>
                <Supervisor />
              </PrivateRoute>
            }
          />
          {/* anything unknown goes back to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

// StrictMode helps catch weird bugs in development (runs effects twice on purpose)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

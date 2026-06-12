import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Nav from './components/Nav'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Checkout from './pages/Checkout'
import Return from './pages/Return'
import Materials from './pages/Materials'
import Supervisor from './pages/Supervisor'

function PrivateRoute({ children, supervisorOnly }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/" />
  if (supervisorOnly && user.role !== 'supervisor') return <Navigate to="/dashboard" />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/checkout"  element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/return"    element={<PrivateRoute><Return /></PrivateRoute>} />
          <Route path="/materials" element={<PrivateRoute><Materials /></PrivateRoute>} />
          <Route path="/supervisor" element={<PrivateRoute supervisorOnly><Supervisor /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

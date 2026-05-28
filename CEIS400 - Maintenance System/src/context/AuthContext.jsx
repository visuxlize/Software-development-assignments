import { createContext, useContext, useState, useEffect } from 'react'
import { mockLogin } from '../mock/api'

// React context = a way to share login info with any component without passing props everywhere
const AuthContext = createContext(null)

// Wraps the whole app in main.jsx so pages can call useAuth()
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On refresh, check if we already saved the user in the browser
  useEffect(() => {
    const stored = localStorage.getItem('mmms_user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  async function login(emp_id, password) {
    const loggedInUser = await mockLogin(emp_id, password)
    localStorage.setItem('mmms_user', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
    return loggedInUser
  }

  function logout() {
    localStorage.removeItem('mmms_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — any page imports this instead of useContext(AuthContext) directly
export function useAuth() {
  return useContext(AuthContext)
}

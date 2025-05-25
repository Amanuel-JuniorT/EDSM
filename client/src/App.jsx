import { Route, Routes, Navigate } from "react-router-dom"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"



const App = () => {

  const { isCheckingAuth, checkAuth, user } = useAuthStore()

  useEffect(() => {
    // Check authentication status when the app loads
    checkAuth()
  }, [checkAuth])

  return (
    <div>
      {/* Loading Page */}
      {isCheckingAuth && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
      <Routes>
        <Route path="/signup" element={ user? <Navigate to="/dashboard"/> : <SignUp />} />
        <Route path="/login" element={user? <Navigate to="/dashboard"/> : <Login />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
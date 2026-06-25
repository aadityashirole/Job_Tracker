import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AddJob from "./pages/AddJob"
import JDAnalyzer from "./pages/JDAnalyzer"
import ResumeScorer from "./pages/ResumeScorer"
import InterviewPrep from "./pages/InterviewPrep"
import EditJobs from "./pages/EditJobs"

function App() {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    setToken(storedToken)
    setLoading(false)
  }, [])

  if (loading) return <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Loading...</div>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/add-job" element={token ? <AddJob /> : <Navigate to="/login" />} />
        <Route path="/jd-analyzer" element={token ? <JDAnalyzer /> : <Navigate to="/login" />} />
        <Route path="/resume-scorer" element={token ? <ResumeScorer /> : <Navigate to="/login" />} />
        <Route path="/interview-prep" element={token ? <InterviewPrep /> : <Navigate to="/login" />} />
        <Route path="/edit-job/:id" element={<EditJobs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import AddJob from "./pages/AddJob"
import JDAnalyzer from "./pages/JDAnalyzer"
import ResumeScorer from "./pages/ResumeScorer"
import InterviewPrep from "./pages/InterviewPrep"

function App() {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    setToken(storedToken)
    setLoading(false)
  }, [])

  if (loading) return <div style={{color: "white", textAlign: "center", marginTop: "50px"}}>Loading...</div>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/add-job" element={token ? <AddJob /> : <Navigate to="/" />} />
        <Route path="/jd-analyzer" element={token ? <JDAnalyzer /> : <Navigate to="/" />} />
        <Route path="/resume-scorer" element={token ? <ResumeScorer /> : <Navigate to="/" />} />
        <Route path="/interview-prep" element={token ? <InterviewPrep /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
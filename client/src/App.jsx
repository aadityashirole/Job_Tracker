import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import AddJob from "./pages/AddJob"
import JDAnalyzer from "./pages/JDAnalyzer"
import ResumeScorer from "./pages/ResumeScorer"

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (loading) return <div style={{color: "white", textAlign: "center", marginTop: "50px"}}>Loading...</div>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!session ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/add-job" element={session ? <AddJob /> : <Navigate to="/" />} />
        <Route path="/jd-analyzer" element={session ? <JDAnalyzer /> : <Navigate to="/" />} />
        <Route path="/resume-scorer" element={session ? <ResumeScorer /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
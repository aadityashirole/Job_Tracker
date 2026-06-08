import { useState } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleLogin() {
    setLoading(true)
    setError("")
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      navigate("/dashboard")
    }
  }

  async function handleSignup() {
    setLoading(true)
    setError("")
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setError("Check your email for confirmation link!")
    }
  }

  return (
    <div style={{minHeight: "100vh", backgroundColor: "#030712", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px"}}>
      <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", padding: "32px", borderRadius: "16px", width: "100%", maxWidth: "400px"}}>

        <div style={{textAlign: "center", marginBottom: "32px"}}>
          <div style={{backgroundColor: "#2563eb", width: "48px", height: "48px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px"}}>
            <span style={{color: "white", fontWeight: "bold"}}>JT</span>
          </div>
          <h1 style={{color: "white", fontSize: "24px", fontWeight: "bold"}}>Welcome back</h1>
          <p style={{color: "#6b7280", fontSize: "14px", marginTop: "4px"}}>Sign in to your Job Tracker account</p>
        </div>

        {error && (
          <div style={{backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", color: "#f87171", fontSize: "14px", padding: "12px 16px", borderRadius: "8px", marginBottom: "16px"}}>
            {error}
          </div>
        )}

        <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
          <div>
            <label style={{color: "#9ca3af", fontSize: "14px"}}>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{width: "100%", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "12px 16px", borderRadius: "8px", marginTop: "4px", outline: "none", fontSize: "14px", boxSizing: "border-box"}}
            />
          </div>

          <div>
            <label style={{color: "#9ca3af", fontSize: "14px"}}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{width: "100%", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "12px 16px", borderRadius: "8px", marginTop: "4px", outline: "none", fontSize: "14px", boxSizing: "border-box"}}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{width: "100%", backgroundColor: "#2563eb", color: "white", fontWeight: "600", padding: "12px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "14px"}}
          >
            {loading ? "Signing in..." : "Sign in →"}
          </button>

          <button
            onClick={handleSignup}
            disabled={loading}
            style={{width: "100%", backgroundColor: "#1f2937", color: "white", fontWeight: "500", padding: "12px", borderRadius: "8px", border: "1px solid #374151", cursor: "pointer", fontSize: "14px"}}
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
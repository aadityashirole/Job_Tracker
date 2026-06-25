import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../api"

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.name.trim()) {
      setError("Please enter your name")
      return
    }

    if (!form.email.trim()) {
      setError("Please enter your email")
      return
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setError("")

    const data = await registerUser(form.name.trim(), form.email.trim(), form.password)

    setLoading(false)

    if (data.message && !data.token) {
      setError(data.message)
    } else {
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      navigate("/dashboard")
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #07111f, #0b1220, #111827)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(17,24,39,0.75)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              background: "linear-gradient(135deg,#10b981,#3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "white",
              fontWeight: "700",
              fontSize: "20px"
            }}
          >
            JT
          </div>

          <h1 style={{ color: "white", fontSize: "30px", fontWeight: "700", marginBottom: "8px" }}>
            Create Account
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "15px" }}>
            Start tracking your applications and interviews
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#f87171",
              padding: "12px",
              borderRadius: "12px",
              marginBottom: "18px",
              fontSize: "14px"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ color: "#cbd5e1", fontSize: "14px", display: "block", marginBottom: "8px" }}>
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              style={{
                width: "100%",
                background: "#0f172a",
                border: "1px solid #334155",
                color: "white",
                padding: "14px 16px",
                borderRadius: "12px",
                outline: "none",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ color: "#cbd5e1", fontSize: "14px", display: "block", marginBottom: "8px" }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={{
                width: "100%",
                background: "#0f172a",
                border: "1px solid #334155",
                color: "white",
                padding: "14px 16px",
                borderRadius: "12px",
                outline: "none",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ color: "#cbd5e1", fontSize: "14px", display: "block", marginBottom: "8px" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width: "100%",
                background: "#0f172a",
                border: "1px solid #334155",
                color: "white",
                padding: "14px 16px",
                borderRadius: "12px",
                outline: "none",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label style={{ color: "#cbd5e1", fontSize: "14px", display: "block", marginBottom: "8px" }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width: "100%",
                background: "#0f172a",
                border: "1px solid #334155",
                color: "white",
                padding: "14px 16px",
                borderRadius: "12px",
                outline: "none",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "linear-gradient(135deg,#10b981,#3b82f6)",
              color: "white",
              border: "none",
              padding: "14px",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "15px",
              marginBottom: "14px"
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          style={{
            width: "100%",
            background: "transparent",
            color: "white",
            border: "1px solid #334155",
            padding: "14px",
            borderRadius: "12px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "15px"
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}

export default Register

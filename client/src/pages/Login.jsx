import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../api"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin() {
    setLoading(true)
    setError("")

    const data = await loginUser(email, password)

    setLoading(false)

    if (data.message) {
      setError(data.message)
    } else {
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      window.location.href = "/dashboard"
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #07111f, #0b1220, #111827)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(16,185,129,0.12)",
          filter: "blur(120px)",
          top: "-150px",
          left: "-100px"
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(59,130,246,0.12)",
          filter: "blur(120px)",
          bottom: "-100px",
          right: "-100px"
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(17,24,39,0.75)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "40px",
          position: "relative",
          zIndex: 2,
          boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
        }}
      >
        {/* Logo */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px"
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              background:
                "linear-gradient(135deg,#10b981,#3b82f6)",
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

          <h1
            style={{
              color: "white",
              fontSize: "30px",
              fontWeight: "700",
              marginBottom: "8px"
            }}
          >
            Welcome Back
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "15px"
            }}
          >
            Sign in to continue managing your job search
          </p>
        </div>

        {/* Error */}
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

        {/* Email */}
        <div style={{ marginBottom: "18px" }}>
          <label
            style={{
              color: "#cbd5e1",
              fontSize: "14px",
              display: "block",
              marginBottom: "8px"
            }}
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/* Password */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              color: "#cbd5e1",
              fontSize: "14px",
              display: "block",
              marginBottom: "8px"
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            background:
              "linear-gradient(135deg,#10b981,#3b82f6)",
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
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "14px"
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "#334155"
            }}
          />

          <span
            style={{
              color: "#64748b",
              fontSize: "13px"
            }}
          >
            OR
          </span>

          <div
            style={{
              flex: 1,
              height: "1px",
              background: "#334155"
            }}
          />
        </div>

        {/* Signup */}
        <button
          onClick={() => navigate("/register")}
          disabled={loading}
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
          Create New Account
        </button>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "13px",
            marginTop: "24px"
          }}
        >
          Built for students & job seekers
        </p>
      </div>
    </div>
  )
}

export default Login
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function JDAnalyzer() {
  const navigate = useNavigate()

  const [skills, setSkills] = useState("")
  const [jd, setJd] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function analyzeGap() {
    if (!skills.trim() || !jd.trim()) {
      setError("Please fill both fields")
      return
    }
    if (skills.trim().length < 10) {
      setError("Please describe your skills in more detail (at least 10 characters)")
      return
    }
    if (jd.trim().length < 30) {
      setError("Please paste a complete job description (at least 30 characters)")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "https://job-tracker-qyzl.onrender.com"}/api/ai/jd-analyzer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skills, jd })
        }
      )
      const parsed = await response.json()
      setResult(parsed)
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Try again.")
    }

    setLoading(false)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #07111f, #0b1220, #111827)",
        color: "white"
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid rgba(255,255,255,0.06)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg,#10b981,#3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700"
            }}
          >
            JT
          </div>
          <span style={{ fontSize: "20px", fontWeight: "700" }}>Job Tracker</span>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white",
            padding: "10px 18px",
            borderRadius: "12px",
            cursor: "pointer"
          }}
        >
          ← Dashboard
        </button>
      </nav>

      <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "0 20px" }}>
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "999px",
              background: "rgba(59,130,246,0.15)",
              color: "#60a5fa",
              border: "1px solid rgba(59,130,246,0.2)",
              fontSize: "13px",
              marginBottom: "16px"
            }}
          >
            AI Powered Analysis
          </div>

          <h1 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "12px" }}>
            JD Gap Analyzer
          </h1>

          <p style={{ color: "#94a3b8", fontSize: "16px" }}>
            Compare your skills against any job description and discover what you need to learn next.
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#f87171",
              padding: "14px",
              borderRadius: "14px",
              marginBottom: "20px"
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            background: "rgba(17,24,39,0.75)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "24px",
            padding: "28px",
            marginBottom: "30px"
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "10px", color: "#cbd5e1", fontSize: "14px" }}>
                Your Current Skills
              </label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={10}
                placeholder="React, JavaScript, HTML, CSS, Node.js..."
                style={{
                  width: "100%",
                  background: "#0f172a",
                  border: "1px solid #334155",
                  color: "white",
                  padding: "14px",
                  borderRadius: "14px",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "10px", color: "#cbd5e1", fontSize: "14px" }}>
                Job Description
              </label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                rows={10}
                placeholder="Paste complete job description..."
                style={{
                  width: "100%",
                  background: "#0f172a",
                  border: "1px solid #334155",
                  color: "white",
                  padding: "14px",
                  borderRadius: "14px",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          <button
            onClick={analyzeGap}
            disabled={loading}
            style={{
              marginTop: "24px",
              background: "linear-gradient(135deg,#10b981,#3b82f6)",
              color: "white",
              border: "none",
              padding: "14px 30px",
              borderRadius: "14px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "15px"
            }}
          >
            {loading ? "Analyzing..." : "Analyze Skill Gap"}
          </button>
        </div>

        {result && (
          <>
            <div
              style={{
                background: "rgba(17,24,39,0.75)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "24px",
                padding: "30px",
                marginBottom: "24px",
                textAlign: "center"
              }}
            >
              <p style={{ color: "#94a3b8", marginBottom: "10px" }}>Match Score</p>
              <h2
                style={{
                  fontSize: "70px",
                  fontWeight: "700",
                  color: result.match_percentage >= 70 ? "#22c55e" : result.match_percentage >= 40 ? "#f59e0b" : "#ef4444"
                }}
              >
                {result.match_percentage}%
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
              <div
                style={{
                  background: "rgba(17,24,39,0.75)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "24px",
                  padding: "24px"
                }}
              >
                <h3 style={{ color: "#22c55e", marginBottom: "18px" }}>✅ Matching Skills</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {result.matched_skills.map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        background: "rgba(34,197,94,0.15)",
                        color: "#22c55e",
                        padding: "8px 14px",
                        borderRadius: "999px",
                        fontSize: "13px"
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: "rgba(17,24,39,0.75)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "24px",
                  padding: "24px"
                }}
              >
                <h3 style={{ color: "#ef4444", marginBottom: "18px" }}>❌ Missing Skills</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {result.missing_skills.map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        background: "rgba(239,68,68,0.15)",
                        color: "#ef4444",
                        padding: "8px 14px",
                        borderRadius: "999px",
                        fontSize: "13px"
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(17,24,39,0.75)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "24px",
                padding: "28px"
              }}
            >
              <h3 style={{ marginBottom: "14px", color: "#60a5fa" }}>💡 AI Recommendation</h3>
              <p style={{ color: "#cbd5e1", lineHeight: "1.8" }}>{result.recommendation}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default JDAnalyzer
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getInterviewQuestions } from "../api.js"
import MockInterviewModal from "../components/MockInterviewModal"

function InterviewPrep() {
  const navigate = useNavigate()
  const [role, setRole] = useState("")
  const [jd, setJd] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeMockQuestion, setActiveMockQuestion] = useState(null)

  async function generateQuestions() {
    if (!role.trim()) {
      setError("Please enter a role title")
      return
    }
    if (role.trim().length < 3) {
      setError("Please enter a valid role title")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const parsed = await getInterviewQuestions(role, jd)

      if (parsed.message) {
        throw new Error(parsed.message)
      }

      setResult(parsed)
    } catch (err) {
      console.error(err)
      setError(err.message || "Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #07111f, #0b1220, #111827)", color: "white" }}>
      <nav style={{ padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(20px)", background: "rgba(10,15,28,0.75)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg,#10b981,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>
            JT
          </div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "18px" }}>Job Tracker</div>
            <div style={{ fontSize: "12px", color: "#94a3b8" }}>AI Interview Assistant</div>
          </div>
        </div>
        <button onClick={() => navigate("/dashboard")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "white", padding: "10px 18px", borderRadius: "12px", cursor: "pointer", fontWeight: "600" }}>
          ← Dashboard
        </button>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "34px", marginBottom: "10px", fontWeight: "700" }}>Interview Preparation</h1>
          <p style={{ color: "#94a3b8", fontSize: "16px" }}>Generate AI-powered interview questions and practice live with an AI coach.</p>
        </div>

        {error && (
          <div style={{ background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)", padding: "14px", borderRadius: "12px", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <div style={{ background: "rgba(17,24,39,0.75)", backdropFilter: "blur(18px)", borderRadius: "20px", padding: "30px", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "30px" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#cbd5e1", fontWeight: "600" }}>Job Role *</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Frontend Developer, MERN Stack Developer..."
              style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#cbd5e1", fontWeight: "600" }}>Job Description (Optional)</label>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              rows={6}
              placeholder="Paste job description for better questions..."
              style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "15px", resize: "vertical", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <button
            onClick={generateQuestions}
            disabled={loading}
            style={{ background: "linear-gradient(135deg,#10b981,#3b82f6)", color: "white", border: "none", padding: "14px 28px", borderRadius: "12px", cursor: "pointer", fontWeight: "600", fontSize: "15px" }}
          >
            {loading ? "Generating Questions..." : "Generate Questions"}
          </button>
        </div>

        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Source Badge */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <span style={{
                background: result.source === "database" ? "rgba(16,185,129,0.2)" : "rgba(139,92,246,0.2)",
                color: result.source === "database" ? "#34d399" : "#a78bfa",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                border: result.source === "database" ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(139,92,246,0.3)"
              }}>
                {result.source === "database" ? "✓ Curated Questions" : "✨ AI Generated"}
              </span>
            </div>

            {/* TECHNICAL QUESTIONS */}
            <div style={{ background: "rgba(17,24,39,0.75)", borderRadius: "20px", padding: "28px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 style={{ marginBottom: "20px", color: "#60a5fa" }}>💻 Technical Questions</h2>
              {result.technical?.map((q, i) => (
                <div key={i} style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: i !== result.technical.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "280px" }}>
                    <p style={{ fontWeight: "600", marginBottom: "8px", color: "white", fontSize: "16px" }}>Q{i + 1}. {q.question}</p>
                    <p style={{ color: "#94a3b8", fontSize: "14px" }}>💡 {q.tip}</p>
                  </div>
                  <button
                    onClick={() => setActiveMockQuestion(q)}
                    style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: "#60a5fa", padding: "8px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    🎯 Practice Live
                  </button>
                </div>
              ))}
            </div>

            {/* BEHAVIORAL QUESTIONS */}
            <div style={{ background: "rgba(17,24,39,0.75)", borderRadius: "20px", padding: "28px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 style={{ marginBottom: "20px", color: "#22c55e" }}>🤝 Behavioral Questions</h2>
              {result.behavioral?.map((q, i) => (
                <div key={i} style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: i !== result.behavioral.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "280px" }}>
                    <p style={{ fontWeight: "600", marginBottom: "8px", color: "white", fontSize: "16px" }}>Q{i + 1}. {q.question}</p>
                    <p style={{ color: "#94a3b8", fontSize: "14px" }}>💡 {q.tip}</p>
                  </div>
                  <button
                    onClick={() => setActiveMockQuestion(q)}
                    style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80", padding: "8px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    🎯 Practice Live
                  </button>
                </div>
              ))}
            </div>

            {/* HR QUESTIONS */}
            <div style={{ background: "rgba(17,24,39,0.75)", borderRadius: "20px", padding: "28px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 style={{ marginBottom: "20px", color: "#f59e0b" }}>👔 HR Questions</h2>
              {result.hr?.map((q, i) => (
                <div key={i} style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: i !== result.hr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "280px" }}>
                    <p style={{ fontWeight: "600", marginBottom: "8px", color: "white", fontSize: "16px" }}>Q{i + 1}. {q.question}</p>
                    <p style={{ color: "#94a3b8", fontSize: "14px" }}>💡 {q.tip}</p>
                  </div>
                  <button
                    onClick={() => setActiveMockQuestion(q)}
                    style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#fbbf24", padding: "8px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    🎯 Practice Live
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>

      {/* LIVE MOCK INTERVIEW MODAL */}
      {activeMockQuestion && (
        <MockInterviewModal
          questionObj={activeMockQuestion}
          role={role}
          onClose={() => setActiveMockQuestion(null)}
        />
      )}
    </div>
  )
}

export default InterviewPrep
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ResumeScorer() {
  const navigate = useNavigate()

  const [resume, setResume] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function analyzeResume() {
    if (!resume.trim()) {
      setError("Please paste your resume")
      return
    }
    if (resume.trim().length < 100) {
      setError("Please paste your complete resume (at least 100 characters)")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "https://job-tracker-qyzl.onrender.com"}/api/ai/resume-scorer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resume })
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
        background:
          "linear-gradient(to bottom, #07111f, #0b1220, #111827)",
        color: "white"
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid rgba(255,255,255,0.06)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#10b981,#3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700"
            }}
          >
            JT
          </div>

          <span
            style={{
              fontSize: "20px",
              fontWeight: "700"
            }}
          >
            Job Tracker
          </span>
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

      {/* PAGE */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "50px auto",
          padding: "0 20px"
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "999px",
              background: "rgba(124,58,237,0.15)",
              color: "#a78bfa",
              border: "1px solid rgba(124,58,237,0.2)",
              fontSize: "13px",
              marginBottom: "16px"
            }}
          >
            AI Resume Analysis
          </div>

          <h1
            style={{
              fontSize: "42px",
              fontWeight: "700",
              marginBottom: "12px"
            }}
          >
            Resume Scorer
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "16px"
            }}
          >
            Get an AI-powered score and actionable suggestions to
            improve your resume.
          </p>
        </div>

        {/* ERROR */}
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

        {/* INPUT CARD */}
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
          <label
            style={{
              display: "block",
              marginBottom: "12px",
              color: "#cbd5e1",
              fontSize: "14px"
            }}
          >
            Paste Resume Content
          </label>

          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your complete resume here..."
            rows={12}
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

          <button
            onClick={analyzeResume}
            disabled={loading}
            style={{
              marginTop: "24px",
              background:
                "linear-gradient(135deg,#7c3aed,#3b82f6)",
              color: "white",
              border: "none",
              padding: "14px 30px",
              borderRadius: "14px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "15px"
            }}
          >
            {loading ? "Analyzing..." : "Score My Resume"}
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <>
            {/* SCORE CARD */}
            <div
              style={{
                background: "rgba(17,24,39,0.75)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "24px",
                padding: "32px",
                textAlign: "center",
                marginBottom: "24px"
              }}
            >
              <p
                style={{
                  color: "#94a3b8",
                  marginBottom: "10px"
                }}
              >
                Overall Resume Score
              </p>

              <h2
                style={{
                  fontSize: "72px",
                  fontWeight: "700",
                  color:
                    result.overall_score >= 70
                      ? "#22c55e"
                      : result.overall_score >= 50
                        ? "#f59e0b"
                        : "#ef4444"
                }}
              >
                {result.overall_score}
              </h2>

              <p
                style={{
                  color: "#64748b"
                }}
              >
                out of 100
              </p>
            </div>

            {/* SECTION BREAKDOWN */}
            <div
              style={{
                background: "rgba(17,24,39,0.75)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "24px",
                padding: "24px",
                marginBottom: "24px"
              }}
            >
              <h3
                style={{
                  marginBottom: "20px",
                  fontSize: "18px"
                }}
              >
                Section Breakdown
              </h3>

              {Object.entries(result.sections).map(([key, value]) => (
                <div key={key} style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px"
                    }}
                  >
                    <span
                      style={{
                        color: "#cbd5e1",
                        textTransform: "capitalize"
                      }}
                    >
                      {key}
                    </span>

                    <span
                      style={{
                        fontWeight: "600"
                      }}
                    >
                      {value}/100
                    </span>
                  </div>

                  <div
                    style={{
                      background: "#1e293b",
                      height: "10px",
                      borderRadius: "999px",
                      overflow: "hidden"
                    }}
                  >
                    <div
                      style={{
                        width: `${value}%`,
                        height: "100%",
                        background:
                          value >= 70
                            ? "#22c55e"
                            : value >= 50
                              ? "#f59e0b"
                              : "#ef4444",
                        transition: "0.5s"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* STRENGTHS + IMPROVEMENTS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginBottom: "24px"
              }}
            >
              <div
                style={{
                  background: "rgba(17,24,39,0.75)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "24px",
                  padding: "24px"
                }}
              >
                <h3
                  style={{
                    color: "#22c55e",
                    marginBottom: "16px"
                  }}
                >
                  ✅ Strengths
                </h3>

                {result.strengths.map((item, index) => (
                  <p
                    key={index}
                    style={{
                      marginBottom: "12px",
                      color: "#cbd5e1",
                      lineHeight: "1.6"
                    }}
                  >
                    • {item}
                  </p>
                ))}
              </div>

              <div
                style={{
                  background: "rgba(17,24,39,0.75)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "24px",
                  padding: "24px"
                }}
              >
                <h3
                  style={{
                    color: "#ef4444",
                    marginBottom: "16px"
                  }}
                >
                  ⚠️ Improvements
                </h3>

                {result.improvements.map((item, index) => (
                  <p
                    key={index}
                    style={{
                      marginBottom: "12px",
                      color: "#cbd5e1",
                      lineHeight: "1.6"
                    }}
                  >
                    • {item}
                  </p>
                ))}
              </div>
            </div>

            {/* SUMMARY */}
            <div
              style={{
                background: "rgba(17,24,39,0.75)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "24px",
                padding: "28px"
              }}
            >
              <h3
                style={{
                  color: "#a78bfa",
                  marginBottom: "14px"
                }}
              >
                💡 AI Summary
              </h3>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.8"
                }}
              >
                {result.summary}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ResumeScorer
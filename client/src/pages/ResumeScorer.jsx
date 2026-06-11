import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ResumeScorer() {
  const navigate = useNavigate()
  const [resume, setResume] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function analyzeResume() {
    if (!resume) {
      setError("Please paste your resume")
      return
    }
    setLoading(true)
    setError("")
    setResult(null)

    const prompt = `
You are an expert resume reviewer with 10 years of experience in tech hiring.
Analyze this resume and provide detailed feedback.

Resume:
${resume}

Respond in this exact JSON format only, no extra text, no markdown:
{
  "overall_score": 72,
  "sections": {
    "content": 75,
    "structure": 80,
    "impact": 65,
    "keywords": 70
  },
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "summary": "2-3 sentence overall assessment"
}
`

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3
        })
      })
      const data = await response.json()
      const text = data.choices[0].message.content
      const cleaned = text.replace(/```json|```/g, "").trim()
      const parsed = JSON.parse(cleaned)
      setResult(parsed)
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Try again.")
    }

    setLoading(false)
  }

  return (
    <div style={{minHeight: "100vh", backgroundColor: "#030712", color: "white"}}>

      <nav style={{backgroundColor: "#111827", borderBottom: "1px solid #1f2937", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
          <div style={{backgroundColor: "#2563eb", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px"}}>
            JT
          </div>
          <span style={{fontWeight: "bold", fontSize: "18px"}}>Job Tracker</span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          style={{backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px"}}
        >
          ← Back
        </button>
      </nav>

      <div style={{maxWidth: "800px", margin: "40px auto", padding: "0 16px"}}>
        <h1 style={{fontSize: "24px", fontWeight: "bold", marginBottom: "8px"}}>Resume Scorer</h1>
        <p style={{color: "#6b7280", fontSize: "14px", marginBottom: "32px"}}>Get AI feedback on your resume with actionable improvements</p>

        {error && (
          <div style={{backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", color: "#f87171", fontSize: "14px", padding: "12px 16px", borderRadius: "8px", marginBottom: "16px"}}>
            {error}
          </div>
        )}

        <div style={{marginBottom: "24px"}}>
          <label style={{color: "#9ca3af", fontSize: "14px", display: "block", marginBottom: "8px"}}>Paste Your Resume Text</label>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your entire resume text here..."
            rows={12}
            style={{width: "100%", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "12px 16px", borderRadius: "8px", outline: "none", fontSize: "14px", boxSizing: "border-box", resize: "vertical"}}
          />
        </div>

        <button
          onClick={analyzeResume}
          disabled={loading}
          style={{backgroundColor: "#7c3aed", color: "white", padding: "12px 32px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "16px", opacity: loading ? 0.5 : 1, marginBottom: "32px"}}
        >
          {loading ? "Analyzing..." : "Score My Resume →"}
        </button>

        {result && (
          <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>

            {/* Overall Score */}
            <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px", textAlign: "center"}}>
              <p style={{color: "#6b7280", fontSize: "14px", marginBottom: "8px"}}>Overall Score</p>
              <p style={{fontSize: "64px", fontWeight: "bold", color: result.overall_score >= 70 ? "#22c55e" : result.overall_score >= 50 ? "#f59e0b" : "#ef4444"}}>
                {result.overall_score}
              </p>
              <p style={{color: "#6b7280", fontSize: "14px"}}>out of 100</p>
            </div>

            {/* Section Scores */}
            <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px"}}>
              <h3 style={{fontSize: "16px", fontWeight: "600", marginBottom: "16px"}}>Section Breakdown</h3>
              {Object.entries(result.sections).map(([key, value]) => (
                <div key={key} style={{marginBottom: "12px"}}>
                  <div style={{display: "flex", justifyContent: "space-between", marginBottom: "4px"}}>
                    <span style={{color: "#9ca3af", fontSize: "14px", textTransform: "capitalize"}}>{key}</span>
                    <span style={{color: "white", fontSize: "14px", fontWeight: "600"}}>{value}/100</span>
                  </div>
                  <div style={{backgroundColor: "#1f2937", borderRadius: "4px", height: "8px"}}>
                    <div style={{backgroundColor: value >= 70 ? "#22c55e" : value >= 50 ? "#f59e0b" : "#ef4444", width: `${value}%`, height: "8px", borderRadius: "4px", transition: "width 0.5s"}}></div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px"}}>

              {/* Strengths */}
              <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px"}}>
                <h3 style={{color: "#22c55e", fontSize: "16px", fontWeight: "600", marginBottom: "16px"}}>✅ Strengths</h3>
                {result.strengths.map((s, i) => (
                  <p key={i} style={{color: "#9ca3af", fontSize: "14px", marginBottom: "8px", paddingLeft: "8px", borderLeft: "2px solid #22c55e"}}>
                    {s}
                  </p>
                ))}
              </div>

              {/* Improvements */}
              <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px"}}>
                <h3 style={{color: "#ef4444", fontSize: "16px", fontWeight: "600", marginBottom: "16px"}}>⚠️ Improvements</h3>
                {result.improvements.map((imp, i) => (
                  <p key={i} style={{color: "#9ca3af", fontSize: "14px", marginBottom: "8px", paddingLeft: "8px", borderLeft: "2px solid #ef4444"}}>
                    {imp}
                  </p>
                ))}
              </div>

            </div>

            {/* Summary */}
            <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px"}}>
              <h3 style={{color: "#3b82f6", fontSize: "16px", fontWeight: "600", marginBottom: "12px"}}>💡 AI Summary</h3>
              <p style={{color: "#9ca3af", fontSize: "14px", lineHeight: "1.6"}}>{result.summary}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeScorer
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function InterviewPrep() {
  const navigate = useNavigate()
  const [role, setRole] = useState("")
  const [jd, setJd] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function generateQuestions() {
    if (!role) {
      setError("Please enter a role title")
      return
    }
    setLoading(true)
    setError("")
    setResult(null)

    const prompt = `
You are an expert technical interviewer at a top tech company.
Generate interview questions for the following role.

Role: ${role}
${jd ? `Job Description: ${jd}` : ""}

Respond in this exact JSON format only, no extra text, no markdown:
{
  "technical": [
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"}
  ],
  "behavioral": [
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"}
  ],
  "hr": [
    {"question": "question text", "tip": "what interviewer looks for"},
    {"question": "question text", "tip": "what interviewer looks for"}
  ]
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
          temperature: 0.5
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
        <h1 style={{fontSize: "24px", fontWeight: "bold", marginBottom: "8px"}}>Interview Prep</h1>
        <p style={{color: "#6b7280", fontSize: "14px", marginBottom: "32px"}}>Get role-specific interview questions with insider tips</p>

        {error && (
          <div style={{backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", color: "#f87171", fontSize: "14px", padding: "12px 16px", borderRadius: "8px", marginBottom: "16px"}}>
            {error}
          </div>
        )}

        <div style={{display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px"}}>
          <div>
            <label style={{color: "#9ca3af", fontSize: "14px", display: "block", marginBottom: "8px"}}>Job Role *</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Developer, Data Analyst, SDE"
              style={{width: "100%", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "12px 16px", borderRadius: "8px", outline: "none", fontSize: "14px", boxSizing: "border-box"}}
            />
          </div>
          <div>
            <label style={{color: "#9ca3af", fontSize: "14px", display: "block", marginBottom: "8px"}}>Job Description (optional)</label>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste job description for more specific questions..."
              rows={4}
              style={{width: "100%", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "12px 16px", borderRadius: "8px", outline: "none", fontSize: "14px", boxSizing: "border-box", resize: "vertical"}}
            />
          </div>
        </div>

        <button
          onClick={generateQuestions}
          disabled={loading}
          style={{backgroundColor: "#d97706", color: "white", padding: "12px 32px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "16px", opacity: loading ? 0.5 : 1, marginBottom: "32px"}}
        >
          {loading ? "Generating..." : "Generate Questions →"}
        </button>

        {result && (
          <div style={{display: "flex", flexDirection: "column", gap: "24px"}}>

            {/* Technical Questions */}
            <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px"}}>
              <h3 style={{color: "#3b82f6", fontSize: "18px", fontWeight: "600", marginBottom: "20px"}}>💻 Technical Questions</h3>
              {result.technical.map((q, i) => (
                <div key={i} style={{marginBottom: "20px", paddingBottom: "20px", borderBottom: i < result.technical.length - 1 ? "1px solid #1f2937" : "none"}}>
                  <p style={{color: "white", fontSize: "15px", fontWeight: "500", marginBottom: "8px"}}>Q{i + 1}. {q.question}</p>
                  <p style={{color: "#6b7280", fontSize: "13px", paddingLeft: "12px", borderLeft: "2px solid #3b82f6"}}>💡 {q.tip}</p>
                </div>
              ))}
            </div>

            {/* Behavioral Questions */}
            <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px"}}>
              <h3 style={{color: "#22c55e", fontSize: "18px", fontWeight: "600", marginBottom: "20px"}}>🤝 Behavioral Questions</h3>
              {result.behavioral.map((q, i) => (
                <div key={i} style={{marginBottom: "20px", paddingBottom: "20px", borderBottom: i < result.behavioral.length - 1 ? "1px solid #1f2937" : "none"}}>
                  <p style={{color: "white", fontSize: "15px", fontWeight: "500", marginBottom: "8px"}}>Q{i + 1}. {q.question}</p>
                  <p style={{color: "#6b7280", fontSize: "13px", paddingLeft: "12px", borderLeft: "2px solid #22c55e"}}>💡 {q.tip}</p>
                </div>
              ))}
            </div>

            {/* HR Questions */}
            <div style={{backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px"}}>
              <h3 style={{color: "#f59e0b", fontSize: "18px", fontWeight: "600", marginBottom: "20px"}}>👔 HR Questions</h3>
              {result.hr.map((q, i) => (
                <div key={i} style={{marginBottom: "20px", paddingBottom: "20px", borderBottom: i < result.hr.length - 1 ? "1px solid #1f2937" : "none"}}>
                  <p style={{color: "white", fontSize: "15px", fontWeight: "500", marginBottom: "8px"}}>Q{i + 1}. {q.question}</p>
                  <p style={{color: "#6b7280", fontSize: "13px", paddingLeft: "12px", borderLeft: "2px solid #f59e0b"}}>💡 {q.tip}</p>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewPrep
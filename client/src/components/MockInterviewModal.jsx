import { useState } from "react"

function MockInterviewModal({ questionObj, role, onClose }) {
  const [answer, setAnswer] = useState("")
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      alert("Please type your answer first.")
      return
    }

    setLoading(true)
    setFeedback("")

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "https://job-tracker-qyzl.onrender.com"}/api/ai/interview-feedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: questionObj.question,
            userAnswer: answer,
            role: role || "Software Engineer"
          })
        }
      )

      const data = await response.json()
      if (response.ok) {
        setFeedback(data.feedback)
      } else {
        alert(data.error || "Failed to get feedback.")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
      <div style={{ background: "#111827", width: "700px", maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.08)", padding: "30px", color: "white" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <div>
            <span style={{ background: "rgba(59,130,246,0.15)", color: "#60a5fa", padding: "4px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: "600" }}>Live Mock Practice</span>
            <h3 style={{ margin: "10px 0 0 0", fontSize: "18px", color: "#f8fafc" }}>{questionObj.question}</h3>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#94a3b8", fontSize: "20px", cursor: "pointer" }}>✕</button>
        </div>

        {/* Tip Box */}
        <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "12px", padding: "14px", marginBottom: "20px", fontSize: "14px", color: "#94a3b8" }}>
          <strong style={{ color: "#38bdf8" }}>💡 Interviewer Tip:</strong> {questionObj.tip}
        </div>

        {/* Answer Input */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>Your Spoken / Written Answer</label>
          <textarea
            rows={5}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type how you would answer this in an interview..."
            style={{ width: "100%", padding: "12px", borderRadius: "10px", background: "#0f172a", border: "1px solid #334155", color: "white", boxSizing: "border-box", outline: "none", resize: "vertical" }}
          />
        </div>

        <button
          onClick={handleSubmitAnswer}
          disabled={loading}
          style={{ width: "100%", background: "linear-gradient(135deg,#10b981,#3b82f6)", color: "white", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "700", cursor: "pointer", marginBottom: "20px" }}
        >
          {loading ? "AI Coach is evaluating..." : "🎯 Submit Answer for AI Feedback"}
        </button>

        {/* Feedback Area */}
        {feedback && (
          <div style={{ background: "#0f172a", border: "1px solid #10b981", borderRadius: "14px", padding: "20px" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#10b981" }}>📋 AI Coach Evaluation</h4>
            <div style={{ whiteSpace: "pre-wrap", color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6" }}>
              {feedback}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default MockInterviewModal
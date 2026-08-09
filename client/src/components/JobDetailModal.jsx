import { useState } from "react"
import { tailorResumeForJob } from "../api"

function JobDetailModal({ job, onClose }) {
  const [skills, setSkills] = useState("")
  const [jobDesc, setJobDesc] = useState(job.notes || "") 
  const [tailoredResult, setTailoredResult] = useState("")
  const [loading, setLoading] = useState(false)

  const handleTailor = async () => {
    if (!skills.trim() || !jobDesc.trim()) {
      alert("Please enter your baseline skills and the job description.")
      return
    }

    setLoading(true)
    setTailoredResult("")
    try {
      const token = localStorage.getItem("token")
      const data = await tailorResumeForJob(token, skills, jobDesc, job.role_title, job.company_name)
      if (data.tailoredBullets) {
        setTailoredResult(data.tailoredBullets)
      } else {
        alert("Failed to generate tailored resume.")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong.")
    }
    setLoading(false)
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
      <div style={{ background: "#111827", width: "700px", maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.08)", padding: "30px", color: "white" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "22px" }}>{job.role_title}</h2>
            <p style={{ color: "#00ED64", margin: "4px 0 0 0", fontWeight: "600" }}>{job.company_name}</p>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#94a3b8", fontSize: "20px", cursor: "pointer" }}>✕</button>
        </div>

        {/* Inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>Your Master Skills / Experience</label>
            <textarea
              rows={3}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node.js, built full-stack apps, REST APIs..."
              style={{ width: "100%", padding: "12px", borderRadius: "10px", background: "#0f172a", border: "1px solid #334155", color: "white", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>Job Description</label>
            <textarea
              rows={4}
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste job description here..."
              style={{ width: "100%", padding: "12px", borderRadius: "10px", background: "#0f172a", border: "1px solid #334155", color: "white", boxSizing: "border-box" }}
            />
          </div>

          <button
            onClick={handleTailor}
            disabled={loading}
            style={{ background: "#00ED64", color: "#071018", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}
          >
            {loading ? "AI is rewriting your bullets..." : "✨ One-Click Tailor Resume Bullets"}
          </button>
        </div>

        {/* Results Area */}
        {tailoredResult && (
          <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "14px", padding: "20px" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#00ED64" }}>Optimized Resume Bullets</h4>
            <div style={{ whiteSpace: "pre-wrap", color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6" }}>
              {tailoredResult}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(tailoredResult)
                alert("Copied to clipboard!")
              }}
              style={{ marginTop: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "white", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
            >
              📋 Copy Bullets
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default JobDetailModal
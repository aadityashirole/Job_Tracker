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
        if (!skills || !jd) {
            setError("Please fill both fields")
            return
        }
        setLoading(true)
        setError("")
        setResult(null)

        try {
            const response = await fetch("http://localhost:5000/api/ai/jd-analyzer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skills, jd })
            })
            const parsed = await response.json()
            setResult(parsed)
        } catch (err) {
            console.error(err)
            setError("Something went wrong. Try again.")
        }

        setLoading(false)
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#030712", color: "white" }}>

            <nav style={{ backgroundColor: "#111827", borderBottom: "1px solid #1f2937", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ backgroundColor: "#2563eb", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px" }}>
                        JT
                    </div>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>Job Tracker</span>
                </div>
                <button
                    onClick={() => navigate("/dashboard")}
                    style={{ backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" }}
                >
                    ← Back
                </button>
            </nav>

            <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 16px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>JD Gap Analyzer</h1>
                <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "32px" }}>Find out what skills you're missing for any job</p>

                {error && (
                    <div style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", color: "#f87171", fontSize: "14px", padding: "12px 16px", borderRadius: "8px", marginBottom: "16px" }}>
                        {error}
                    </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
                    <div>
                        <label style={{ color: "#9ca3af", fontSize: "14px", display: "block", marginBottom: "8px" }}>Your Current Skills</label>
                        <textarea
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            placeholder="e.g. React, JavaScript, HTML, CSS, Python, Git..."
                            rows={8}
                            style={{ width: "100%", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "12px 16px", borderRadius: "8px", outline: "none", fontSize: "14px", boxSizing: "border-box", resize: "vertical" }}
                        />
                    </div>
                    <div>
                        <label style={{ color: "#9ca3af", fontSize: "14px", display: "block", marginBottom: "8px" }}>Job Description</label>
                        <textarea
                            value={jd}
                            onChange={(e) => setJd(e.target.value)}
                            placeholder="Paste the full job description here..."
                            rows={8}
                            style={{ width: "100%", backgroundColor: "#1f2937", border: "1px solid #374151", color: "white", padding: "12px 16px", borderRadius: "8px", outline: "none", fontSize: "14px", boxSizing: "border-box", resize: "vertical" }}
                        />
                    </div>
                </div>

                <button
                    onClick={analyzeGap}
                    disabled={loading}
                    style={{ backgroundColor: "#2563eb", color: "white", padding: "12px 32px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "16px", opacity: loading ? 0.5 : 1, marginBottom: "32px" }}
                >
                    {loading ? "Analyzing..." : "Analyze Gap →"}
                </button>

                {result && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                        <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
                            <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>Match Score</p>
                            <p style={{ fontSize: "48px", fontWeight: "bold", color: result.match_percentage >= 70 ? "#22c55e" : result.match_percentage >= 40 ? "#f59e0b" : "#ef4444" }}>
                                {result.match_percentage}%
                            </p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

                            <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px" }}>
                                <h3 style={{ color: "#22c55e", fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>✅ Skills You Have</h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                    {result.matched_skills.map((skill, i) => (
                                        <span key={i} style={{ backgroundColor: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", padding: "4px 12px", borderRadius: "20px", fontSize: "13px" }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px" }}>
                                <h3 style={{ color: "#ef4444", fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>❌ Skills You Need</h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                    {result.missing_skills.map((skill, i) => (
                                        <span key={i} style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", padding: "4px 12px", borderRadius: "20px", fontSize: "13px" }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div style={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px" }}>
                            <h3 style={{ color: "#3b82f6", fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>💡 AI Recommendation</h3>
                            <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6" }}>{result.recommendation}</p>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default JDAnalyzer